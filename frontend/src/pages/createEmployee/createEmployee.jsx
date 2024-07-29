import { useState } from 'react';
import useCreateEmployee from '../../hooks/useCreateEmployee';
import NavBar from '../navBar/NavBar';
import GenderCheckBox from './GenderCheckBox';
import toast from 'react-hot-toast';

const CreateEmployee = () => {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: [],
        image: null,  // Add image to the form state
    });

    const { loading, createEmployee } = useCreateEmployee();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        setInputs((prevState) => {
            if (checked) {
                return { ...prevState, course: [...prevState.course, value] };
            } else {
                return { ...prevState, course: prevState.course.filter((course) => course !== value) };
            }
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
            setInputs((prevState) => ({ ...prevState, image: file }));
        } else {
            toast.error('Invalid file type. Only JPG and PNG are allowed.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createEmployee(inputs);
    };

    return (
        <div>
            <NavBar />
            <div className='h-screen flex items-center justify-center '>
                <div className='flex flex-col items-center justify-center min-w-96 mx-auto bg-white rounded-lg '>
                    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                        <h1 className='text-3xl font-semibold text-center text-gray-300'>
                            Create Employee
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className='label p-2'>
                                    <span className='text-black label-text'>Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder='Enter Full Name'
                                    className='w-full input input-bordered h-10'
                                    value={inputs.name}
                                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className='label p-2'>
                                    <span className='text-black label-text'>Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder='Enter Email'
                                    className='w-full input input-bordered h-10'
                                    value={inputs.email}
                                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className='label p-2'>
                                    <span className='text-black label-text'>Mobile Number</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder='Enter Phone Number'
                                    className='w-full input input-bordered h-10'
                                    value={inputs.mobileNo}
                                    onChange={(e) => setInputs({ ...inputs, mobileNo: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className='label p-2'>
                                    <span className='text-black label-text'>Designation</span>
                                </label>
                                <select
                                    className="form-select w-full h-10 input-bordered"
                                    value={inputs.designation}
                                    onChange={(e) => setInputs({ ...inputs, designation: e.target.value })}
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
                                <GenderCheckBox
                                    onCheckboxChange={handleCheckboxChange}
                                    selectedGender={inputs.gender}
                                />
                            </div>
                            <div className="form-control">
                                <label>
                                    <span className="label-text text-black">Courses</span>
                                </label>
                                <div>
                                    <label className="label-text text-black">
                                        <input
                                            type="checkbox"
                                            className="checkbox border-slate-900"
                                            value="MCA"
                                            checked={inputs.course.includes('MCA')}
                                            onChange={handleCourseChange}
                                        /> MCA
                                    </label>
                                </div>
                                <div>
                                    <label className="label-text text-black">
                                        <input
                                            type="checkbox"
                                            className="checkbox border-slate-900"
                                            value="BCA"
                                            checked={inputs.course.includes('BCA')}
                                            onChange={handleCourseChange}
                                        /> BCA
                                    </label>
                                </div>
                                <div>
                                    <label className="label-text text-black">
                                        <input
                                            type="checkbox"
                                            className="checkbox border-slate-900"
                                            value="BSC"
                                            checked={inputs.course.includes('BSC')}
                                            onChange={handleCourseChange}
                                        /> BSC
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className='label p-2'>
                                    <span className='text-black label-text'>Upload Image</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    onChange={handleFileChange}
                                    className="w-full input input-bordered h-10"
                                />
                            </div>
                            <div>
                                <button className="btn btn-block btn-sm mt-2" disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;
