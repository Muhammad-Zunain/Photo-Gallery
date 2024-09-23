import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"


const generateAccessAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID); 
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating Access and Refresh Token");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;
    
    // Check if any required field is missing or empty
    if ([username, firstName, lastName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All Fields Are Required");
    }
    
    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
        throw new ApiError(400, "Invalid email format");
    }

    // Check if a user with the same username or email already exists
    const userExist = await User.findOne({
        $or: [{ username: username.toLowerCase() }, { email: normalizedEmail }],
    });

    if (userExist) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // Create the user
    const user = await User.create({
        username,
        firstName,
        lastName,
        email: normalizedEmail,
        password,
    });

    // Fetch the created user excluding password and refreshToken fields
    const createUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createUser) {
        throw new ApiError(500, "Something went wrong while creating User");
    }

    // Respond with success
    return res.status(201).json(
        new ApiResponse(201, createUser, "User Created Successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const {username,email, password} = req.body

    if (!(username || email)){
        throw new ApiError(400, "Username or Email is required")
    }

    const user = await User.findOne({
        $or: [{username: username.toLowerCase()},{email}]
    })
    
    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid User Cradentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const option = {
        httpOnly: true,
        secure: false
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
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
        secure: false
    }

    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
})

export {
    registerUser,
    loginUser,
    logoutUser
}