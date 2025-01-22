import express from "express";
import {createComment,updateComment,postComments,deleteComment} from "../controller/commentController.js"
import verifyToken from "../middlewares/verifyToken.js";
const commentRouter = express.Router();
commentRouter.post("/create",verifyToken,createComment)
commentRouter.put("/:id",verifyToken,updateComment);
commentRouter.delete("/:id",verifyToken,deleteComment)
commentRouter.get("/post/:postId",postComments)
export default commentRouter;