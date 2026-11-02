import express from 'express'
import {db} from '../config/db'
import { ApiError, ApiResponse } from '../models/apiResponse';
import {comparePasswords, generateAccessToken, hashPassword} from '../services/authService'
import StatusCodes from '../models/statusCodes';

const router = express.Router();

router.post('/login', async (req: any, res:any) => {
    const body = req.body;

    const userEmail = body['email'];
    const password = body['password']

    const user = await db.orm.public.User.first({
        email: userEmail
    });

    if (user == null)
        return res.status(404)
            .json(new ApiResponse<string>()
            .failure(new ApiError("INVALID_CREDENTIALS", "Incorrect login credentials")))

    const salt = user.password.split(":")[1];

    const hashedUserInputPassword = hashPassword(password, salt)

    if(!comparePasswords(hashedUserInputPassword, user.password))
         return res.status(200)
            .json(new ApiResponse<string>()
                .failure(new ApiError("INVALID_CREDENTIALS", "Incorrect login credentials")))

    const token = await generateAccessToken(user.id.toString(), user.email);

    const apiResponse = new ApiResponse<string>().success(token);

    return res.status(200)
        .json(apiResponse)
});

router.post('/register', async (req: any, res:any) => {
    const body = req.body;

    const userEmail = body['email'];
    const firstName = body['firstName'];
    const lastName = body['lastName'];
    const password = body['password'];

    const userWithEmailExist = await db.orm.public.User.first({
        email: userEmail
    }) != null;

    if (userWithEmailExist)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(new ApiResponse<string>()
                .failure(new ApiError("USER_EXISTS", "User with email exists")));

    const hashedPassword = hashPassword(password);

    const user = await db.orm.public.User.create({
        email: userEmail,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword
    });

    if (user == null)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(new ApiError("ERROR", "An error occurred while creating this user"))

    const token = await generateAccessToken(user.id.toString(), user.email);

    const apiResponse = new ApiResponse<string>().success(token);

    return res.status(200)
        .json(apiResponse)
});

export default router;