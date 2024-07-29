import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const allCourses = ['MCA', 'BCA', 'BSC']; // List of all possible courses

const EditEmployeeForm = ({ employee, onClose }) => {
    const [formData, setFormData] = useState({
        ...employee,
        course: JSON.parse(employee.course || '[]'), // Ensure course is initialized as an array
        image: null,
    });
    const [currentImage, setCurrentImage] = useState(employee.image || '');
    const [imageName, setImageName] = useState('');

    useEffect(() => {
        if (employee.image) {
            const imagePathParts = employee.image.split('/');
            setImageName(imagePathParts[imagePathParts.length - 1]);
        }
    }, [employee.image]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'course') {
            setFormData((prevData) => {
                const selectedCourses = new Set(prevData.course);
                if (selectedCourses.has(value)) {
                    selectedCourses.delete(value); // Deselect if already selected
                } else {
                    selectedCourses.add(value); // Select if not already selected
                }
                return { ...prevData, course: Array.from(selectedCourses) };
            });
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setFormData((prevData) => ({ ...prevData, image: file }));
            setCurrentImage(URL.createObjectURL(file)); // Preview the new image
            setImageName(file.name); // Set the new image name
        } else {
            toast.error('Invalid file type. Only JPG and PNG are allowed.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSubmit = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key === 'course') {
                    formDataToSubmit.append(key, JSON.stringify(formData[key]));
                } else if (key === 'image') {
                    // Only append image if a new file is selected
                    if (formData[key] !== null) {
                        formDataToSubmit.append(key, formData[key]);
                    }
                } else {
                    formDataToSubmit.append(key, formData[key]);
                }
            });

            const response = await fetch(`/api/employee/employee/${employee._id}`, {
                method: 'PUT',
                body: formDataToSubmit,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            toast.success('Employee updated successfully');
            onClose();
        } catch (error) {
            toast.error(`Error updating employee: ${error.message}`);
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className='p-60 h-32 flex items-center justify-center'>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='label p-2'>
                                <span className='text-black label-text'>Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                className='w-full input input-bordered h-10'
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className='label p-2'>
                                <span className='text-black label-text'>Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                className='w-full input input-bordered h-10'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className='label p-2'>
                                <span className='text-black label-text'>Mobile Number</span>
                            </label>
                            <input
                                type="text"
                                name="mobileNo"
                                className='w-full input input-bordered h-10'
                                value={formData.mobileNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className='label p-2'>
                                <span className='text-black label-text'>Designation</span>
                            </label>
                            <select
                                name="designation"
                                className="form-select w-full h-10 input-bordered"
                                value={formData.designation}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                        <div>
                            <label className='label p-2'>
                                <span className='text-black label-text'>Gender</span>
                            </label>
                            <div className="flex space-x-4">
                                <label className="label-text text-black">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleChange}
                                        className="radio"
                                    /> Male
                                </label>
                                <label className="label-text text-black">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleChange}
                                        className="radio"
                                    /> Female
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className='label p-2'>
                                <span className='text-black label-text'>Courses</span>
                            </label>
                            <div>
                                {allCourses.map((course) => (
                                    <div key={course}>
                                        <label className="label-text text-black">
                                            <input
                                                type="checkbox"
                                                name="course"
                                                className="checkbox border-slate-900"
                                                value={course}
                                                checked={formData.course.includes(course)}
                                                onChange={handleChange}
                                            /> {course}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className='label p-2'>
                                <span className='text-black label-text'>Upload Image</span>
                            </label>
                            {currentImage && (
                                <div className="mt-2">
                                    <p>Current Image:</p>
                                    <img src={currentImage} alt="Current" className="h-20 w-20 object-cover" />
                                    <p>{imageName}</p>
                                </div>
                            )}
                            <input
                                type="file"
                                name="image"
                                accept="image/jpeg,image/png"
                                className='w-full input input-bordered h-10'
                                onChange={handleFileChange}
                            />

                        </div>
                        <div>
                            <button className="btn btn-block btn-sm mt-2 bg-blue-400 text-white">Edit</button>
                        </div>
                        <button
                            className="btn btn-block btn-sm mt-2 bg-red-500 text-white"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeForm;
