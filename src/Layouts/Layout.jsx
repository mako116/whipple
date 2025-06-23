import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Headers/Header';
// import Header from '../components/headers/Header';

const AppLayout= () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-700">
      {/* ===== Header Start ===== */}
      <Header />
       {/* ===== Header End ===== */}

      {/* ===== Main Content Start ===== */}
         <div className='w-full mt-[100px]'>
          <Outlet />
        </div>
       {/* ===== Main Content End ===== */}
    </div>
  );
};

export default AppLayout;