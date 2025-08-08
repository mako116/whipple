import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorRouletteWheel from '../../../../components/ColorRoulette/ColorRoulette';
import FormInput from '../../../../components/Input/FormInput';
import { AuthContext } from '../../../../context/authContext';
import Button from '../../../../components/button/gamebutton';
import { useRequest } from '../../../../hooks/useRequest';
import toast from 'react-hot-toast';

export default function ColorRoulettePage() {
  const { setUserDetails } = useContext(AuthContext);
  const [activeColors, setActiveColors] = useState([]);
  const [stake, setStake] = useState('');
  const [admission, setAdmission] = useState(0);
  const [total, setTotal] = useState(0);
  const [isPublishEnabled, setIsPublishEnabled] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for spin
  const navigate = useNavigate();
  const { makeRequest } = useRequest();

  const spinWheel = () => {
    if (loading) return; // prevent double spins
    setLoading(true);

    // Simulate spin delay and pick colors
    setTimeout(() => {
      const shuffled = ['red', 'blue', 'green', 'yellow'].sort(() => 0.5 - Math.random());
      const pickedColors = shuffled.slice(0, 2);
      setActiveColors(pickedColors);
      setLoading(false);
    }, 2000);
  };

  const handleStakeChange = (e) => {
    const v = parseFloat(e.target.value) || 0;
    setStake(e.target.value);
    setAdmission(v * 0.25);
    setTotal(v + v * 0.25);
    setIsPublishEnabled(v > 0);
  };

  const handlePublish = async () => {
    if (activeColors.length !== 2) {
      toast.error('Please spin and select two colors.');
      return;
    }

    const parsedTotalOdds = "2.0";
    const selectedColors = activeColors.join(', ');

    const res = await makeRequest('/create-game', {
      name: 'Color Roulette',
      colors: selectedColors.toLowerCase(),
      stake
    });

    if (res.response) {
      toast.success('Game Created Successfully');
      navigate('/available-games');

      setUserDetails({
        stake: stake.toString(),
        odds: parsedTotalOdds + 'x',
        gameLabel: "Color Roulette Game",
        GameName: "Color Roulette",
        range: null,
        selected: selectedColors,
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ColorRouletteWheel activeColors={activeColors} loading={loading} onSpin={spinWheel} />

      {activeColors.length === 2 && (
        <div className="flex justify-center mt-4 space-x-2">
          {activeColors.map((c) => (
            <span
              key={c}
              className="px-4 py-1 text-white rounded font-semibold"
              style={{
                backgroundColor:
                  c === 'red'
                    ? '#EA384C'
                    : c === 'blue'
                    ? '#0EA5E9'
                    : c === 'green'
                    ? '#22C55E'
                    : '#EAB308'
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

        <Button
          isDisabled={!isPublishEnabled || loading}
          isLoading={loading}
          onClick={handlePublish}
          text="Publish Game"
        />
      </div>

      <div className="bg-white p-4 mt-6 rounded-lg">
        <h3 className="text-lg font-bold">How It Works</h3>
        <p>
          Spin to pick two colors. Players bet against your colors with odds of 2×. If they guess
          any correctly, they win — otherwise, you win.
        </p>
      </div>
    </div>
  );
}
