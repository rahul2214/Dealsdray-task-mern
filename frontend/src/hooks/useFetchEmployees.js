import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useFetchEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/employee/employees');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setEmployees(data);
            setTotalEmployees(data.length);
        } catch (error) {
            toast.error('Error fetching employees');
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const deleteEmployee = async (id) => {
        try {
            console.log(`Attempting to delete employee with ID: ${id}`);
            const response = await fetch(`/api/employee/employee/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(`Response status: ${response.status}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            setEmployees((prevEmployees) => prevEmployees.filter(employee => employee._id !== id));
            setTotalEmployees(prevTotal => prevTotal - 1);
            toast.success('Employee deleted successfully');
        } catch (error) {
            toast.error(`Error deleting employee: ${error.message}`);
            console.error('Error deleting employee:', error);
        }
    };

    return { employees, totalEmployees, loading, deleteEmployee, fetchEmployees };
};

export default useFetchEmployees;
