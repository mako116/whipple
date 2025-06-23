import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  showPassword = false,
  togglePassword = null,
  placeholder = "",
  className = "",
}) => {
  const isPassword = type === "password";

  return (
    <div className='grid gap-1'>
      {label && <label htmlFor={name}>{label}:</label>}
      <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
        <input
          type={isPassword && !showPassword ? "password" : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full outline-none ${className}`}
        />
        {isPassword && togglePassword && (
          <span onClick={togglePassword} className='cursor-pointer ml-2'>
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormInput;
