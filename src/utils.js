import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import jwt from "jsonwebtoken";


export const generateToken = userId => jwt.sign({ userId }, process.env.JWT_SECRET);