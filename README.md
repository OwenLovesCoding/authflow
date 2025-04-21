# 🔐 Authentication Backend API

This is the backend authentication service for the **Mirogate** (Authentication - https://github.com/OwenLovesCoding/authflow) mobile app. It handles user registration, OTP (One-Time Password) generation, email sending, and OTP verification using Node.js, Express, and MongoDB.

---

## 🧩 Features

- User email and password registration
- Secure OTP generation and email sending
- OTP validation endpoint
- User verification via `isVerified` flag in the database
- Clean and minimal authentication microservice

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **CORS** for handling cross-origin requests
- **Dotenv** for environment variable management
- **Nodemailer** (for sending OTPs via email)

---

## 📂 Project Structure

```bash
Authentication/
├── controllers/
│   └── auth.js     # Logic for OTP sending and verification
├── models/
│   └── signUp.js               # Mongoose schema for user
├── .env                      # Environment variables
├── app.js                 # Entry point of the app
├── db.js                  # MongoDb connection
├── new.http               # For testing the Apis
├── package.json            # For package details
