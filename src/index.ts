import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDB from "./db/db";
import userRouter from "./routes/AuthRoutes";

dotenv.config();

connectToDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRouter);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
