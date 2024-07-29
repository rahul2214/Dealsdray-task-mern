import { useState, useMemo } from 'react';
import useFetchEmployees from '../../hooks/useFetchEmployees';
import NavBar from '../navBar/NavBar';
import EditEmployeeForm from '../editEmployee/EditEmployeeForm';
import { useNavigate } from 'react-router-dom';
import EmployeeSearchInput from '../../components/SearchInput';
import profile from './images/image.png'
const EmployeeList = () => {
    const { employees, totalEmployees, loading, fetchEmployees, deleteEmployee } = useFetchEmployees();
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const navigate = useNavigate();

    const sortedEmployees = useMemo(() => {
        let sortedList = [...employees];
        if (sortField) {
            sortedList.sort((a, b) => {
                let aValue = a[sortField];
                let bValue = b[sortField];

                if (sortField === "createdAt") {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                } else if (sortField === "_id") {
                    aValue = aValue.toString();
                    bValue = bValue.toString();
                } else {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (aValue < bValue) {
                    return sortOrder === "asc" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortOrder === "asc" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedList.filter(employee =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [employees, sortField, sortOrder, searchTerm]);

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
    };

    const handleUpdateSuccess = () => {
        fetchEmployees();
        setEditingEmployee(null);
    };

    const handleCreateEmployee = () => {
        navigate('/createEmployee');
    };

    if (loading) {
        return <p className='text-white'>Loading...</p>;
    }

    return (
        <div>
            <NavBar />
            <div className="">
                <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold text-gray-300">Employee List</h1>
                        <EmployeeSearchInput onSearch={setSearchTerm} />
                    </div>
                    <br />
                    <div className="fetch flex justify-between items-center">
                        <h1 className="text-center text-gray-300">Total Employees: {totalEmployees}</h1>
                        <span>
                            <button onClick={handleCreateEmployee} className="bg-blue-500 text-white px-4 py-2 rounded">Create Employee</button>
                        </span>
                    </div>
                    <div className="flex justify-between items-center mt-4 mb-2">
                        <label className="text-gray-300">
                            Sort By:
                            <select
                                value={sortField}
                                onChange={(e) => setSortField(e.target.value)}
                                className="ml-2 p-2 "
                            >
                                <option value="">Select Field</option>
                                <option value="name">Name</option>
                                <option value="email">Email</option>
                                <option value="createdAt">Date Created</option>
                            </select>
                        </label>
                        <label className="text-gray-300 ml-4">
                            Order:
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="ml-2 p-2 "
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </label>
                    </div>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="w-1/4 px-4 py-2 text-black">Image</th>
                                <th className="w-1/4 px-4 py-2 text-black">Name</th>
                                <th className="w-1/4 px-4 py-2 text-black">Email</th>
                                <th className="w-1/4 px-4 py-2 text-black">Mobile Number</th>
                                <th className="w-1/4 px-4 py-2 text-black">Designation</th>
                                <th className="w-1/4 px-4 py-2 text-black">Gender</th>
                                <th className="w-1/4 px-4 py-2 text-black">Courses</th>
                                <th className="w-1/4 px-4 py-2 text-black">Created</th>
                                <th className="w-1/4 px-4 py-2 text-black">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedEmployees.map((employee) => (
                                <tr key={employee._id}>
                                    <td className="border px-4 py-2 text-black">
                                        {employee.image ? (
                                            <img src={profile || employee.image } alt={employee.name} className="h-10 w-10 object-cover" />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td className="border px-4 py-2 text-black">{employee.name}</td>
                                    <td className="border px-4 py-2 text-black">{employee.email}</td>
                                    <td className="border px-4 py-2 text-black">{employee.mobileNo}</td>
                                    <td className="border px-4 py-2 text-black">{employee.designation}</td>
                                    <td className="border px-4 py-2 text-black">{employee.gender}</td>
                                    <td className="border px-4 py-2 text-black">{JSON.parse(employee.course).join(', ')}</td>
                                    <td className="border px-4 py-2 text-black">{new Date(employee.createdAt).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2 text-black">
                                        <button
                                            className='bg-blue-300 w-14 text-white m-2'
                                            onClick={() => handleEdit(employee)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='bg-red-800 w-14 text-white m-2'
                                            onClick={() => deleteEmployee(employee._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {editingEmployee && (
                        <EditEmployeeForm employee={editingEmployee} onClose={handleUpdateSuccess} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
