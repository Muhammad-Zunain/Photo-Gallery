import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(cookieParser())
app.use(express.static("public"))

// Import the Routes
import UserRouter from "./routes/user.routes.js"
import CategoryRoutes from "./routes/category.routes.js"
import PostRoutes from "./routes/post.routes.js"
import { refreshVerifyJWT } from "./middlewares/auth.middleware.js"



// Routes Declarion
app.use("/api/v1/user", UserRouter)
app.use("/api/v1/category", CategoryRoutes)
app.use("/api/v1/post", PostRoutes)


export { app }