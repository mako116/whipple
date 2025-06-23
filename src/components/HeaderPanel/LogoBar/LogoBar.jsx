import { Link } from "react-router-dom";

export default function LogoBar() {
  return (
    <div className="flex items-center space-x-4 ">
      <Link to="/" className="text-2xl font-bold text-blue-900">Whipple</Link>
      
    </div>
  );
}
