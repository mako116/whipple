import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { formatTime } from "../../../utlis/FormatTime";

const LINKS = [
  { label: "Sports", to: "/" },
  { label: "Games", to: "/games" },
  { label: "Pre-Bet Activities", to: "/prebet-activities" },
 ];

 

export default function NavMenu() {
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="flex flex-wrap space-x-4 items-center">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            isActive
              ? "text-blue-900 font-semibold  font-sans md:text-[19px] "
              : "text-gray-700 hover:text-blue-900 md:text-[19px] font-sans"
          }
        >
          {link.label}
        </NavLink>
      ))}
      <div className="md:ml-4 text-gray-600 font-mono md:text-[19px]">
        <span>GMT-{currentTime}</span>
      </div>
    </nav>
  );
}
