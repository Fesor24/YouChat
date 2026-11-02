import express from 'express'
import {db} from '../config/db'
import { ApiError, ApiResponse } from '../models/apiResponse';
import {generateAccessToken} from '../services/authService'

const router = express.Router();

router.post('/login', async (req: any, res:any) => {
    const body = req.body;

    const userEmail = body['email'];

    //TODO: Validate useremail

    const user = await db.orm.public.User.first({
        email: userEmail
    });

    if (user == null)
        return res.status(404)
            .json(new ApiError("INVALID_CREDENTIALS", "Incorrect login credentials"))

    const token = await generateAccessToken(user.id.toString(), user.email);

    const apiResponse = new ApiResponse<string>().success(token);

    return res.status(200)
        .json(apiResponse)
});

export default router;