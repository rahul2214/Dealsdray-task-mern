import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authroute.js";
import employeRoutes from "./routes/employeeroute.js";

import cookieParser from "cookie-parser";
import connectTOMongoDB from "./db/connectToMongoDB.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;


app.use("/api/auth",authRoutes); 
app.use("/api/employee", employeRoutes); 




app.listen(PORT, () =>{
    connectTOMongoDB();
    console.log(`listening on port ${PORT}`)});