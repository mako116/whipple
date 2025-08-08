import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/authContext';
import { FiBox } from 'react-icons/fi';
import { MdOutlineCheck } from 'react-icons/md';
import FormInput from '../../../../components/Input/FormInput';
import Button from '../../../../components/button/gamebutton';
import toast from 'react-hot-toast';
import { useRequest } from '../../../../hooks/useRequest';

const MainMysteryBox = () => {
  const boxes = ['Box 1', 'Box 2', 'Box 3'];
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const navigate = useNavigate();
      const {makeRequest} = useRequest();

  const [stake, setStake] = useState('');
  const [walletBalance] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const handleBoxPress = (label) => {
    if (selectedBox === label) {
      setSelectedBox(null);
    } else if (selectedBox === null) {
      setSelectedBox(label);
    }
  };

  const handleStakeChange = (e) => {
    setStake(e.target.value);
    setUserDetails({ ...userDetails, stake: e.target.value });
  };

  const parsedStake = parseFloat(stake) || 0;
  const admissionFee = parsedStake * 0.25;
  const totalAmount = parsedStake + admissionFee;

  const isPublishEnabled = parsedStake > 0 && selectedBox;

  const handlePublish = async() => {
    const mainOdd = '3.003x';
    const GameName = 'Mystery Box';
    setLoading(true);
     const res =    await makeRequest('/create-game', {
      name: 'Mystery Box Game',
      odds: 3.003,
      stake,
      boxSelected: selectedBox.toLowerCase().replace(/\s+/g, '')
    })

 if(res.response.status){
  setLoading(false)
    setTimeout(() => {
       navigate('/available-games');
      setLoading(false);
    }, 2000);
  return toast.success('Success Game Created Successfully');
 }else{
  setLoading(false);
  toast.error('Error Server Error')
 }
    setUserDetails({
      ...userDetails,
      selectedBox,
      stake: totalAmount,
      odds: mainOdd,
      GameName,
      gameLabel: `${selectedBox} is the winning box`,
    });

 
  };

  useEffect(() => {
    if (userDetails.selectedBox !== selectedBox) {
      setUserDetails({ ...userDetails, selectedBox });
    }
  }, [selectedBox]);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Create Mystery Box Game</h1>
      <p className="text-gray-700 mb-4">Select a winning box and set your stake as The House</p>

      <h2 className="text-xl font-bold mb-4">Select a Winning Box</h2>

      <div className="flex justify-center gap-4 mb-6">
        {boxes.map((label, index) => (
          <div
            key={index}
            className={`w-24 h-24 border-4 ${selectedBox === label ? 'border-green-500' : 'border-gray-300'} border-dashed rounded flex flex-col items-center justify-center cursor-pointer`}
            onClick={() => handleBoxPress(label)}
          >
            <FiBox name="box" size={32} className="text-gray-500" />
            <span className="mt-2 font-bold">{label}</span>
            {selectedBox === label && <MdOutlineCheck size={20} className="text-green-500" />}
          </div>
        ))}
      </div>

      {selectedBox && <p className="text-lg font-semibold mb-4 text-center">{selectedBox} is the winning Box!</p>}
      <p className="text-sm text-gray-600 mb-6 text-center">Click on a box to select it as the winning box. Players will bet against your selected box.</p>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-bold mb-2">Set Your Stake</h3>
        <label className="block mb-4">Your Stake (₦)</label>
        <FormInput 
         type="number"
          placeholder="Enter total amount"
          value={stake}
          onChange={handleStakeChange}
        />
        
        <div className="flex justify-between my-4">
          <span>Admission Fee (25%)</span>
          <span>₦{admissionFee.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>

        <div className="flex justify-between font-bold mb-2">
          <span>Total Amount</span>
          <span>₦{totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>

        <p className="mb-4">Your wallet balance: ₦{walletBalance.toLocaleString()}</p>

        {/* <button
          onClick={handlePublish}
          disabled={!isPublishEnabled}
          className={`w-full py-3 rounded text-white ${isPublishEnabled ? 'bg-blue-900 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          {loading ? 'Publishing...' : 'Publish Game'}
        </button> */}

        <Button 
        isLoading={loading}
         onClick={handlePublish}
         text={'Publish Game'}
          isDisabled={!isPublishEnabled}
        />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-2">How It Works</h3>
        <p className="text-gray-700">
          Select one of the three boxes as the winning box. Players will bet against your selection with odds of 3.003x. If they correctly guess which box you selected, they win. If they guess wrong, you win.
        </p>
      </div>
    </div>
  );
};

export default MainMysteryBox;
