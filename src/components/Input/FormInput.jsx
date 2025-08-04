import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const FormInput = ({
  label,
  type = "text",
  name,
  // value,
  onChange,
  showPassword = false,
  togglePassword = null,
  placeholder = "",
  className = "",
}) => {
   const isPasswordField = name?.toLowerCase().includes("password");

  return (
    <div className='grid gap-1'>
      {label && <label htmlFor={name}>{label}:</label>}
      <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
        <input
          type={isPasswordField && !showPassword ? "password" : "text"}
          id={name}
          name={name}
          // value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full outline-none ${className}`}
        />
        {isPasswordField && togglePassword && (
          <span onClick={togglePassword} className='cursor-pointer ml-2'>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormInput;
