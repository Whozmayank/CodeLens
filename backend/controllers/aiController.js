import { explainCode } from "../utils/geminiService.js";
import Explanation from "../models/Explanation.js";

export const explainHandler = async (req, res) => {
  try {
    const { code, level } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Code is required" });
    }

    const result = await explainCode(code, level);

    await Explanation.create({
        userId: req.user._id,
        code,
        response: result,
      });

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};