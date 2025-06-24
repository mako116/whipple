// FloatingMessage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdMessage } from 'react-icons/md';

export default function FloatingMessage() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate('/chat')}
      initial={{ y: 0 }}
      animate={{ y: [0, -15, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      className="fixed bottom-20 right-8 z-50 bg-white p-3 rounded-full shadow-md cursor-pointer"
    >
      <MdMessage size={24} color="black" />
    </motion.button>
  );
}
