import { Link } from "react-router-dom"
import { useState } from "react"
import useSignup from "../../hooks/useSignup"

const SignUp = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    })
    const {  signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }
    return (
        < div className='p-4 h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center min-w-96 mx-auto bg-white rounded-lg'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up
                </h1>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label className='label p-2'>
                            <span className='text-black label-text'>UserName</span>
                        </label>
                        <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10'
                            value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-black label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"
                            value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-black label-text">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="Confirm Password" className="w-full input input-bordered h-10"
                            value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>
                    <Link to="/login" className="text-sm hover:underline
                    hover:text-blue-600 mt-2 inline-block"> Already have an account?</Link>
                    <div>
                        <button className="btn btn-block btn-sm mt-2">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default SignUp;