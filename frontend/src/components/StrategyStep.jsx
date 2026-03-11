import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Target, Zap, Play, TrendingUp, Crown } from 'lucide-react';

const StrategyStep = ({ step, index }) => {
  const { ref, hasBeenInView } = useInView({ threshold: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  // Map icon names to Lucide components
  const iconMap = {
    'Target': Target,
    'Zap': Zap,
    'Play': Play,
    'TrendingUp': TrendingUp,
    'Crown': Crown
  };
  
  const IconComponent = iconMap[step.icon] || Target;

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
      rotateX: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: 'easeInOut'
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.8 + (i * 0.1),
        duration: 0.5
      }
    })
  };

  return (
    <motion.div
      ref={ref}
      data-testid={`strategy-step-${step.id}`}
      className={`min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden`}
      variants={containerVariants}
      initial="hidden"
      animate={hasBeenInView ? 'visible' : 'hidden'}
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5`}
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.1 : 0.05
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full bg-gradient-to-br ${step.color}`}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.3
          }}
        />
      ))}

      <div className={`max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center relative z-10 ${
        isEven ? '' : 'md:flex-row-reverse'
      }`}>
        {/* Content Side */}
        <motion.div
          className={`space-y-6 ${isEven ? 'md:pr-8' : 'md:pl-8 md:order-2'}`}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Step Number */}
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 backdrop-blur-sm border border-slate-200 dark:border-slate-600 shadow-sm"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Step {index + 1} of 5
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent leading-tight tracking-tight`}
            animate={{
              backgroundPosition: isHovered ? ['0%', '100%'] : '0%',
              scale: isHovered ? 1.02 : 1
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {step.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.h3
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 leading-tight"
            animate={{ x: isHovered ? 8 : 0, opacity: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {step.subtitle}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium"
            animate={{ opacity: isHovered ? 1 : 0.85, y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {step.description}
          </motion.p>

          {/* Features */}
          <motion.ul className="space-y-3">
            {step.features.map((feature, i) => (
              <motion.li
                key={i}
                custom={i}
                variants={featureVariants}
                initial="hidden"
                animate={hasBeenInView ? 'visible' : 'hidden'}
                className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 font-medium"
                whileHover={{ x: 8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <motion.span 
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.button
            data-testid={`interest-button-${step.id}`}
            onClick={() => {
              const element = document.getElementById('start-journey');
              if (element) {
                element.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start',
                  inline: 'nearest'
                });
                
                // Slow down the scrolling animation
                const start = window.pageYOffset;
                const target = element.getBoundingClientRect().top + start - 100;
                const distance = target - start;
                const duration = 3000; // 3 seconds for slower scroll
                let startTimestamp = null;

                const step = (timestamp) => {
                  if (!startTimestamp) startTimestamp = timestamp;
                  const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                  const easeInOutCubic = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                  
                  window.scrollTo(0, start + distance * easeInOutCubic);
                  
                  if (progress < 1) {
                    window.requestAnimationFrame(step);
                  }
                };

                window.requestAnimationFrame(step);
              }
            }}
            className={`group relative mt-8 px-8 py-4 rounded-full bg-gradient-to-r ${step.color} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
            whileHover={{ 
              scale: 1.03,
              y: -2
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>I'm Interested in {step.title}</span>
              <motion.svg
                className="w-4 h-4"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </motion.svg>
            </span>
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              style={{ filter: 'brightness(1.1)' }}
            />
          </motion.button>
        </motion.div>

        {/* Visual Side - Animated Icon */}
        <motion.div
          className={`flex items-center justify-center ${isEven ? '' : 'md:order-1'}`}
          style={{
            perspective: '1000px'
          }}
        >
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate={hasBeenInView ? 'visible' : 'hidden'}
            whileHover="hover"
            className={`relative w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl cursor-pointer backdrop-blur-sm border border-white/20`}
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Glow effect */}
            <motion.div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} blur-3xl opacity-40`}
              animate={{
                scale: isHovered ? [1, 1.3, 1] : 1,
                opacity: isHovered ? [0.4, 0.6, 0.4] : 0.4
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Inner glow */}
            <motion.div
              className="absolute inset-2 rounded-2xl bg-white/10 backdrop-blur-sm"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
                opacity: isHovered ? [0.1, 0.2, 0.1] : 0.1
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="relative z-10 text-white drop-shadow-2xl"
              animate={{
                rotateY: isHovered ? [0, 360] : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1],
                scale: { duration: 0.3 }
              }}
            >
              <IconComponent size={100} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StrategyStep;
