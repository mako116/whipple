import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WinningModal from "../../../../components/modals/WinningModal";
import LosingModal from "../../../../components/modals/LosersModal";
import ColorRouletteWheel from "../../../../components/ColorRoulette/ColorRoulette";
import { AuthContext } from "../../../../context/authContext";
import axiosClient from "../../../../utlis/Axios";
import toast from "react-hot-toast";
import { useRequest } from "../../../../hooks/useRequest";

const colors = [
  { id: "red", hex: "#EA384C", label: "Red" },
  { id: "blue", hex: "#0EA5E9", label: "Blue" },
  { id: "green", hex: "#22C55E", label: "Green" },
  { id: "yellow", hex: "#EAB308", label: "Yellow" },
];
 
export default function SelectedColorRoulette() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeColors, setActiveColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [success, setSuccess] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const wheelRef = useRef(null);
  const navigate = useNavigate();

  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { selected, stake, odds, GameName = "Color Roulette" } = userDetails || {};

   const [game, setGame] = useState(null)
     const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const house = searchParams.get('house');


    const {makeRequest} = useRequest()

    useEffect(()=>{
      const getGame = async ()=>{
        const res = await axiosClient.get(`/get-game/${id}`);

        setGame(res.data.game)

      }

      getGame();
    }, [])

  useEffect(() => {
    if (selected) {
      const match = colors.find((c) => c.id === selected);
      if (match) setSelectedColor(match);
    }
  }, [selected]);

const spinWheel = () => {
  if (loading) return;
  if (!selectedColor) return; // no spin without selection
  setLoading(true);

  if (wheelRef.current) {
    wheelRef.current.classList.add("animate-spin-wheel");

    setTimeout(() => {
      wheelRef.current.classList.remove("animate-spin-wheel");

      // Just for UI: pick 2 random house colors (no effect on success)
      const shuffled = [...colors].sort(() => 0.5 - Math.random());
      const houseColors = shuffled.slice(0, 2).map(c => c.id);
      setActiveColors(houseColors);
      setHasSpun(true);

      // Call API with user selected color to check win/lose
      makeRequest('/play-game', {
        gameId: id,
        name,
        colorSpun: selectedColor.id,
      })
        .then(res => {
          if (res.error) {
            toast.error(res.error);
            setSuccess(false);
          } else if (res.response && res.response.success) {
            setSuccess(true);
          } else {
            setSuccess(false);
          }
          setModalVisible(true);
        })
        .catch(e => {
          toast.error("Something went wrong");
          setSuccess(false);
          setModalVisible(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  }
};



  // useEffect(() => {
  //   if (!loading && activeColors.length > 0 && selectedColor) {
  //     setSuccess(activeColors.includes(selectedColor.id));
  //     setModalVisible(true);
  //   }
  // }, [activeColors, loading, selectedColor]);

  const handleLosersGame = () => {
    const gameLabel = activeColors.join(", ");
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
    setModalVisible(false);
  };

    // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen  bg-[#EEF6FF] p-5 font-montserrat">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-gray-600">Stake: {stake}</p>
      </header>

      {/* Game Intro */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">{game?.creator.name} Game</h2>
        <p className="text-gray-600">Select a color and try to match the House's colors!</p>
      </section>

      {/* Wheel Section */}
      <section className="bg-white rounded-lg p-6 shadow-md text-center mb-6">
        <div ref={wheelRef}>
          <ColorRouletteWheel
            activeColors={activeColors}
            loading={loading}
              hideButton 
            // onSpin={spinWheel}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {colors.map((color) => (
            <button
              key={color.id}
              className={`text-white text-sm font-semibold px-5 py-2 rounded-md transition-opacity ${
                selectedColor || hasSpun ? "opacity-50 cursor-not-allowed" : "opacity-90 hover:opacity-100"
              }`}
              style={{ backgroundColor: color.hex }}
              disabled={selectedColor !== null || hasSpun}
              onClick={() => setSelectedColor(color)}
            >
              {color.label}
            </button>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-2">House's Colors:</h3>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {activeColors.map((id) => {
            const colorObj = colors.find((c) => c.id === id);
            if (!colorObj) return null;
            return (
              <div
                key={id}
                className="text-white font-bold rounded-md px-4 py-2"
                style={{ backgroundColor: colorObj.hex }}
              >
                {colorObj.label}
              </div>
            );
          })}
        </div>

       {/* Buttons */}
  {!hasSpun && (
  <button
    onClick={spinWheel}
    disabled={!selectedColor || loading}
    className={`rounded-lg px-8 py-3 mx-auto block text-white font-semibold ${
      !selectedColor || loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0A1931] hover:bg-[#102c57]"
    }`}
  >
    {loading ? "Spinning..." : "Spin Wheel"}
  </button>
  )}

{hasSpun && success === false && (
  <button
    onClick={handleLosersGame}
    className="bg-[#0A1931] text-white font-semibold rounded-lg px-8 py-3 mx-auto block"
  >
    Play Losers Game
  </button>
)}

{hasSpun && success === true && (
  <button
    onClick={() => navigate("/games")}
    className="bg-[#0A1931] text-white cursor-pointer font-semibold rounded-lg px-8 py-3 mx-auto block"
  >
    Go Back to Games
  </button>
)}

      </section>

      {/* How To Win Section */}
      <section className="bg-[#F9FAFB] rounded-md p-4">
        <h3 className="font-semibold mb-1">How To Win</h3>
        <p className="text-gray-600 text-sm">
          Select a color and spin the wheel. If your color matches one of the two colors the House chose, you win!
        </p>
      </section>

      {/* Modals */}
      {success === true && <WinningModal visible={modalVisible} closeModal={closeModal} />}
      {success === false && <LosingModal visible={modalVisible} closeModal={closeModal} />}
    </div>
  );
}
