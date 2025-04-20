import express from "express";
import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const router = express().router;
router.use(express.json());

router.post("/send-mail", async (req, res) => {
  // const { to, subject, text } = req.body;

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

    // Send email
    const info = await transporter.sendMail({
      from: `"My App" <${process.env.GMAIL_USER}>`,
      to: "iraoyaowen5@gmail.com",
      subject: "Hello World!",
      text: "Hello World!",
    });

    console.log("Email sent:", info.messageId);
    // res.json({ message: "Email sent successfully!" });
    res.send("something happened!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
