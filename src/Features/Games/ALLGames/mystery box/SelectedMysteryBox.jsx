import React, { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/authContext';
import { Package } from 'lucide-react';
import WinningModal from '../../../../components/modals/WinningModal';
import LosingModal from '../../../../components/modals/LosersModal';
import Button from '../../../../components/button/gamebutton';
import { useRequest } from '../../../../hooks/useRequest';
import toast from 'react-hot-toast';
// import WinningModal from '../../../winningmodal/WinningModal';
// import LosingModal from '../../../loseModal/LoseModal';

const MysterySelect = () => {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { selected, GameName ,gameLabel} = userDetails || {};
  const {makeRequest, loading} = useRequest();
  const boxes = ['1', '2', '3'];
  const [success, setSuccess] = useState(null);
  const [visible, setModalVisible] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [searchParams] = useSearchParams();
   const id = searchParams.get('id');
  const name = searchParams.get('name');
  const stake = Number(searchParams.get('stake'));
  const odds = searchParams.get('odds');
  const house = searchParams.get('house');
  const subcategory = searchParams.get('subcategory');

  const handleBoxPress = (boxLabel) => {
    setSelectedBox(boxLabel);
  };

  const handleRevealBox = async() => {
    if (!selectedBox) {
      alert('Please select a box first!');
      return;
    }

    const res = await makeRequest('/play-game', {
    name,
    gameId: id,
    boxSelected:"box"+selectedBox,
    });

    if(res.error){
      return toast.error('Error', res.error);
    }
    if(res.response.success){
      setSuccess(true);
      setModalVisible(true);
    }else{
      setSuccess(false);
      setModalVisible(true);
    }
    setModalVisible(false);
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
     <div className='bg-gray-100 min-h-screen'> 
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-2xl font-bold mb-2">{name || 'Mystery Box Game'}</h1>
      <p className="mb-4 text-gray-600">Choose the correct box to win!</p>
     
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-sm text-gray-500 mb-4">House {house}</p>

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
            isLoading={loading}
          />
          
        )}

        {success === false && (
          <Button
           onClick={handleLosersGame}
           text={"Back to Loser's Game"}
           isLoading={loading}
          />
         
        )}

        {success === true && (
          <Button
           onClick={()=>navigate("/games")}
           text={"Back to Games"}
            isLoading={loading}
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
