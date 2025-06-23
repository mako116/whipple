import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import spinSoundFile from "../../../../assets/sounds/spining.wav"; // your sound file path
import { AuthContext } from "../../../../context/authContext";
import WinningModal from "../../../../components/modals/WinningModal";
import LosingModal from "../../../../components/modals/LosersModal";

const SPIN_DURATION = 3000; // spin duration in ms

export default function SelectedOneNumber() {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { odds = "10", GameName = "One Number Spin" } = userDetails || {};

  const [totalInput, setTotalInput] = useState("");
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [success, setSuccess] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const lastResultWasWin = useRef(null);

  // Sound hook with control
  const [playSpinSound, { stop }] = useSound(spinSoundFile, { loop: true });

  const totalAmount = parseFloat(totalInput) || 0;
  const admissionFee = totalAmount * 0.25;
  const stake = totalAmount + admissionFee;

  // Number select logic
  function toggleNumber(num) {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers([]);
    } else if (selectedNumbers.length < 1) {
      setSelectedNumbers([num]);
    }
  }

  // Spin wheel logic with rotation
  function spinWheel() {
    if (selectedNumbers.length !== 1) {
      alert("Please select exactly one number before spinning.");
      return;
    }

    setShowResult(false);
    setIsSpinning(true);

    playSpinSound();

    // Increase rotation by 1080deg (3 spins) + random 0-360 for unpredictability
    const extraRotation = Math.floor(Math.random() * 360);
    const newRotation = rotation + 1080 + extraRotation;
    setRotation(newRotation);

    // After animation duration, stop spinning
    setTimeout(() => {
      stop();
      const result = [Math.floor(Math.random() * 10) + 1];
      setWinningNumbers(result);
      checkResult(result);
      setIsSpinning(false);
      setShowResult(true);
    }, SPIN_DURATION);
  }

  function checkResult(result) {
    const isWin =
      JSON.stringify(selectedNumbers.sort()) === JSON.stringify(result.sort());
    lastResultWasWin.current = isWin;
    setSuccess(isWin);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setSuccess(null);
  }

  // Handle spin button press or navigation
  function handleSpinButtonPress() {
    if (showResult) {
      if (lastResultWasWin.current) {
        navigate("/games");
      } else {
        setUserDetails({
          stake: stake.toFixed(2),
          odds,
          gameLabel: winningNumbers.join(", "),
          GameName,
          isGameLost: true,
        });
        navigate("/losers-games");
      }
    } else {
      spinWheel();
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow max-w-3xl mx-auto p-6">
        <p className="text-sm text-gray-600 mb-1">Spin the wheel</p>
        <h1 className="text-3xl font-extrabold mb-4">{GameName}</h1>

        {/* Wheel container */}
        <div
          aria-label="Spinning wheel"
          role="img"
          className="w-48 h-48 mx-auto rounded-full border-8 border-blue-600 flex items-center justify-center"
          style={{
            borderColor: "#2563EB",
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? `transform ${SPIN_DURATION}ms cubic-bezier(0.33, 1, 0.68, 1)` : "none",
          }}
        >
          <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center select-none">
            {showResult ? (
              <>
                <p className="text-md text-center font-bold mb-2">Winning Number</p>
                <div className="flex space-x-4">
                  {winningNumbers.map((num, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center font-semibold text-gray-700">Click on spin button</p>
            )}
          </div>
        </div>

        {/* Number selection */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
            const isSelected = selectedNumbers.includes(num);
            return (
              <button
                key={num}
                onClick={() => toggleNumber(num)}
                disabled={isSpinning}
                className={`w-14 h-14 rounded-md flex items-center justify-center font-bold text-lg
                  ${
                    isSelected
                      ? "bg-black text-white border-2 border-gray-600"
                      : "bg-gray-300 text-gray-700 border border-gray-400"
                  }
                  hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-pressed={isSelected}
                aria-label={`Select number ${num}`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Spin button */}
        <button
          onClick={handleSpinButtonPress}
          disabled={(selectedNumbers.length !== 1 && !showResult) || isSpinning}
          className={`mt-10 w-full py-3 rounded-md font-semibold
            ${
              selectedNumbers.length !== 1 && !showResult
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }
            disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-disabled={selectedNumbers.length !== 1 && !showResult}
        >
          {showResult
            ? lastResultWasWin.current
              ? "Go to Games"
              : "Go to Loser's Game"
            : isSpinning
            ? "Spinning..."
            : "Spin Wheel"}
        </button>

        {/* Info section */}
        <section className="bg-white p-5 rounded-md shadow mt-12">
          <h2 className="text-xl font-semibold mb-3">How It Works</h2>
          <p className="text-gray-700 leading-relaxed">
            Spin the wheel to randomly select one winning number from 1–10.
            Players bet against your result with odds of 10. If they guess the
            winning number, they win. If not, you win.
          </p>
        </section>
      </div>

      {/* Modals */}
      {success === true && (
        <WinningModal visible={modalVisible} closeModal={closeModal} />
      )}
      {success === false && (
        <LosingModal visible={modalVisible} closeModal={closeModal} />
      )}
    </div>
  );
}
