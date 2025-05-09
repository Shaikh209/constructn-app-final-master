import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import { dbConnection } from "./config/dbConnection.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

import userRouter from "./router/userRouter.js";
import repairRequestRouter from './router/repairRequestRouter.js'
import contactRouter from "./router/contactRouter.js";

const app = express();
config({ path: "./config/config.env" });

app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

app.use("/user", userRouter);
app.use("/request", repairRequestRouter);
app.use("/contact", contactRouter); // Added contact router

dbConnection(); // Call DB connection

app.use(errorMiddleware);

export default app;