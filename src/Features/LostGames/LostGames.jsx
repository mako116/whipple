import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import FilterTabPanel from '../../components/FilterTab/FilterTab';

const LosersGames = ({ showFilter = true, minHeight = 'min-h-screen', overflow = 'overflow-hidden' }) => {
  // const navigate = useNavigate();
  // const { userDetails } = useContext(AuthContext);
  // const { stake, odds, gameLabel, range, selected, GameName, isGameLost } = userDetails;

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // const [selectedTab, setSelectedTab] = useState('All');

  // const handlePlayNow = () => {
  //   navigate('/game-details', {
  //     state: { stake, odds, gameLabel, GameName, range, selected },
  //   });
  // };

  // const shouldDisplayGame = selectedTab === 'All' || selectedTab.toLowerCase().includes(GameName?.toLowerCase());

  // if (!isGameLost) {
  //   return (
  //     <div className="flex flex-col justify-center items-center min-h-[200px]">
  //       <p className="text-gray-500 text-base text-center px-5 font-medium">No game is currently published.</p>
  //     </div>
  //   );
  // }

  return (
    <>
    </>
    // <div className={`${minHeight} ${overflow} bg-gray-100 p-4`}>
    //   {showFilter && (
    //     <>
    //       <div className="bg-white mb-5 rounded-xl border border-gray-300 p-4 w-[90%] mx-auto">
    //         <p className="text-lg font-bold mb-1 text-black">🎯 Losers' Game Rules</p>
    //         <p className="text-sm text-gray-600 mb-3 font-normal">
    //           Your second chance at games you previously lost.
    //         </p>

    //         <p className="text-sm font-semibold mb-2">Benefits:</p>
    //         <p className="mb-1 pl-2">• 1.5x your original stake</p>
    //         <p className="mb-1 pl-2">• 1.2x better odds</p>
    //         <p className="mb-1 pl-2">• Same gameplay rules</p>
    //         <p className="mb-1 pl-2">• Fresh, randomly drawn numbers</p>
    //       </div>

    //       <FilterTabPanel onTabChange={setSelectedTab} />
    //     </>
    //   )}

    //   <div className="flex flex-col py-2 overflow-y-auto">
    //     {shouldDisplayGame ? (
    //       <div className="flex gap-2">
    //         <div className="bg-white md:w-[350px] rounded-lg shadow border">
    //           <div className="flex items-center p-4 border-b border-gray-100 bg-gray-100 rounded-t-xl">
    //             <span className="text-base mr-2">🎲</span>
    //             <p className="text-base font-semibold">{GameName} - Lost Game</p>
    //           </div>

    //           <div className="p-4">
    //             <div className="flex justify-between mb-3">
    //               <div>
    //                 <p className="text-xs text-gray-600 font-normal">Stake</p>
    //                 <p className="text-base font-bold text-gray-900">₦{stake}</p>
    //               </div>
    //               <div className="text-right">
    //                 <p className="text-xs text-gray-600 font-normal">Odds</p>
    //                 <p className="text-base font-bold text-gray-900">{odds}</p>
    //               </div>
    //             </div>

    //             <p className="text-xs text-gray-700 my-2 font-normal">
    //               {GameName} - {gameLabel} {range}
    //             </p>

    //             <div className="flex justify-between mb-4">
    //               <p className="text-xs text-gray-700 font-normal">
    //                 <span className="font-medium text-gray-500">House:</span> @current-user
    //               </p>
    //               <p className="text-xs text-gray-700 font-normal">
    //                 <span className="font-medium text-gray-500">Status:</span> Open
    //               </p>
    //             </div>

    //             <button
    //               className="mt-4 cursor-pointer bg-blue-600 py-3 rounded-lg w-full text-white font-semibold hover:bg-blue-700 transition"
    //               onClick={handlePlayNow}
    //             >
    //               Play Now
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <p className="text-gray-500 text-base text-center px-5 font-medium">No game is currently published.</p>
    //     )}
    //   </div>
    // </div>
  );
};

export default LosersGames;
