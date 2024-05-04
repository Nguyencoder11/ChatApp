import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from "dotenv";
const genAI = new GoogleGenerativeAI("AIzaSyBPXTVFSWRl7s0bjocg8HpB8kUTveCyx8E");

export const sendMessage = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: req.body.history,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const msg = req.body.message;

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    res.json({ response: text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
