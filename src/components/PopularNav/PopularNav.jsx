// src/components/PopularNav.tsx
import { Link } from "react-router-dom";
import bg from "../../assets/images/bgims.jpg";

export default function PopularNav() {
  const links = [
    { href: "/today's-wheel-spin", label: "Today's Wheel's Spin" },
    { href: "/sport/football/upcoming", label: "Upcoming Correct Scores" },
    { href: "/all-color-roulette", label: "Play Color Roulette" },
  ];

  return (
    <nav 
     style={{
            backgroundImage: `url(${bg})`,
            // minHeight: "300px",
       }}
    className="bg-white rounded-lg  cursor-pointer shadow-md p-4 w-full max-w-xs mx-auto">
      {/* Overlay for better contrast */}

      <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-200 pb-2">
        Popular
      </h2>
      <ul className="flex flex-col space-y-3 ">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              to={href}
              className="flex items-center justify-between px-3 py-2 rounded-md text-[#fff] cursor-pointer hover:text-blue-900 transition-all duration-300 shadow-sm"
              aria-label={`Navigate to ${label}`}
            >
              <span className="font-medium">{label}</span>
              <svg
                className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
      
    </nav>
  );
}
