import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award } from 'lucide-react';
import Button from '../../../components/button/gamebutton';

export default function PreBetGames() {
  const navigate = useNavigate();

  const handlePredictMatches = () => {
    navigate('/overall-outcome');
  };

  const handleCorrectScoreMatches = () => {
    navigate('/correct-score');
  };

  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto bg-white">
      {/* Back Button */}
      <button
        className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 text-slate-900" />
        <span className="text-sm font-medium">Back to Leagues</span>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Select Game Category</h1>
        <p className="text-gray-600 text-base">Premier League - Choose prediction type</p>
        <p className="text-gray-600 text-base">Choose which type of prediction you'd like to make</p>
      </div>

      {/* Prediction Cards */}
      <div className="space-y-6">
        {/* Card 1: Overall Outcome */}
        <div className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow hover:shadow-lg transition">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Overall Outcome</h2>
            <Award className="w-5 h-5 text-blue-700" />
          </div>
          <p className="text-gray-500 text-sm mb-4">Win, Draw, or Lose predictions</p>

          <div className="space-y-3 mb-4">
            <p className="text-gray-700 text-sm">
              Predict whether teams will win, draw, or lose in upcoming matches.
            </p>
            <p className="text-sm">🎯 <span className="font-semibold">Free</span> for single match predictions</p>
            <p className="text-sm">🎯 <span className="font-semibold">$0.5 fee</span> for multiple match predictions</p>
            <p className="text-sm">🏆 Win 25% Discounted Bets (valid for 72 hours)</p>
          </div>

          
          <Button
          onClick={handlePredictMatches}
          text={'Select Overall Outcome'}
          />
        </div>

        {/* Card 2: Correct Score */}
        <div className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow hover:shadow-lg transition">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Correct Score</h2>
            <Award className="w-5 h-5 text-blue-700" />
          </div>
          <p className="text-gray-500 text-sm mb-4">Exact score predictions</p>

          <div className="space-y-3 mb-4">
            <p className="text-gray-700 text-sm">
              Predict the exact scoreline for upcoming football matches.
            </p>
            <p className="text-sm">🎯 <span className="font-semibold">$1 fee</span> for each submission</p>
            <p className="text-sm">🎯 Choose from scores 0–10 for each team</p>
            <p className="text-sm">🏆 Win FREE Bets (no expiration)</p>
          </div>

           <Button
          onClick={handleCorrectScoreMatches}
          text={'Select Correct Score'}
          />
        </div>
      </div>
    </div>
  );
}
