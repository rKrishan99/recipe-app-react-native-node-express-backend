import express, { Request, Response } from "express";
import { registerUser, loginUser } from "../controller/AuthController";

const userRouter = express.Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  await registerUser(req, res);
});

userRouter.post("/login", async (req: Request, res: Response) => {
    await loginUser(req, res);
});


export default userRouter;
