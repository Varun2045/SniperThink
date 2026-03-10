import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const Testimonials = () => {
  const { ref, hasBeenInView } = useInView({ threshold: 0.2 });

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CEO, TechVision Inc',
      avatar: '👩‍💼',
      quote: 'SniperThink transformed our strategic approach. We saw 300% growth in just 6 months!',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'VP Strategy, GlobalCorp',
      avatar: '👨‍💼',
      quote: 'The AI-powered insights are game-changing. Best investment we\'ve ever made.',
      rating: 5
    },
    {
      name: 'Emily Zhang',
      role: 'Founder, StartupX',
      avatar: '👩‍🚀',
      quote: 'From analysis to execution, SniperThink guided us every step. Now we dominate our market.',
      rating: 5
    }
  ];

  return (
    <motion.section
      ref={ref}
      data-testid="testimonials-section"
      className="py-20 px-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight tracking-tight mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium max-w-3xl mx-auto">
            Join thousands of companies achieving strategic excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              data-testid={`testimonial-${index}`}
              className="group p-8 rounded-3xl bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-black/40 dark:to-slate-800/40 backdrop-blur-md border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                rotateX: 2
              }}
            >
              {/* Rating Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={hasBeenInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.2 + i * 0.1 }}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <motion.div
                  className="text-4xl"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {testimonial.avatar}
                </motion.div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {['🏆 Award Winning', '🔒 Enterprise Secure', '⚡ Lightning Fast', '🌍 Global Scale'].map((badge, i) => (
            <motion.div
              key={i}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-sm font-semibold">{badge}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
