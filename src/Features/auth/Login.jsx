import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import FormInput from '../../components/Input/FormInput';
import toast from 'react-hot-toast';
import { useRequest } from '../../hooks/useRequest';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, makeRequest } = useRequest();
  const { setUserDetails, setUserBalance, setUserPoint } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim() || !password.trim()) {
      toast.error('Please enter email and password');
      return;
    }

    try {
      const { error, response } = await makeRequest('/login', {
        email,
        password,
      });

      if (error) {
        toast.error(typeof error === 'string' ? error : 'Login Failed');
        return;
      }

      if (response) {
         localStorage.setItem('userDetails', JSON.stringify(response.user));
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userBalance', response.user.wallet_balance);
        localStorage.setItem('userPoint', response.user.whipple_point);

         setUserDetails(response.user); 
         setUserBalance(response.user.wallet_balance);
         setUserPoint(response.user.whipple_point);
 
        toast.success('Login successful!');

        // Redirect to home or dashboard
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">Welcome Back</h1>

      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormInput
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          togglePassword={() => setShowPassword((prev) => !prev)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 w-full cursor-pointer transition-all duration-300 
            bg-blue-600 hover:bg-blue-700
            text-white py-3 rounded font-semibold tracking-wide
            ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>

        <div className="text-center mt-4 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-bold hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
