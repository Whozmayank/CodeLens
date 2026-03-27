import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY,
);

async function test() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent("Say hello in one line");
    const response = await result.response;

    console.log("✅ API Working:");
    console.log(response.text());

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

test();