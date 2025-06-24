/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  'Choose to play as a player or become The House',
  'Select your preferred game type',
  'Set your stake amount',
  'Make your predictions and confirm your play',
  'Wait for results and collect your winnings!',
];

const HowToPlayCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">How to Play</h2>
      <p className="text-gray-600 text-center mb-6">
        New to our platform? Here's how to get started:
      </p>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-start space-x-3"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-semibold">
              {index + 1}
            </div>
            <p className="text-gray-700 text-base">{step}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowToPlayCard;
