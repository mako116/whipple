/* eslint-disable no-unused-vars */
// src/components/ColorRouletteWheel.jsx
import React, { useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';

const colors = [
  { id: 'red', hex: '#EA384C', label: 'Red' },
  { id: 'blue', hex: '#0EA5E9', label: 'Blue' },
  { id: 'green', hex: '#22C55E', label: 'Green' },
  { id: 'yellow', hex: '#EAB308', label: 'Yellow' },
];

export default function ColorRouletteWheel({
  activeColors = [],
  loading = false,
  onSpin,
  hideButton = false,   // ✅ new prop
}) {
  const getOpacity = id =>
    activeColors.length === 0 || activeColors.includes(id) ? 1 : 0.4;

  const [{ rotate }, api] = useSpring(() => ({ rotate: 0 }));

  useEffect(() => {
    if (loading) {
      api.start({ from: { rotate: 0 }, to: { rotate: 360 * 4 }, reset: true });
    }
  }, [loading, api]);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gray-300 mb-10">
        <animated.div
          style={{ transform: rotate.to(r => `rotate(${r}deg)`) }}
          className="absolute inset-0"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {colors.map((c, idx) => (
              <path
                key={c.id}
                d="M50 50L70 5L195 5Z"
                fill={c.hex}
                opacity={getOpacity(c.id)}
                transform={`rotate(${idx * 90} 50 50)`}
              />
            ))}
          </svg>
        </animated.div>

        <div
          className="absolute bg-gray-800 rounded-full"
          style={{
            width: 16,
            height: 16,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute bg-gray-800 rounded-t-lg"
          style={{
            width: 19,
            height: 40,
            top: -20,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* Only show button if hideButton is false */}
      {!hideButton && (
        <button
          onClick={onSpin}
          disabled={loading}
          className={`w-full max-w-xs py-4 text-white rounded ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Spinning...' : 'Spin Wheel'}
        </button>
      )}
    </div>
  );
}
