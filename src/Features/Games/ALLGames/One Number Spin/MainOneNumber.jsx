import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import spinSound from '../../../../assets/sounds/spins.wav';
import { AuthContext } from '../../../../context/authContext';
import Button from '../../../../components/button/gamebutton';

const MainOneNumber = () => {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(AuthContext);

  const [totalInput, setTotalInput] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const [play, { stop }] = useSound(spinSound);
 

  const totalAmount = parseFloat(totalInput) || 0;
  const admissionFee = totalAmount * 0.25;
  const stake = totalAmount + admissionFee;

  const spinDuration = 3000; // spin time in ms

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const spinWheel = () => {
    if (isSpinning) return; // prevent multiple spins

    setShowResult(false);
    setIsSpinning(true);
    play();

    setTimeout(() => {
      const number = Math.floor(Math.random() * 10) + 1;
      setWinningNumbers([number]);
      setShowResult(true);
      setIsButtonDisabled(totalAmount === 0);
      setIsSpinning(false);
      stop();
    }, spinDuration);
  };

  const handlePublishGame = () => {
    if (winningNumbers.length === 0) {
      alert('Please spin the wheel first.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setUserDetails({
        ...userDetails,
        stake: stake.toFixed(2),
        odds: '10x',
        gameLabel: winningNumbers[0].toString(),
        GameName: 'One Number Spin',
        result: winningNumbers[0].toString(),
      });

      navigate('/available-games');
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    setIsButtonDisabled(!totalInput || !showResult || isNaN(Number(totalInput)));
  }, [totalInput, showResult]);

  return (
    <>
      {/* Inline CSS for spin animation */}
      <style>{`
        @keyframes spin-once {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(1080deg); }
        }
        .spin-once {
          animation: spin-once ${spinDuration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">One Number Spin</h1>
          <p className="text-gray-600">Spin the wheel and set your total stake as The House</p>

          <div className="flex justify-center">
            <div
              className={`w-64 h-64 rounded-full border-4 border-blue-600 flex items-center justify-center
                ${isSpinning ? 'spin-once' : ''}`}
            >
              {showResult ? (
                <div className="text-center">
                  <p className="font-bold mb-2">Winning Number</p>
                  <div className="flex gap-2 justify-center">
                    {winningNumbers.map((num, idx) => (
                      <div
                        key={idx}
                        className="w-10 h-10 bg-black text-white flex items-center justify-center rounded"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                    <div key={number} className="w-10 h-10 border flex items-center justify-center rounded">
                      {number}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 text-lg font-semibold items-center justify-center mx-auto">
            <span>Result:</span>
            {winningNumbers.map((num, idx) => (
              <span key={idx}>{num}</span>
            ))}
          </div>

          <p className="text-lg font-medium text-center">Odds: 10x</p>

          <Button
            isDisabled={isSpinning}
            onClick={spinWheel}
            text={isSpinning ? 'Spinning...' : 'Spin Wheel'}
          />

          <div className="mt-6 space-y-4">
            <label className="block font-medium text-gray-700">Enter Total Amount (₦)</label>
            <input
              type="number"
              value={totalInput}
              onChange={(e) => setTotalInput(e.target.value)}
              className="w-full p-3 border rounded"
              placeholder="Enter total amount"
            />

            <div className="flex justify-between">
              <span>Admission Fee (25%)</span>
              <span>₦{admissionFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Your Stake</span>
              <span>₦{stake.toFixed(2)}</span>
            </div>

            <p>Your wallet balance: ₦150,000</p>

            <Button
              isDisabled={isButtonDisabled || loading}
              isLoading={loading}
              text={loading ? 'Publishing...' : 'Publish Game'}
              onClick={handlePublishGame}
            />
          </div>

          <div className="bg-white p-4 rounded shadow mt-6">
            <h2 className="font-semibold mb-2">How It Works</h2>
            <p>
              Spin the wheel to randomly select one winning number from 1–10. Players will bet against your
              result with odds of 10. If they guess the winning number, they win. If not, you win.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainOneNumber;
