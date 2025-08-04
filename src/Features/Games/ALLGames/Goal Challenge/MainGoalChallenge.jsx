import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCoins } from 'react-icons/fa';
import field from "../../../../assets/images/games/football-field.png";
import { AuthContext } from '../../../../context/authContext';
import Button from '../../../../components/button/gamebutton';
import goalpost from '../../../../assets/images/games/goal-post.png';
import useSound from 'use-sound';
import shootSound from '../../../../assets/sounds/mixkit-hitting-soccer-ball-2112.wav';
import { useRequest } from '../../../../hooks/useRequest';
import toast from 'react-hot-toast';

const MainGoalChallenge = () => {
  const ballRef = useRef(null);
  const [ballPosition, setBallPosition] = useState({ left: '48%', bottom: '14px' });
  const [isBallUp, setIsBallUp] = useState(false);
  const [previousPositions, setPreviousPositions] = useState(new Set());
  const [shotMessage, setShotMessage] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [mainOdd] = useState('3.003x');
  const [isMoving, setIsMoving] = useState(false);
  const {makeRequest, loading} = useRequest()

  const GameName = 'Goal Challenge';
  const { setUserDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  const [playShoot] = useSound(shootSound);

  const shootBall = () => {
    if (!isBallUp) {
      let random = Math.floor(Math.random() * 3);
      while (previousPositions.has(random)) {
        random = Math.floor(Math.random() * 3);
      }

      let targetLeft = '50%';
      let message = '';
      let goalPos = '';

      if (random === 0) {
        targetLeft = '15%';
        message = 'Goal to the left!';
        goalPos = 'Left';
      } else if (random === 1) {
        targetLeft = '47%';
        message = 'Goal to the center!';
        goalPos = 'Center';
      } else {
        targetLeft = '80%';
        message = 'Goal to the right!';
        goalPos = 'Right';
      }

      setPreviousPositions(new Set(previousPositions).add(random));
      setShotMessage(message);
      setSelectedGoal(goalPos);
      setIsMoving(true);
      playShoot();

      setBallPosition({ left: targetLeft, bottom: '170px' });
      setIsBallUp(true);

      setTimeout(() => {
        setIsMoving(false);
      }, 700);
    } else {
      setBallPosition({ left: '50%', bottom: '14px' });
      setIsBallUp(false);
      setPreviousPositions(new Set());
      setShotMessage('');
    }
  };

  const [totalInput, setTotalInput] = useState('');
  const [admissionFee, setAdmissionFee] = useState(0);
  const [stake, setStake] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // const [ setLoading] = useState(false);

 const handlePublishGame = async() => {
   
    const totalAmount = parseFloat(totalInput);
    
    
    const res = await makeRequest('/create-game', {name:'Goal Challenge', odds:mainOdd, direction:selectedGoal.toLowerCase(), stake:totalAmount});
    if(res.response){
      toast.success('Game Created Successfully')
       setTimeout(() => {
      
      navigate('/available-games');
    }, 2000);
    } else if(res.error){
      return Alert.alert('Error', res.error);
    }else{
     toast.error('server error')

    }

    
  };


  const handleTotalInputChange = (e) => {
    const text = e.target.value;
    const numericValue = parseFloat(text);
    setTotalInput(text);

    if (!isNaN(numericValue)) {
      const admission = numericValue * 0.25;
      const stakeValue = numericValue + admission;
      setAdmissionFee(admission);
      setStake(stakeValue);
    } else {
      setAdmissionFee(0);
      setStake(0);
    }
  };

  useEffect(() => {
    const totalAmount = parseFloat(totalInput);
    const isValidAmount = !isNaN(totalAmount) && totalAmount > 0;
    const isGoalSelected = selectedGoal !== '';
    setIsButtonDisabled(!(isValidAmount && isGoalSelected));
  }, [totalInput, selectedGoal]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Shoot The Ball</h2>

          <div
            className="relative w-full max-w-lg mx-auto h-[300px] bg-cover bg-center bg-[#6AAC4B] mb-6"
            style={{ backgroundImage: `url(${field})` }}
          >
            <div className="flex justify-around w-full absolute top-4">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="w-16 h-16">
                  <img src={goalpost} alt="Goal Post" className="w-full h-full" />
                </div>
              ))}
            </div>

            <div
              ref={ballRef}
              className={`absolute text-white text-3xl ${isMoving ? 'animate-bounce' : ''}`}
              style={{
                left: ballPosition.left,
                bottom: ballPosition.bottom,
                transition: 'all 0.7s ease',
                animation: isMoving ? 'spin 1s linear infinite' : 'none'
              }}
            >
              ⚽
            </div>
          </div>

          <button
            onClick={shootBall}
            className="bg-blue-700 cursor-pointer text-white py-3 px-6 rounded mt-4 flex items-center"
          >
            <FaCoins className="mr-2" />
            Shoot Ball
          </button>

          <p className="text-lg text-center mt-4 font-semibold">{shotMessage}</p>

          <div className="mt-6">
            <label className="block mb-2 font-medium">Enter Total Amount</label>
            <input
              type="number"
              className="w-full p-3 border rounded mb-4"
              placeholder="Enter total amount"
              value={totalInput}
              onChange={handleTotalInputChange}
            />

            <div className="flex justify-between mb-2">
              <span>Admission Fee (25%)</span>
              <span>₦{admissionFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 font-bold">
              <span>Your Stake</span>
              <span>₦{stake.toFixed(2)}</span>
            </div>
            <div className="text-center mb-4 font-medium">
              Your wallet balance: <span className="font-bold">₦150,000</span>
            </div>

            <Button
              isDisabled={isButtonDisabled}
              isLoading={loading}
              onClick={handlePublishGame}
              text="Publish Game"
            />
          </div>

          <div className="bg-white rounded-lg shadow p-4 mt-6">
            <h3 className="text-lg font-semibold mb-2">How It Works</h3>
            <p>
              Shoot the ball into the goal and see where it lands. Players will bet against your shot direction with odds of 3.003x. If they correctly guess where your shot went, they win. If they guess wrong, you win.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainGoalChallenge;
