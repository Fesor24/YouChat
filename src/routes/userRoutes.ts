import express from "express"
import {db} from "../config/db"
import { ApiError, ApiResponse } from "../models/apiResponse";
import UserModel from "../models/userModel";
import { authenticateToken } from "../middlewares/authMiddleware";
import StatusCodes from '../models/statusCodes';

const router = express.Router()

router.get("/user-profile", authenticateToken, async (req: any, res:any) =>{

    if(!req.user){
        const errrorResponse = new ApiResponse<string>()
            .failure(new ApiError('UNAUTHENTICATED', 'User is not authenticated'))

        return res.status(StatusCodes.UNAUTHORIZED)
            .json(errrorResponse);
    }

    const user = await db.orm.public.User
        .where({email: req.user['email']})
        .first();

    if(!user){
        const userErrorResponse = new ApiResponse<string>()
            .failure(new ApiError("USER_NOTFOUND", "User not found"));

        return res.status(StatusCodes.NOT_FOUND)
            .json(userErrorResponse);
    }

    let userModel = new UserModel();
    userModel.firstName = user.firstName;
    userModel.lastName = user.lastName;
    userModel.email = user.email;

    let apiResponse = new ApiResponse<UserModel>();
    apiResponse = apiResponse.success(userModel);

    return res.json(apiResponse);
})

export default router;