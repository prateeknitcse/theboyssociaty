import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema(
  {
    birthday: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Birthday",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
    },

    paidAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Contribution", contributionSchema);
