import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authroute.js';
import employeRoutes from './routes/employeeroute.js';
import connectTOMongoDB from './db/connectToMongoDB.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'backend/uploads')));

app.use('/api/auth', authRoutes); 
app.use('/api/employee', employeRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectTOMongoDB();
    console.log(`Listening on port ${PORT}`);
});
