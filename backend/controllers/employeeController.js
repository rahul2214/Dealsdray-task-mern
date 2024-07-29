import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Employee from '../models/employeeModel.js';

// Get the current directory of the ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the directory where images will be stored
const storageDir = path.join(__dirname, '..', 'uploads', 'employee-images');

// Ensure the directory exists
if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
}

export const employee = async (req, res) => {
    try {
        const { name, email, mobileNo, gender, designation, course } = req.body;

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        let imagePath = null;
        let imageFilename = null;
        if (req.file) {
            imageFilename = `${Date.now()}_${req.file.originalname}`;
            imagePath = path.join(storageDir, imageFilename);
            fs.writeFileSync(imagePath, req.file.buffer);
        }

        const newEmployee = new Employee({
            name,
            email,
            mobileNo,
            gender,
            designation,
            course: Array.isArray(course) ? course : [course],
            image: imagePath ? `/uploads/employee-images/${imageFilename}` : undefined,
        });

        await newEmployee.save();

        res.status(201).json({
            _id: newEmployee._id,
            name: newEmployee.name,
            email: newEmployee.email,
            mobileNo: newEmployee.mobileNo,
            gender: newEmployee.gender,
            designation: newEmployee.designation,
            course: newEmployee.course,
            image: newEmployee.image,
        });
    } catch (error) {
        console.error('Error creating employee:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        if (employee.image) {
            fs.unlinkSync(path.join(__dirname, '..', employee.image));
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        if (req.file) {
            // Delete the old image if it exists
            if (employee.image) {
                const oldImagePath = path.join(__dirname, '..', employee.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // Save the new image
            const imageFilename = `${Date.now()}_${req.file.originalname}`;
            const imagePath = path.join(storageDir, imageFilename);
            fs.writeFileSync(imagePath, req.file.buffer);
            updateData.image = `/uploads/employee-images/${imageFilename}`;
        }

        Object.assign(employee, updateData);
        await employee.save();

        res.status(200).json(employee);
    } catch (error) {
        console.error('Error updating employee:', error.message);
        res.status(500).json({ error: error.message });
    }
};
