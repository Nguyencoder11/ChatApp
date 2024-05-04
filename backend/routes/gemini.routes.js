import { sendMessage } from "../controllers/gemini.controller.js";
import express from "express";

const router = express.Router();

router.post("/chat", sendMessage);

export default router;
