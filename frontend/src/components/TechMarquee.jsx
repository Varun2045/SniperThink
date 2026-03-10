import React from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const TechMarquee = () => {
  const technologies = [
    { name: 'React 19', icon: '⚛️' },
    { name: 'Framer Motion', icon: '🎬' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'FastAPI', icon: '⚡' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Python', icon: '🐍' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'AI-Powered', icon: '🤖' },
    { name: 'Cloud Ready', icon: '☁️' },
    { name: 'Real-time', icon: '⏱️' }
  ];

  return (
    <motion.section
      data-testid="tech-marquee"
      className="py-12 overflow-hidden bg-black/5 dark:bg-white/5 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Built with Modern Tech Stack
        </h3>
      </div>

      <Marquee gradient={false} speed={50}>
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className="mx-8 flex items-center space-x-3 px-6 py-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <span className="text-3xl">{tech.icon}</span>
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </Marquee>
    </motion.section>
  );
};

export default TechMarquee;