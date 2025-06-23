import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Home', to: '/' },
  { name: 'Games', to: '/games' },
  { name: 'Promotions', to: '/promotions' },
];

export default function DesktopNav() {
  return (
    <nav className="hidden md:flex space-x-6">
      {links.map((link) => (
        <NavLink key={link.to}
          to={link.to}
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
          }>
          {link.name}
        </NavLink>
      ))}
      <a href="/deposit" className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Deposit</a>
    </nav>
  );
}
