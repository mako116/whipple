import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FormInput from '../../components/Input/FormInput';
import { useRequest } from '../../hooks/useRequest';

const Register = () => {
  const { makeRequest, loading } = useRequest();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const data = { name, email, phoneNumber, password, passwordConfirm };
  const isFormValid = Object.values(data).every(el => el.trim() !== '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return toast.error('All fields are required');
    }

    if (password !== passwordConfirm) {
      return toast.error('Passwords do not match');
    }

    try {
      const res = await makeRequest('/signup', { name, email, password, phoneNumber });

      if (res.error) {
        return toast.error(res.error);
      }

      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <section className='flex flex-col justify-center items-center min-h-screen bg-blue-100 p-6'>
      <h2 className='text-3xl font-bold text-center text-gray-800 mb-2'>Create Account</h2>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
        <p className='text-center text-gray-500 mb-6'>Welcome to Whipple. Please register to continue.</p>

        <form className='grid gap-5' onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            name="name"
             onChange={(e) => setName(e.target.value)}
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
             onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            label="Phone Number"
            name="phone"
             onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <FormInput
            label="Password"
            name="password"
             type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(prev => !prev)}
          />

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
             type={showConfirmPassword ? 'text' : 'password'}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            showPassword={showConfirmPassword}
            togglePassword={() => setShowConfirmPassword(prev => !prev)}
          />

          <button
            type='submit'
            // disabled={!isFormValid || loading}
            className={`transition-all duration-300 cursor-pointer bg-blue-600 hover:bg-blue-700  text-white py-3 rounded font-semibold tracking-wide`}
          >
            {loading ? "Registering..." : "Register"}
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
