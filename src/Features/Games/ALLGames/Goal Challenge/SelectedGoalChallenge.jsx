import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBullseye } from 'react-icons/fa';
import { IoFootball } from 'react-icons/io5';
import useSound from 'use-sound';
import WinningModal from '../../../../components/modals/WinningModal';
import LosingModal from '../../../../components/modals/LosersModal';
import Button from '../../../../components/button/gamebutton';
import goalpost from '../../../../assets/images/games/goal-post.png';
import field from "../../../../assets/images/games/football-field.png";
import shootSound from '../../../../assets/sounds/mixkit-hitting-soccer-ball-2112.wav';
import { AuthContext } from '../../../../context/authContext';

const SelectedGoalChallenge = () => {
  const navigate = useNavigate();
    const { userDetails, setUserDetails } = useContext(AuthContext);
    const {gameLabel,  stake, odds, GameName  } = userDetails || {};
  
  const [ballPosition, setBallPosition] = useState({ left: '50%', bottom: '24px' });
  const [selectedGuess, setSelectedGuess] = useState(null);
  const [success, setSuccess] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [playShoot] = useSound(shootSound);

  const handleGuessSelect = (side) => {
    setSelectedGuess(side);
  };

  const shootBall = () => {
    if (!selectedGuess) {
      alert('Please select Left, Center, or Right first.');
      return;
    }

    let targetLeft = '0%';

    if (selectedGuess === 'Left') targetLeft = '15%';
    else if (selectedGuess === 'Center') targetLeft = '47%';
    else targetLeft = '80%';

    setIsMoving(true);
    playShoot();
    setBallPosition({ left: targetLeft, bottom: '170px' });

    setTimeout(() => {
      if (selectedGuess === 'Left') {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
      setVisible(true);
      setIsMoving(false);
    }, 700);
  };

   const lostGame = () => {
     setUserDetails({
      stake,
      odds,
      gameLabel,
      GameName,
      isGameLost: true,
    });
    navigate("/losers-games");
  };

  const closeModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="text-blue-600">
          <FaArrowLeft size={20} />
        </button>
        <span className="font-bold text-lg">Goal Challenge</span>
        <span className="text-gray-700 font-medium">₦200</span>
      </header>

      <div className="space-y-6">
        {/* Game Info */}
        <div className="text-left">
          <h1 className="text-2xl font-bold mb-1">Goal Challenge</h1>
          <p className="text-gray-500">House: @user</p>
        </div>

        {/* Game Field */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Shoot The Ball</h2>

          <div
            className="relative w-full max-w-sm mx-auto h-[300px] bg-contain bg-center bg-[#6AAC4B] mb-6"
            style={{ backgroundImage: `url(${field})` }}
          >
            <div className="flex justify-between px-4 pt-3">
              {[...Array(3)].map((_, idx) => (
                <img key={idx} src={goalpost} alt="Goal Post" className="w-12 h-12" />
              ))}
            </div>

            {/* Ball */}
            <div
              className={`absolute ${isMoving ? 'animate-bounce' : ''}`}
              style={{
                left: ballPosition.left,
                bottom: ballPosition.bottom,
                transition: 'all 0.7s ease',
                animation: isMoving ? 'spin 1s linear infinite, bounce 1s infinite' : 'none',
              }}
            >
              <IoFootball size={50} color="white" />
            </div>
          </div>

          {/* Guess Buttons */}
          <div className="flex justify-around mb-6 gap-4">
            {['Left', 'Center', 'Right'].map((side) => (
              <Button
                key={side}
                text={side}
                isActive={selectedGuess === side}
                onClick={() => handleGuessSelect(side)}
              />
            ))}
          </div>

          {/* Action Buttons */}
          {success === null && (
            <button
              onClick={shootBall}
              className="flex mx-auto items-center justify-center gap-2 bg-[#0A1931] text-white py-3 px-6 rounded hover:bg-blue-800"
            >
              Shoot Ball
            </button>
          )}

          {success === true && (
            <button
              onClick={() => navigate('/games/category/category-main')}
              className="flex mx-auto cursor-pointer items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700"
            >
              <FaArrowLeft /> Go Back to Games
            </button>
          )}

          {success === false && (
            <button
              onClick={lostGame}
              className="flex mx-auto cursor-pointer items-center justify-center gap-2 bg-red-600 text-white py-3 px-6 rounded hover:bg-red-700"
            >
              <FaBullseye /> Go to Loser's Games
            </button>
          )}

          {/* How it Works */}
          <div className="mt-8 bg-white p-4 rounded shadow text-left max-w-lg mx-auto">
            <h3 className="text-lg font-semibold mb-2">How It Works</h3>
            <p className="text-gray-600 leading-relaxed">
              Select the direction you think the House shot (left, center, or right) and shoot the ball.
              If your shot goes in the same direction, you win!
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {success === true && <WinningModal visible={visible} closeModal={closeModal} />}
      {success === false && <LosingModal visible={visible} closeModal={closeModal} />}
    </div>
  );
};

export default SelectedGoalChallenge;
