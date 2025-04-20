import express from "express";
const app = express();
import authRouter from "./controllers/auth.js";
import { dbConnect } from "./db.js";

const PORT = 4000;
app.use(express.json());
app.use("/signup", authRouter);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server started on port ${PORT}`);
});
