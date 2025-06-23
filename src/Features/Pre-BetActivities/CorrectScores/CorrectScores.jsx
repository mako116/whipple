import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import MatchCard from '../../../components/prebetComponets/MatchCard';

// Sample Matches
const matches = [
  { teamA: 'PSG', teamB: 'Real Madrid', date: 'May 28, 2025 at 12:00 PM' },
  { teamA: 'Liverpool', teamB: 'Barcelona', date: 'May 29, 2025 at 12:00 PM' },
  { teamA: 'Liverpools', teamB: 'Barcelonas', date: 'May 29, 2025 at 12:00 PM' },
];

export default function CorrectScores() {
  const navigate = useNavigate();
  const [scores, setScores] = useState(matches.map(() => ({ scoreA: null, scoreB: null })));
  const [bottomPopupVisible, setBottomPopupVisible] = useState(false);

  const isAnyScoreSelected = scores.some(item => item.scoreA !== null || item.scoreB !== null);

  const handleScoreChange = (index, team, score) => {
    setScores(prev => {
      const updated = [...prev];
      if (team === 'A') updated[index].scoreA = score;
      else updated[index].scoreB = score;
      return updated;
    });
  };

  const handleConfirm = () => {
    setBottomPopupVisible(true);
    setTimeout(() => {
      setBottomPopupVisible(false);
      navigate('/select-league');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className='max-w-3xl mx-auto'>

        <div className="mb-6 flex items-center gap-2">
          <button
            className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5 text-slate-900" />
            <span className="text-sm font-medium">Back to Categories</span>
          </button>
        </div>

        <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">Predict Correct Scores</h1>
        <p className="text-gray-600 text-base mb-2 text-center">Champions League (UEFA) - upcoming matches</p>

        <div className="mt-6">
          {matches.map((match, index) => (
            <MatchCard
              key={index}
              teamA={match.teamA}
              teamB={match.teamB}
              date={match.date}
              scoreA={scores[index].scoreA}
              setScoreA={(score) => handleScoreChange(index, 'A', score)}
              scoreB={scores[index].scoreB}
              setScoreB={(score) => handleScoreChange(index, 'B', score)}
            />
          ))}
        </div>

        <button
          className={`w-full py-3 rounded text-white text-center font-semibold ${isAnyScoreSelected ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-300 cursor-not-allowed'}`}
          disabled={!isAnyScoreSelected}
          onClick={handleConfirm}
        >
          Confirm Predictions ($1 fee)
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Win FREE Bets for each correct prediction (no expiration)
        </p>

        {bottomPopupVisible && (
          <div style={styles.toastContainer}>
            <div style={styles.toastBox}>
              <p style={styles.toastTitle}>Match Prediction Confirmed</p>
              <p style={styles.toastMessage}>Your Predictions are Locked In</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  toastContainer: {
    position: 'fixed',
    top: '24px',
    right: '24px',
    zIndex: 50,
    animation: 'slideUpFade 0.4s ease-out',
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

// Inject keyframes animation directly
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes slideUpFade {
  0% {
    transform: translateY(50%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
`, styleSheet.cssRules.length);
