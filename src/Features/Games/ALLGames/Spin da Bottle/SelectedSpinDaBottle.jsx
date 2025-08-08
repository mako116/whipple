import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/authContext';
import bottleImage from '../../../../assets/icons/Beer-Bottle-Transparent-Image-2.png';
import Button from '../../../../components/button/gamebutton';
import WinningModal from '../../../../components/modals/WinningModal';
import LosingModal from '../../../../components/modals/LosersModal';
import { useRequest } from '../../../../hooks/useRequest';
import toast from 'react-hot-toast';

const SelectedSpinBottle = () => {
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [success, setSuccess] = useState(null);
  const [visible, setVisible] = useState(false);
  const [spinDegree, setSpinDegree] = useState(0);
    const [searchParams] = useSearchParams();
   const id = searchParams.get('id');
  const name = searchParams.get('name');
  const stake = Number(searchParams.get('stake'));
  const odds = searchParams.get('odds');
  const house = searchParams.get('house');
  const subcategory = searchParams.get('subcategory');

  const spinValue = useRef(0);
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const {  gameLabel, GameName = 'Spin the Bottle' } = userDetails || {};
 const {makeRequest} = useRequest()
  const spinBottle = (direction) => {
    setIsSpinning(true); 
    setResult(null);

    const randomExtraSpin = Math.floor(Math.random() * 360); // Extra spin to make it more dynamic
    let baseSpin = spinValue.current + (360 * 4); // Minimum 4 full spins
    let finalSpin = 0;

    if (direction === 'UP') {
      // Bottle should stop at 0 degrees (pointing up)
      finalSpin = baseSpin + randomExtraSpin;
      // Align the finalSpin to the closest 0 degrees
      finalSpin = finalSpin - (finalSpin % 360);
    } else if (direction === 'DOWN') {
      // Bottle should stop at 180 degrees (pointing down)
      finalSpin = baseSpin + randomExtraSpin;
      // Align the finalSpin to the closest 180 degrees
      finalSpin = finalSpin - (finalSpin % 360) + 180;
    }
    spinValue.current = finalSpin;
    setSpinDegree(finalSpin);
     makeRequest('/play-game', {
  gameId: id,
  name,
  direction: direction.toLowerCase()
})
.then(res => {
  console.log(res);

  if (res.error) {
    return toast.error(res.error || 'Something went wrong');
  }

  if (res.response.success) {
    setSuccess(true);
    setVisible(true);
  } else {
    setSuccess(false);
    setVisible(true);
  }

  setIsSpinning(false);
})
.catch((e) => {
  console.log(e);
  setIsSpinning(false);
});

    

     
  };

  const handleDirectionSelect = (direction) => {
    if (isSpinning) return;

    if (selectedDirection === direction) {
      setSelectedDirection(null);
      return;
    }

    setSelectedDirection(direction);
    spinBottle(direction);
  };

  const handleLosersGame = () => {
    setUserDetails({
      ...userDetails,
      stake,
      odds,
      gameLabel,
      GameName,
      isGameLost: true,
    });
    navigate('/losers-games');
  };

  const closeModal = () => {
    setVisible(false);
  };

   useEffect(() => {
          window.scrollTo(0, 0);
        }, []);
  return (
    <div className='bg-blue-100'>
      <div className="min-h-screen mx-auto md:max-w-[600px] p-6">
        <h1 className="text-3xl font-bold mb-4">{GameName}</h1>
        <p className="text-gray-700 mb-4">Select a direction and spin the bottle!</p>

        <div className="flex justify-center items-center mb-6 relative w-64 h-64 mx-auto rounded-full border-4 border-gray-400">
          <div className="absolute top-0 w-full h-1/2 bg-green-500 rounded-t-full flex justify-center items-center">
            <span className="font-bold text-purple-700">UP</span>
          </div>
          <div className="absolute bottom-0 w-full h-1/2 bg-orange-500 rounded-b-full flex justify-center items-center">
            <span className="font-bold text-purple-700">DOWN</span>
          </div>
          <img
            src={bottleImage}
            alt="Bottle"
            className="w-20 h-20 z-50 transition-transform duration-[3000ms] ease-out"
            style={{ transform: `rotate(${spinDegree}deg)` }}
          />
        </div>

        {result && (
          <div className="bg-green-600 text-white text-center py-2 mb-4 font-bold">
            Result: {result}
          </div>
        )}

        {success === null && (
          <div className="flex justify-center mx-auto gap-4 mb-6">
            <Button
              isDisabled={isSpinning}
              onClick={() => handleDirectionSelect('UP')}
              text={'Up'}
              className={`py-2 px-6 rounded text-white ${selectedDirection === 'UP' ? 'bg-green-700' : 'bg-green-500'}`}
            />
            <Button
              className={`py-2 px-6 rounded text-white ${selectedDirection === 'DOWN' ? 'bg-orange-700' : 'bg-orange-500'}`}
              isDisabled={isSpinning}
              onClick={() => handleDirectionSelect('DOWN')}
              text={'Down'}
            />
          </div>
        )}

        {success === true && (
          <Button
            className="w-full bg-blue-900 text-white py-3 rounded mb-4"
            onClick={() => navigate('/games')}
            text={'Back to Games'}
          />
        )}

        {success === false && (
          <Button
            className="w-full bg-blue-900 text-white py-3 rounded mb-4"
            onClick={handleLosersGame}
            text={"Back to Loser's Game"}
          />
        )}

        {success === true && (
          <WinningModal visible={visible} closeModal={closeModal} />
        )}

        {success === false && (
          <LosingModal visible={visible} closeModal={closeModal} />
        )}

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">How It Works</h3>
          <p className="text-gray-700">
            Select a direction (UP or DOWN) to immediately spin the bottle. The bottle will spin and land on the selected direction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectedSpinBottle;
