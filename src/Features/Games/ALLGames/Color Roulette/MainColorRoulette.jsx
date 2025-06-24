// src/pages/ColorRoulettePage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorRouletteWheel from '../../../../components/ColorRoulette/ColorRoulette';
import FormInput from '../../../../components/Input/FormInput';
import { AuthContext } from '../../../../context/authContext';
import Button from '../../../../components/button/gamebutton';

export default function ColorRoulettePage() {
  const { setUserDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [activeColors, setActiveColors] = useState([]);
  const [stake, setStake] = useState('');
  const [admission, setAdmission] = useState(0);
  const [total, setTotal] = useState(0);
  const [isPublishEnabled, setIsPublishEnabled] = useState(false);
  const navigate = useNavigate();

  const spinWheel = () => {
    setLoading(true);
    setTimeout(() => {
      const shuffled = ['red', 'blue', 'green', 'yellow'].sort(() => 0.5 - Math.random());
      setActiveColors(shuffled.slice(0, 2));
      setLoading(false);
    }, 2000);
  };

  const handleStakeChange = e => {
    const v = parseFloat(e.target.value) || 0;
    setStake(e.target.value);
    setAdmission(v * 0.25);
    setTotal(v + v * 0.25);
    setIsPublishEnabled(v > 0);
  };

  const handlePublish = () => {
    if (activeColors.length !== 2) {
      alert('Please spin and select two colors.');
      return;
    }

    setUserDetails({
      stake,
      admission,
      total,
      activeColors,
      odds: '2×',
      gameLabel: activeColors.join(','),
      GameName: 'color roulette',
    });

    navigate('/available-games');
  };
    // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ColorRouletteWheel activeColors={activeColors} loading={loading} onSpin={spinWheel} />

      {activeColors.length === 2 && (
        <div className="flex justify-center mt-4 space-x-2">
          {activeColors.map(c => (
            <span
              key={c}
              className="px-4 py-1 text-white rounded font-semibold"
              style={{
                backgroundColor:
                  c === 'red' ? '#EA384C' :
                  c === 'blue' ? '#0EA5E9' :
                  c === 'green' ? '#22C55E' : '#EAB308',
              }}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </span>
          ))}
        </div>
      )}

      <div className="bg-white p-4 mt-6 rounded-lg shadow space-y-4">
        <h3 className="text-lg font-bold">Set Your Stake</h3>
        <FormInput label="Stake" type="number" name="stake" value={stake} onChange={handleStakeChange} />
        <p className="text-sm">Admission Fee (25%): ₦{admission.toFixed(2)}</p>
        <p className="text-sm font-semibold">Total Amount: ₦{total.toFixed(2)}</p>
        <p className="text-sm">Wallet balance: ₦150,000</p>
        {/* <button
          disabled={!isPublishEnabled}
          onClick={handlePublish}
          className={`w-full py-2 text-white rounded ${isPublishEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400'}`}
        >
          Publish Game
        </button> */}

         <Button
            isDisabled={!isPublishEnabled}
          //  isLoading={loading}
           onClick={handlePublish}
           text="Publish Game"
           />
      </div>

      <div className="bg-white p-4 mt-6 rounded-lg">
        <h3 className="text-lg font-bold">How It Works</h3>
        <p>
          Spin to pick two colors. Players bet against your colors with odds of 2×.
          If they guess any correctly, they win — otherwise, you win.
        </p>
      </div>
    </div>
  );
}
