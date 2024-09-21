import express from 'express';
import multer from 'multer';
import protectRoute from '../middleware/protectRoute.js';
import { deleteEmployee, employee, getAllEmployees, updateEmployee } from '../controllers/employeeController.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/employee', protectRoute, upload.single('image'), employee);
router.get('/employees',  getAllEmployees);
router.delete('/employee/:id', protectRoute, deleteEmployee);
router.put('/employee/:id', protectRoute, upload.single('image'), updateEmployee);

export default router;
