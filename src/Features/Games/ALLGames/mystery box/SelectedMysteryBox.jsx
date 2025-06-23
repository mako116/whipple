import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/authContext';
import { Package } from 'lucide-react';
import WinningModal from '../../../../components/modals/WinningModal';
import LosingModal from '../../../../components/modals/LosersModal';
import Button from '../../../../components/button/gamebutton';
// import WinningModal from '../../../winningmodal/WinningModal';
// import LosingModal from '../../../loseModal/LoseModal';

const MysterySelect = () => {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { selected, GameName ,stake,gameLabel} = userDetails || {};

  const boxes = ['1', '2', '3'];
  const [success, setSuccess] = useState(null);
  const [visible, setModalVisible] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxPress = (boxLabel) => {
    setSelectedBox(boxLabel);
  };

  const handleRevealBox = () => {
    if (!selectedBox) {
      alert('Please select a box first!');
      return;
    }
    setSuccess(selectedBox === selected);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLosersGame = () => {
    setUserDetails({
      stake,
      gameLabel ,
      GameName,
      isGameLost: true,
    });
    navigate('/losers-games');
  };

  return (
     <div className='bg-gray-100'> 
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-2xl font-bold mb-2">{GameName || 'Mystery Box Game'}</h1>
      <p className="mb-4 text-gray-600">Choose the correct box to win!</p>
     
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Mystery Box Challenge</h2>
        <p className="text-sm text-gray-500 mb-4">House Selection Hidden</p>

        <div className="flex justify-around mb-4 gap-3">
          {boxes.map((box) => (
            <button
              key={box}
              onClick={() => handleBoxPress(box)}
              className={`flex flex-col items-center justify-center w-24 h-24 border-4 rounded-lg ${
                selectedBox === box ? 'border-blue-600' : 'border-yellow-700'
              } bg-yellow-100`}
            >
              <Package size={48} color="#92400e" />
              <span className="absolute text-xl font-bold text-yellow-700">{box}</span>
            </button>
          ))}
        </div>

        {success === null && (
           <Button
           onClick={handleRevealBox}
           text={"Reveal Box"}
          />
          
        )}

        {success === false && (
          <Button
           onClick={handleLosersGame}
           text={"Back to Loser's Game"}
          />
         
        )}

        {success === true && (
          <Button
           onClick={()=>navigate("/games")}
           text={"Back to Games"}
          />
        
        )}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">How To Win</h2>
        <p className="text-gray-700">
          Select one of the three mystery boxes. If you pick the same box the House chose, you win!
        </p>
      </div>
 </div>
      {success === true && (
        <WinningModal visible={visible} closeModal={closeModal} />
      )}
      {success === false && (
        <LosingModal visible={visible} closeModal={closeModal} />
      )}
    </div>
  );
};

export default MysterySelect;
