import { mongoose } from "../db.js";
import express from "express";
import nodemailer from "nodemailer";
import { config } from "dotenv";
import signUp from "../models/signUp.js";

config();

const router = express().router;
router.use(express.json());

router.post("/send-mail", async (req, res) => {
  const { to } = req.body;

  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      throw new Error("Email credentials not configured");
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const otp = Math.floor(Math.random() * 1000000);

    // Send email
    const info = await transporter.sendMail({
      from: `"MiroGate" <${process.env.GMAIL_USER}>`,
      to,
      subject: `Welcome to Mirogate!`,
      html: `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background: #f9f9f9; border-radius: 8px;">
    <h2 style="color: #4CAF50;">Confirmation Code</h2>
    <p>Thank you for signing up! Please enter the following code to verify your email:</p>
    <div style="font-size: 24px; font-weight: bold; background: #e3f2fd; padding: 10px 20px; border-radius: 5px; display: inline-block; margin: 15px 0; text-align: center">
      ${otp}
    </div>
    <p>If you did not request this, please ignore this email.</p>
    <p style="margin-top: 20px;">Cheers,<br/>MiroGate Team</p>
  </div>
`,
    });

    console.log("Email sent:", info.messageId);
    // res.json({ message: "Email sent successfully!" });

    const userInfo = new signUp({
      email: to,
      otp: otp,
    });
    await userInfo.save();

    res.json(userInfo);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

router.put("/verify-otp/:userId", async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
      const userId = req.params.userId;
      const enteredDigit = req.body.otp;
      const result = await signUp.findOne({ _id: userId });

      if (result.otp === JSON.stringify(enteredDigit)) {
        result.isVerified = true;
        await result.save();
        res.json(result);
      } else {
        res.send("Incorrect otp");
      }
    } else {
      console.log("no");
      res.status(403).json({ error: "User not found" });
    }
  } catch (e) {
    res.json(e);
  }
});

export default router;
