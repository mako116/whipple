import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MatchCard = ({ teamA, teamB, dateTime, onSelect }) => {
  const [selected, setSelected] = useState({ team: null, type: null });

  const handleSelect = (team, type) => {
    if (selected.team !== team || selected.type !== type) {
      setSelected({ team, type });
      onSelect();
    }
  };

  const getButtonStyle = (team, type) => {
    const isDraw = selected.type === 'Draw';
    const isSelected = selected.team === team && selected.type === type;

    if (type === 'Draw' && isDraw) return 'px-4 py-2 bg-yellow-500 text-white rounded';
    if (isSelected && type === 'Win') return 'px-4 py-2 bg-blue-700 text-white rounded';
    if (isSelected && type === 'Draw') return 'px-4 py-2 bg-yellow-500 text-white rounded';

    return 'px-4 py-2 bg-gray-100 text-black rounded';
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 mb-6 shadow">
      <p className="text-sm text-gray-500 mb-3">{dateTime}</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-2">
          <p className="font-semibold">{teamA}</p>
          <div className="flex gap-2">
            <button className={getButtonStyle(teamA, 'Win')} onClick={() => handleSelect(teamA, 'Win')}>Win</button>
            <button className={getButtonStyle(teamA, 'Draw')} onClick={() => handleSelect(teamA, 'Draw')}>Draw</button>
          </div>
        </div>
        <p className="text-xl font-bold text-gray-700">VS</p>
        <div className="flex flex-col items-center gap-2">
          <p className="font-semibold">{teamB}</p>
          <div className="flex gap-2">
            <button className={getButtonStyle(teamB, 'Win')} onClick={() => handleSelect(teamB, 'Win')}>Win</button>
            <button className={getButtonStyle(teamB, 'Draw')} onClick={() => handleSelect(teamB, 'Draw')}>Draw</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PredictMatches() {
  const navigate = useNavigate();
  const [selections, setSelections] = useState(0);
  const [bottomPopupVisible, setBottomPopupVisible] = useState(false);

  const handleSelection = () => {
    setSelections((prev) => Math.min(prev + 1, 3));
  };

  const handleConfirm = () => {
    setBottomPopupVisible(true);
    setTimeout(() => {
      setBottomPopupVisible(false);
      navigate('/select-league');
    }, 2000);
  };

  const getConfirmText = () => {
    return selections <= 1 ? 'Confirm Prediction (Free)' : 'Confirm Prediction ($0.5 fee)';
  };

  return (
    <div className="min-h-screen bg-white p-4 max-w-3xl mx-auto">
      <div className="mb-6 flex items-center gap-2">
        <button
          className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 text-slate-900" />
          <span className="text-sm font-medium">Back to Categories</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Predict Match Outcomes</h1>
        <p className="text-gray-600 text-base">Premier League - upcoming matches</p>
      </div>

      <MatchCard teamA="Chelsea" teamB="Man U" dateTime="May 18, 2025 at 8:00 AM" onSelect={handleSelection} />
      <MatchCard teamA="Liverpool" teamB="Arsenal" dateTime="May 18, 2025 at 10:30 AM" onSelect={handleSelection} />
      <MatchCard teamA="Man City" teamB="Tottenham" dateTime="May 23, 2025 at 12:45 PM" onSelect={handleSelection} />

      <div className="mt-6 text-center">
        <button
          onClick={handleConfirm}
          disabled={selections === 0}
          className={`w-full py-3 rounded text-white text-center font-semibold ${selections === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'}`}
        >
          {getConfirmText()}
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Win 25% Discounted Bets for each correct prediction (valid for 72 hours)
        </p>
      </div>

      {/* Toast Popup with Inline Animation */}
      {bottomPopupVisible && (
        <div style={styles.toastContainer}>
          <div style={styles.toastBox}>
            <p style={styles.toastTitle}>Match Prediction Confirmed</p>
            <p style={styles.toastMessage}>Your Predictions are Locked In</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  toastContainer: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 50,
    animation: 'slideUpFade 0.3s ease-out',
  },
  toastBox: {
    backgroundColor: '#1d4ed8',
    color: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
    maxWidth: '250px',
    textAlign: 'center',
  },
  toastTitle: {
    fontWeight: '600',
    fontSize: '16px',
    marginBottom: '4px',
  },
  toastMessage: {
    fontSize: '14px',
    color: '#f1f5f9',
  },
};

// Inline CSS animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes slideUpFade {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
`, styleSheet.cssRules.length);
