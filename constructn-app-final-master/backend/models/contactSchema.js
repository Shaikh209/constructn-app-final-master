import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters long."],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minLength: [10, "Message must be at least 10 characters long."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
