import mongoose from "mongoose";

const explanationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    response: {
      type: Object, // stores AI JSON
      required: true,
    },
  },
  { timestamps: true } // gives createdAt automatically
);

export default mongoose.model("Explanation", explanationSchema);