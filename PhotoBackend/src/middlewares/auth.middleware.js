import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        console.log(token)

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        )

        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next()
    } catch (error) {
        next()
        // throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})
export const refreshVerifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken 

        if (!token){
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        )

        if(!user){
            throw new ApiError(401, "Invalid Refresh Token")
        }

        const accessToken = user.generateAccessToken();

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Adjust for development
        };

        res.cookie("accessToken", accessToken, options)

        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
})