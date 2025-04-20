import { mongoose } from "../db.js";

const SignUp = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      maxLength: 150,
    },
    password: {
      type: String,
      required: true,
      default: "password",
    },
    otp: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("otps", SignUp);
