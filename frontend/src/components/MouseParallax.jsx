import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MouseParallax = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"
        style={{
          top: '20%',
          left: '10%',
        }}
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 blur-3xl"
        style={{
          bottom: '20%',
          right: '10%',
        }}
        animate={{
          x: mousePosition.x * -40,
          y: mousePosition.y * -40,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      />

      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-green-500/15 to-teal-500/15 blur-3xl"
        style={{
          top: '50%',
          left: '50%',
        }}
        animate={{
          x: mousePosition.x * -60,
          y: mousePosition.y * 60,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      />
    </div>
  );
};

export default MouseParallax;