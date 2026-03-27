import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const explainCode = async (code, level = "beginner") => {
  try {
    // 🔥 Strict Prompt
    const prompt = `
You are a senior developer.

Explain this code:

${code}

Level: ${level}

Return ONLY valid JSON:
{
  "summary": "",
  "lineByLine": "",
  "complexity": "Use Big-O notation like O(1), O(n), etc.",
  "tips": ""
}

Do NOT include markdown or backticks.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    //  Clean response 
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    //  Parse JSON safely
    try {
      const parsed = JSON.parse(cleaned);

      if (typeof parsed.lineByLine !== "string") {
        parsed.lineByLine = JSON.stringify(parsed.lineByLine, null, 2);
      }
      
      if (typeof parsed.summary !== "string") {
        parsed.summary = JSON.stringify(parsed.summary);
      }
      
      if (typeof parsed.complexity !== "string") {
        parsed.complexity = JSON.stringify(parsed.complexity);
      }
      
      if (typeof parsed.tips !== "string") {
        parsed.tips = JSON.stringify(parsed.tips);
      }

      const isValidResponse = (data) => {
        return (
          data.summary &&
          data.lineByLine &&
          data.complexity &&
          data.tips
        );
      };
    
      if (!isValidResponse(parsed)) {
        return {
          summary: "Invalid AI response format",
          lineByLine: cleaned,
          complexity: "Unknown",
          tips: "Retry request",
        };
      }

      return parsed;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError.message);

      // 🔁 Fallback if JSON breaks
      return {
        summary: "Failed to parse AI response.",
        lineByLine: cleaned,
        complexity: "Unknown",
        tips: "Try simpler code or retry.",
      };
    }

  } catch (error) {
    console.error("Gemini Error:", error.message);

    // 🔁 Hard fallback
    return {
      summary: "AI service unavailable.",
      lineByLine: "",
      complexity: "",
      tips: "Please try again later.",
    };
  }
};