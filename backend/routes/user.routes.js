import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar).get("/:id", getUser);

export default router;
