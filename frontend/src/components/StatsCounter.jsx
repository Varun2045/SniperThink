import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const StatsCounter = () => {
  const { ref, hasBeenInView } = useInView({ threshold: 0.5 });
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const stats = [
    { value: 500, suffix: '+', label: 'Companies Trust Us', icon: '🏢' },
    { value: 95, suffix: '%', label: 'Success Rate', icon: '📈' },
    { value: 10, suffix: 'M+', label: 'Strategies Executed', icon: '⚡' },
    { value: 24, suffix: '/7', label: 'AI-Powered Support', icon: '🤖' }
  ];

  useEffect(() => {
    if (!hasBeenInView) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    stats.forEach((stat, index) => {
      let currentCount = 0;
      const increment = stat.value / steps;

      const counter = setInterval(() => {
        currentCount += increment;
        if (currentCount >= stat.value) {
          currentCount = stat.value;
          clearInterval(counter);
        }
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(currentCount);
          return newCounts;
        });
      }, interval);
    });
  }, [hasBeenInView]);

  return (
    <motion.section
      ref={ref}
      data-testid="stats-section"
      className="py-20 px-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          Proven Excellence in Numbers
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              data-testid={`stat-card-${index}`}
              className="text-center p-6 rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/10"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 20px 40px rgba(168, 85, 247, 0.2)'
              }}
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ 
                  rotate: hasBeenInView ? [0, 10, -10, 0] : 0,
                  scale: hasBeenInView ? [1, 1.2, 1] : 1
                }}
                transition={{ 
                  delay: index * 0.1 + 0.5,
                  duration: 0.6
                }}
              >
                {stat.icon}
              </motion.div>
              
              <motion.div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                {counts[index]}{stat.suffix}
              </motion.div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsCounter;