import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Post, Category } from '../models/post.models.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const createPost = asyncHandler(async (req, res) => {

    const { user, title, description, mediaType, category, tags } = req.body

    if ([user, title, mediaType, category, tags].some((field) => {
        field?.trim === ""
    })) {
        throw new ApiError(400, "All Fields Are Required")
    }


    const imageUrl = req.file?.path
    const postImage = await uploadOnCloudinary(imageUrl)

    if (!postImage) {
        throw new ApiError(400, "Error in Uploading on Cloudinary")
    }

    console.log(postImage)

    const post = await Post.create({
        user,
        title,
        description: description ? description : "",
        file: postImage.url,
        mediaType,
        category,
        tags
    })

    console.log(post)
    const postData = await Post.findById(post._id)

    if (!postData) {
        throw new ApiError(500, "Something went wrong while creating Post")
    }

    return res.status(201).json(
        new ApiResponse(200, postData, "post Created Successfully ")
    )

})


const getAllPost = asyncHandler(async (req, res) => {

    const posts = await Post.find();
    if (!posts || posts.length === 0) {
        return res.status(404).json(new ApiResponse(404, [], 'No posts found.'));
    }
    return res.status(200).json(
        new ApiResponse(200, posts)
    );
});




const filterPost = asyncHandler(async (req, res) => {
    const { tags, category, views } = req.body;
    const query = {};
    if (tags) {
        query.tags = { $in: tags };
    }
    if (category) {
        query.category = category;
    }
    try {
        let posts;
        if (!views) {
            posts = await Post.find(query)
                .populate('user')
                .populate('category')
                .exec();
        } else {
            posts = await Post.find()
                .sort({ views: -1 })
                .populate('user')
                .populate('category')
                .exec();
        }
        return res.status(201).json(
            new ApiResponse(200, posts, "post filtered Successfully ")
        )

    } catch (err) {
        console.error('Error filtering posts:', err);
        throw new ApiError(500, "Something went wrong while filtering Post catch")
    }
})



export { createPost, getAllPost, filterPost }