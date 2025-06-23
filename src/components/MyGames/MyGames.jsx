// src/components/GameCard.jsx
export default function GameCard({ item, type, GameName }) {
  const isPast = type === 'past';
  return (
    <div className="bg-white rounded-xl p-4 mb-4 shadow">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{item.gameName} Goal Challenge</span>
        <span className={`px-3 py-1 rounded-full text-white ${
          isPast ? (item.concluded === 'Concluded' ? 'bg-orange-500' : 'bg-red-500') : 'bg-blue-500'
        } text-xs`}>
          {isPast ? item.concluded : 'GameList'}
        </span>
      </div>

      <div className="flex justify-between mt-4">
        <div className="space-y-1">
          <p className="text-gray-600">Odds: 3.003x</p>
          <p className="text-gray-600 max-w-xs">Left, right, or center? Choose where to shoot!</p>
          <p className="text-gray-600">Status: 2 winner</p>
          <p className="text-gray-600">House: @GoalKeeper22</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Stake</p>
          <p className={`font-bold ${item.status === 'won' ? 'text-green-600' : 'text-red-600'}`}>
            {item.amount}
          </p>
        </div>
      </div>

      <button className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded cursor-not-allowed opacity-50">
        Game Ended
      </button>
    </div>
  );
}
