import { AlertCircle, History, Users } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { BiNotification } from "react-icons/bi";
import { FaCashRegister } from "react-icons/fa";
import { FiUser, FiLogOut, FiClipboard, FiGift, FiBell } from "react-icons/fi";
import { IoCash } from "react-icons/io5";
import { MdSecurityUpdate, MdSupport } from "react-icons/md";
import { Link } from "react-router-dom";

const MENU = [
    { icon: <FiClipboard />, label: "My Account Info", to: "/my-profile" },
    { icon: <BiNotification />, label: "Notification", to: "/notification" },
    { icon: <FaCashRegister />, label: "Deposit", to: "/deposit-page" },
    { icon: <IoCash />, label: "Withdraw", to: "/withdraw" },
    { icon: <Users />, label: "Refer and Earn", to: "/invite-user" },
    { icon: <MdSecurityUpdate />, label: "Security", to: "/security-password" },
    { icon: <MdSupport />, label: "support", to: "/support" },

    { icon: <FiLogOut />, label: "Logout", to: "/logout" },

];

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative  text-gray-700">
      <button onClick={() => setOpen(!open)} className="flex cursor-pointer items-center space-x-1">
        <FiUser />
        <span>My Account</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-md rounded w-48 text-sm z-20">
          {MENU.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
