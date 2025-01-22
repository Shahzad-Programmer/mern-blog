import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import cors from "cors";

import Connection from "./database/database.js";
Connection();
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import commentRouter from "./routes/comment.js";

// env config
dotenv.config();
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin:["https://mernblog34.netlify.app","http://localhost:5173"],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/comment", commentRouter);
// port
const port = process.env.PORT;



app.listen(port, () => {
  console.log(`Server is working at port ${port}`);
});


