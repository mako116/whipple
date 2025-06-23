import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useRegisterUser } from '../../hooks/use.auth';
import FormInput from '../../components/Input/FormInput';
import { AuthContext } from '../../context/authContext';
import AxiosToastError from '../../utlis/AxiosToastError';

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "", 
        confirmPassword: ""
    });
    const {userDetails, setUserDetails} = useContext(AuthContext)
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const { mutate, isLoading } = useRegisterUser((response) => {
    if (response.success) {
        toast.success(response.message)
       setUserDetails(response?.user); // Save user to context 
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
       navigate('/otp', {
  state: { email: formData.email }
});

    }else{
       AxiosToastError(response.error)
       toast.error('failed')
     }
    }); 

    // 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = Object.values(formData).every(el => el);

    // submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        mutate(formData);
    };

    return (
 
        <section className='flex flex-col justify-center items-center min-h-screen bg-blue-100 p-6'>
              <h2 className='text-3xl font-bold text-center text-gray-800 mb-2'>Create Account</h2>
            <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
                <p className='text-center text-gray-500 mb-6'>Welcome to Binkeyit. Please register to continue.</p>

                <form className='grid gap-5' onSubmit={handleSubmit}>
                    <FormInput
                        label="Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Password"
                        name="password"
                        type='password'
                        value={formData.password}
                        onChange={handleChange}
                        showPassword={showPassword}
                        togglePassword={() => setShowPassword(prev => !prev)}
                    />

                    <FormInput
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        type='password'
                        showPassword={showConfirmPassword}
                        togglePassword={() => setShowConfirmPassword(prev => !prev)}
                    />

                    <button
                        type='submit'
                        disabled={!isFormValid || isLoading}
                        className={`transition-all cursor-pointer duration-300 ${isFormValid ? "bg-blue-600 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"} text-white py-3 rounded font-semibold tracking-wide`}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className='mt-6 text-center text-sm text-gray-600'>
                    Already have an account?{" "}
                    <Link to="/login" className='text-green-700 font-semibold hover:underline'>
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
