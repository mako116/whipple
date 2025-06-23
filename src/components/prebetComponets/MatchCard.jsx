import React from 'react';
import ScoreDropdown from './ScroreDropdown';
// import ScoreDropdown from './ScoreDropdown';

 

const MatchCard  = ({ teamA, teamB, date, scoreA, setScoreA, scoreB, setScoreB }) => {
  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 mb-6 shadow">
      <p className="text-sm text-gray-500 mb-3">{date}</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-2">
          <p className="font-semibold">{teamA}</p>
          <ScoreDropdown selected={scoreA} onSelect={setScoreA} />
        </div>
        <p className="text-xl font-bold text-gray-700">VS</p>
        <div className="flex flex-col items-center gap-2">
          <p className="font-semibold">{teamB}</p>
          <ScoreDropdown selected={scoreB} onSelect={setScoreB} />
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
