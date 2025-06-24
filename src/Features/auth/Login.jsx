import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUser } from '../../hooks/use.auth';
import { AuthContext } from '../../context/authContext';
 import FormInput from '../../components/Input/FormInput';
import toast from 'react-hot-toast';
import fetechUserDetails from '../../hooks/use.user';

const Login = () => {
  const [data, setData] = useState({
    email : "" ,
    password: "",
  });
    const {userDetails, setUserDetails} = useContext(AuthContext)
   const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();
  
const { mutate, isLoading } = useLoginUser(async (response) => {
      console.log("LOGIN RESPONSE =>", response);
    if (response.success) {
        toast.success(response.message)
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        console
        // Save user details to context
        const userDetails = await fetechUserDetails()
        setUserDetails(userDetails.data)
        // Clear form
        setData({ email: "", password: "" })

        // Navigate to home
        navigate("/home")
    } else {
         toast.error(response.message || "Login failed");
    }
})


  const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };


  const handleLogin = () => {
        // e.preventDefault();
         navigate("/home")
        // mutate(data);
    };
  

      const isFormValid = Object.values(data).every(el => el);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">Welcome Back</h1>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <FormInput
          label="Email"
          type="email"
          name="email"
          // value={data.email}
          //  onChange={handleChange}
           />

       <FormInput
        label="Password"
        name="password"
        // value={data.password}
        type='password'
        // onChange={handleChange}
        showPassword={showPassword}
        togglePassword={() => setShowPassword(prev => !prev)}
        />

        <button
          onClick={handleLogin}
            // disabled={!isFormValid || isLoading}
            className={`w-full my-5 transition-all cursor-pointer duration-300 ${isFormValid ? "bg-blue-600 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"} text-white py-3 rounded font-semibold tracking-wide`}
          >
          {isLoading ? 'Loading...' : 'Login'}
        </button>

        <div className="text-center mt-4 text-sm">
          Don't have an account?{' '}
          <Link
          to={'/login'}
            // onClick={() => navigate('/signup')}
            className="text-blue-600 font-bold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
