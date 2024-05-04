import { Router } from "express";
import {
  createNewPost,
  getPostByUserId,
  deletePost,
  getAllPost,
} from "../controllers/post.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import uploadMiddleware from "../middleware/uploads.js";

const router = Router();

router
  .get("/", getAllPost)
  .post("/create-post", uploadMiddleware, createNewPost)
  .get("/:id", getPostByUserId)
  .delete("/:id", deletePost);

export default router;
