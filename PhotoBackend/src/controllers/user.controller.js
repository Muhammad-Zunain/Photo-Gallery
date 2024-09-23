import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"


const generateAccessAndRefreshToken = async (userID) => {
    try {
        console.log(`Finding user with ID: ${userID}`);
        const user = await User.findById(userID); // Awaiting the user fetch

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        console.log(`User found: ${user}`);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        console.log(`Generated refreshToken: ${refreshToken}`);

        await user.save({ validateBeforeSave: false }); // Save the user with new refreshToken

        return { accessToken, refreshToken };
    } catch (error) {
        console.error(error); // Log the actual error
        throw new ApiError(500, "Something went wrong while creating Access and Refresh Token");
    }
};


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
    const { username, email, password } = req.body;

    if (!(username || email)) {
        throw new ApiError(400, "Username or Email is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password); // Correctly calling the method
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User Credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Adjust for development
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User Logged In Successfully"
            )
        );
});


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