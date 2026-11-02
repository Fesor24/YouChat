import jwt from "jsonwebtoken";
import { ApiError, ApiResponse } from "../models/apiResponse";

export const authenticateToken = (req:any, res:any, next:any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        const tokenErrorResponse = new ApiResponse<string>()
            .failure(new ApiError('TOKEN_ABSENT', 'JWT token is missing in auth header'))

        return res.status(401)
            .json(tokenErrorResponse)
    }

    const secret = process.env['JWT_SECRET']!

    jwt.verify(token, secret, (err:any, decoded:any) => {
        if(err){
            const tokenErrorResponse = new ApiResponse<string>()
            .failure(new ApiError('INVALID_TOKEN', "Invalid token"))

            return res.status(401)
                .json(tokenErrorResponse)
        }

        // decoded contains the payload that was originally signed
        req.user = decoded;
        next();
    })
}