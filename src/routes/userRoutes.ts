import express from "express"
import {db, connectAsync} from "../config/db"
import { ApiResponse } from "../models/apiResponse";
import UserModel from "../models/userModel";

const router = express.Router()

router.get("/user-profile", async (req, res) =>{

    const user = await db.orm.public.User
        .where({id: 1})
        .first();

    if(!user){
        // TODO: Handle situation
        throw Error("User not found");
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