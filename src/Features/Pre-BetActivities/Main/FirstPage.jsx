/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import Button from '../../../components/button/gamebutton';

export default function PreBetActivities() {
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    controls.start({
      y: [-10, 0],
      transition: { y: { duration: 0.5, yoyo: Infinity, ease: 'easeInOut' } },
    });
  }, [controls]);

    useEffect(() => {
          window.scrollTo(0, 0);
        }, []);

  const handleLeaguePress = () => {
    navigate('/select-league');
  };

  return (
    <div className="  flex justify-center items-start  bg-gray-50">
      <div className="w-full max-w-2xl overflow-y-auto space-y-8">

        <div className="flex flex-col items-center text-center space-y-4 my-[30px]">
          <motion.div animate={controls} className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} stroke="white" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold text-blue-600 font-[montserratMedium]">Pre-Bet Activities</h1>
          <p className="text-gray-600 text-sm leading-6 max-w-xl font-[PoppinsReg]">
            Correctly predict the outcome of football matches and stand a chance to win FREE BET(S) or 25% Discounted Bets on each game you correctly predict.
          </p>
        </div>

        <div className="border-2 border-blue-300 bg-gray-50 rounded-lg shadow p-6 space-y-4">
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} stroke="#3b82f6" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
            <h2 className="text-lg font-bold text-gray-900 font-[PoppinsReg]">Win Big with Your Predictions!</h2>
          </div>
          <p className="text-sm text-gray-600 font-[PoppinsReg]">Choose from two exciting prediction categories</p>

          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-gray-900 font-[PoppinsReg] mb-1">Overall Outcome</h3>
              <p className="text-sm text-gray-600 leading-5 font-[PoppinsReg]">
                This category is completely FREE if you choose to predict the outcome of ONE GAME, and $0.5 (naira equivalent) if you choose to predict the outcomes of multiple games.
              </p>
              <p className="text-sm font-semibold mt-1 text-gray-900">Prize: 25% Discounted Bets (valid for 72 hours)</p>
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900 font-[PoppinsReg] mb-1">Correct Score</h3>
              <p className="text-sm text-gray-600 leading-5 font-[PoppinsReg]">
                This category has a one dollar (naira equivalent) Admission Fee. Predict the exact score of matches.
              </p>
              <p className="text-sm font-semibold mt-1 text-gray-900">Prize: FREE Bets (no expiration)</p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mb-[20px]">
      
          <Button 
           onClick={handleLeaguePress}
          text={' Start Predicting'}
          />
        </div>
      </div>
    </div>
  );
}
