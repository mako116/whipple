import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const leagues = [
  { emoji: '🏆', name: 'Champions League (UEFA)' },
   { flag: 'https://flagcdn.com/w80/gb.png', name: 'Premier League' },
  { flag: 'https://flagcdn.com/w80/es.png', name: 'La Liga' },
  { flag: 'https://flagcdn.com/w80/de.png', name: 'Bundesliga' },
  { flag: 'https://flagcdn.com/w80/it.png', name: 'Serie A' },
  { flag: 'https://flagcdn.com/w80/fr.png', name: 'Ligue 1' },
];

export default function SelectLeagueScreen() {
  const navigate = useNavigate();

  const handleChoose = () => {
    navigate('/league-menu');
  };

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto bg-gray-50">
      {/* Back Button */}
      <button
        className="flex items-center cursor-pointer gap-2 border border-gray-300 bg-white rounded-lg px-4 py-2 mb-6 shadow hover:bg-gray-100 transition"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-5 h-5 text-slate-900" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-3">Select League</h1>
        <p className="text-gray-600 text-lg">Choose a league to view available matches</p>
      </div>

      {/* Grid of Leagues */}
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {leagues.map((league, index) => (
      <button
      key={index}
      onClick={handleChoose}
      className="w-full border-2 cursor-pointer border-gray-200 rounded-xl p-6 bg-white flex flex-col items-center shadow hover:shadow-lg hover:border-blue-500 hover:scale-[1.02] transition-all"
    >
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
        {league.flag ? (
          <img src={league.flag} alt={league.name} className="w-10 h-10 object-cover" />
        ) : (
          <span className="text-3xl">{league.emoji}</span>
        )}
      </div>
      <span className="text-center font-semibold text-gray-800">{league.name}</span>
    </button>
  ))}
   </div>

    </div>
  );
}
