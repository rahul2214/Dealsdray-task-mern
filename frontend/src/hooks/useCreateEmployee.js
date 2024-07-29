import { useState } from 'react';
import toast from 'react-hot-toast';

const useCreateEmployee = () => {
    const [loading, setLoading] = useState(false);

    const createEmployee = async ({ name, email, mobileNo, gender, designation, course, image }) => {
        if (!handleInputErrors({ name, email, mobileNo, gender, designation, course, image })) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('mobileNo', mobileNo);
            formData.append('gender', gender);
            formData.append('designation', designation);
            formData.append('course', JSON.stringify(course));
            formData.append('image', image);

            const res = await fetch('/api/employee/employee', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Error creating employee');
            }

            toast.success('Employee created successfully!');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, createEmployee };
};

function handleInputErrors({ name, email, mobileNo, gender, designation, course, image }) {
    if (!name || !email || !mobileNo || !gender || !designation || !course || !image) {
        toast.error('Please fill in all fields.');
        return false;
    }
    if (mobileNo.length !== 10) {
        toast.error('Mobile number must be exactly 10 characters.');
        return false;
    }
    if (image && !['image/jpeg', 'image/png'].includes(image.type)) {
        toast.error('Invalid file type. Only JPG and PNG are allowed.');
        return false;
    }
    return true;
}

export default useCreateEmployee;
