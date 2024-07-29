import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobileNo: {
        type: Number,
        required: true,
    },
   
    designation: {
        type: String,
        required: true,
        enum: ['HR','Manager','Sales'],
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    course: {
        type: Array,
        required: true,
    },
    image: {
        type: String, // Storing image as a base64 string
        required: true,
    },
  
}, { timestamps: true });
const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;