import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Category} from '../models/post.models.js'


const createCategory= asyncHandler(async (req, res)=> {

    const {name} = req.body

    if (!name) {
        throw new ApiError(400, "All Fields Are Required")
    }

    const category = await Category.create({
        name
    })

    return res.status(201).json(
        new ApiResponse(200, category,"Category Created Successfully ")
    )


})


export {createCategory}