import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/authContext';
import bottleImage from '../../../../assets/icons/BeerBottle.png';
import Button from '../../../../components/button/gamebutton';
import FormInput from '../../../../components/Input/FormInput';
import { useRequest } from '../../../../hooks/useRequest';
import toast from 'react-hot-toast';
 
const SpinBottleMain = () => {
  const spinValue = useRef(0);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [spinDegree, setSpinDegree] = useState(0);
  const {makeRequest} = useRequest()

  const [totalInput, setTotalInput] = useState('');
  const [admissionFee, setAdmissionFee] = useState(0);
  const [stake, setStake] = useState(0);

  const { userDetails, setUserDetails } = useContext(AuthContext);
      const {  odds= '2',  gameLabel, range, GameName  = 'Spin the Bottle' } = userDetails || {};

  const navigate = useNavigate();

  const spinBottle = (direction) => {
    setIsSpinning(true);
    setResult(null);

    const fullSpins = 4 * 360; // Minimum 4 full spins
    let targetDegree = direction === 'UP' ? 0 : 180;

    const randomOffset = Math.floor(Math.random() * 360); // Add randomness to make each spin feel unique

    let newSpin = spinValue.current + fullSpins + randomOffset;

    // Snap to the nearest target direction
    newSpin = newSpin - (newSpin % 360) + targetDegree;

    spinValue.current = newSpin;
    setSpinDegree(newSpin);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(direction);
    }, 3000);
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

  const handleTotalInputChange = (e) => {
    const text = e.target.value;
    setTotalInput(text);

    if (text && !isNaN(Number(text))) {
      const amount = parseFloat(text);
      const fee = amount * 0.25;
      const stakeAmount = amount + fee;

      setAdmissionFee(fee);
      setStake(stakeAmount);
      setIsButtonDisabled(false);
    } else {
      setAdmissionFee(0);
      setStake(0);
      setIsButtonDisabled(true);
    }
  };

  

   const handlePublishGame = async() => {
      setLoading(true);
      const formattedOdds = `${odds}x`;


      const res = await makeRequest('/create-game', {
        name: 'Spin The Bottle',
        spinDirection: result.toLowerCase(),
        odds,
        stake
      })

      if(res.response){
setLoading(false);
toast.success('Success', 'Game Created Successfully');
setTimeout(() => {
        setUserDetails({
          stake: stake.toFixed(2),
            odds: formattedOdds,
            gameLabel ,
            GameName,
           
            result: gameLabel,
        });
        navigate('/available-games')

        setLoading(false);
      }, 2000);
      }else if(res.error){
        setLoading(false);
        return toast.error('Error', res.error)
      }else{
        setLoading(false)
        return toast.error("Error", 'Server Error. Please check your internet connection')
      }
    
  
      
    };

   useEffect(() => {
          window.scrollTo(0, 0);
        }, []);

  return (
    <div className='bg-blue-100 '>
      <div className="min-h-screen mx-auto md:max-w-[600px] p-6">
        <h1 className="text-3xl font-bold mb-4">Spin the Bottle</h1>
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
            className="w-20 z-[10] h-20 transition-transform duration-[3000ms] ease-out"
            style={{ transform: `rotate(${spinDegree}deg)` }}
          />
        </div>

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

        {result && (
          <div className="bg-green-600 text-white p-2 text-center mb-4 font-bold">
            Result: {result}
          </div>
        )}

        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-bold mb-2">Enter Total Amount</h3>
          <FormInput
            type="number"
            placeholder="Enter total amount"
            value={totalInput}
            onChange={handleTotalInputChange}
          />

          <div className="flex justify-between my-4">
            <span>Admission Fee (25%)</span>
            <span>₦{admissionFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold mb-2">
            <span>Your Stake</span>
            <span>₦{stake.toFixed(2)}</span>
          </div>

          <div className="mb-4">
            <span>Your wallet balance: ₦150,000</span>
          </div>

          <Button
            disabled={isButtonDisabled}
            onClick={handlePublishGame}
            isLoading={loading}
            text={'Publish Game'}
          />
        </div>

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

export default SpinBottleMain;
