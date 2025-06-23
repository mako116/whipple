import React from 'react';
import Banner from './Banner';
import WinnersPrizeTicker from './WinnersSlide';
import AvailablePublishedGame from '../AvailableGames/AvaliableGames';
import { useNavigate } from 'react-router-dom';
import LosersGames from '../LostGames/LostGames';
import bg from "../../assets/images/bgims.jpg";
  
const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      {/* Top Section: Title */}
       <Banner/>

      <div className="space-y-6 mt-5">
 
        {/* Available Games */}
        <div 
          style={{
              backgroundImage: `url(${bg})`,
            }}
        className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Available Games</h2>
            <button
              onClick={() => navigate('/available-games')}
              className="bg-blue-100 cursor-pointer text-blue-800 px-4 py-1 rounded text-sm"
            >
              See all
            </button>
          </div>
          <AvailablePublishedGame showFilter={false} minHeight="h-[350px]" overflow='overflow-auto' />
        </div>

        {/* Loser's Games */}
        <div 
         style={{
              backgroundImage: `url(${bg})`,
            }}
        className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Loser's Games</h2>
            <button
            //   onClick={() => navigate('/games/LostGames/ViewLostGames')}
              className="bg-blue-100 text-blue-800 px-4 py-1 rounded text-sm"
            >
              See all
            </button>
          </div>
          <LosersGames showFilter={false} minHeight="h-[350px]"  overflow="overflow-auto" />
        </div>

        {/* Features */}
        <WinnersPrizeTicker />
      </div>

      {/* <FloatingMessage /> */}
    </div>
  );
};

export default HomeScreen;
