import React, { useState } from 'react';
  
const ScoreDropdown  = ({ selected, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const options = Array.from({ length: 11 }, (_, i) => i);
 
  return (
    <div className="relative">
      <button
        className={`w-20 py-2 px-4 border rounded ${selected !== null ? 'bg-blue-700 text-white' : 'bg-gray-100 text-black'}`}
        onClick={() => setVisible(!visible)}
      >
        {selected !== null ? selected : 'Score'}
      </button>

      {visible && (
        <div className="absolute z-50 mt-2 bg-white border rounded shadow max-h-40 overflow-y-auto">
          {options.map((score) => (
            <div
              key={score}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(score);
                setVisible(false);
              }}
            >
              {score}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScoreDropdown;
