import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"


const generateAccessAndRefreshToken = async (userID) => {
    try{
        const user = User.findOne(userID)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBefeoreSave: false})

        return { accessToken, refreshToken }

    }catch(error){
        throw new ApiError(500, "Something went wrong while creating Access and Refresh Token")
    }

}
const registerUser = asyncHandler(async (req, res) => {
    const {userName, firstName, lastName,email, password} = req.body
    if(
        [userName, firstName, lastName,email, password].some((field) =>
            field?.trim ==="")
    ) {
        throw new ApiError(400, "All Fields Are Required")
    }
    // if (email.include('@'))
    const userexist = await User.findOne({
        $or: [{userName}, {email}]
    })
    if (userexist){
        throw new ApiError(409, "User with email or username already exists")
    }
    const user = await User.create({
        username: userName.toLowerCase(),
        firstName,
        lastName,
        email,
        password
    })
    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createUser){
        throw new ApiError(500, "Something went wrong while creating User")
    }

    return res.status(201).json(
        new ApiResponse(200, createUser,"User Created Successfully ")
    )

})

const loginUser = asyncHandler(async (req, res) => {
    const {userName,email, password} = req.body

    if (!(userName || email)){
        throw new ApiError(400, "Username or Email is required")
    }

    const user = User.findOne({
        $or: [{userName},{email}]
    })
    
    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid User Cradentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const option = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookies("accessToken", accessToken, option)
    .cookies("refreshToken", refreshToken, option)
    .json(
        new ApiResponse(
                200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User Logged In SuccessFully"
        )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const option = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", accessToken, option)
    .clearCookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(200, {}, "User Logged Out SuccessFully"))
})

export {
    registerUser,
    loginUser,
    logoutUser
}