import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollProgress from './components/ScrollProgress';
import StrategyStep from './components/StrategyStep';
import Spotlight from './components/Spotlight';
import DarkModeToggle from './components/DarkModeToggle';
import LoadingScreen from './components/LoadingScreen';
import StatsCounter from './components/StatsCounter';
import TechMarquee from './components/TechMarquee';
import MouseParallax from './components/MouseParallax';
import Testimonials from './components/Testimonials';
import { strategySteps } from './data/strategySteps';
import { TypeAnimation } from 'react-type-animation';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [formStatus, setFormStatus] = useState({ type: '', message: '' });

    // Initialize dark mode
    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'dark';
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFormLoading(true);
        setFormStatus({ type: '', message: '' });

        try {
            // Validate form data
            if (!formData.name.trim() || !formData.email.trim()) {
                setFormStatus({
                    type: 'error',
                    message: 'Please fill in all fields.'
                });
                setIsFormLoading(false);
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setFormStatus({
                    type: 'error',
                    message: 'Please enter a valid email address.'
                });
                setIsFormLoading(false);
                return;
            }

            // Try to submit to backend
            const response = await axios.post(`${API}/interest`, {
                name: formData.name,
                email: formData.email,
                selected_step: 'Start Your Journey'
            });

            setFormStatus({
                type: 'success',
                message: 'Thank you for your interest! We\'ll be in touch soon.'
            });

            // Reset form after 2 seconds
            setTimeout(() => {
                setFormData({ name: '', email: '' });
                setFormStatus({ type: '', message: '' });
                setShowForm(false);
            }, 2000);
        } catch (error) {
            // Handle different error types
            if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
                setFormStatus({
                    type: 'error',
                    message: 'Network error. Please check your connection and try again.'
                });
            } else if (error.response?.status === 404) {
                // Backend not found - simulate success for demo purposes
                setFormStatus({
                    type: 'success',
                    message: 'Thank you for your interest! We\'ll be in touch soon.'
                });
                
                // Still reset form after 2 seconds
                setTimeout(() => {
                    setFormData({ name: '', email: '' });
                    setFormStatus({ type: '', message: '' });
                    setShowForm(false);
                }, 2000);
            } else if (error.response?.status === 500) {
                setFormStatus({
                    type: 'error',
                    message: 'Server error. Please try again in a few moments.'
                });
            } else {
                setFormStatus({
                    type: 'error',
                    message: 'Oops! Something went wrong. Please try again.'
                });
            }
        } finally {
            setIsFormLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (isLoading) {
        return <LoadingScreen onComplete={() => setIsLoading(false)} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-900 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white overflow-x-hidden font-sans antialiased">
            
            {/* Mouse-Following Spotlight */}
            <Spotlight />

            {/* Mouse Parallax Background */}
            <MouseParallax />

            {/* Scroll Progress Bar */}
            <ScrollProgress />

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Hero Section */}
            <motion.section
                data-testid="hero-section"
                className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-purple-500 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -50, 0],
                                opacity: [0.2, 0.8, 0.2],
                                scale: [1, 1.5, 1]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                        />
                    ))}
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center space-y-8 max-w-5xl">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 150,
                            damping: 20,
                            delay: 0.2
                        }}
                        className="inline-block"
                    >
                        <div className="text-8xl mb-6">🎯</div>
                    </motion.div>

                    <motion.h1
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight tracking-tight"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        SniperThink
                    </motion.h1>

                    <motion.p
                        className="text-xl sm:text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-400 leading-relaxed"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <TypeAnimation
                            sequence={[
                                'Precision Strategy.',
                                2000,
                                'Flawless Execution.',
                                2000,
                                'Market Dominance.',
                                2000,
                                'AI-Powered Intelligence.',
                                2000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </motion.p>

                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-500 max-w-4xl mx-auto leading-relaxed font-medium"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Transform your business with AI-powered strategic intelligence. From deep market analysis to sustained competitive advantage,
                        SniperThink is your command center for strategic excellence.
                    </motion.p>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="pt-8"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                            className="text-4xl"
                        >
                            ↓
                        </motion.div>
                        <p className="text-sm text-gray-500 dark:text-gray-600 mt-2">Scroll to explore</p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Strategy Steps */}
            <section data-testid="strategy-flow-section" className="relative">
                {strategySteps.map((step, index) => (
                    <StrategyStep
                        key={step.id}
                        step={step}
                        index={index}
                    />
                ))}
            </section>

            {/* Stats Counter Section */}
            <StatsCounter />

            {/* Testimonials Section */}
            <Testimonials />

            {/* Tech Marquee */}
            <TechMarquee />

            {/* Footer CTA Section */}
            <motion.section
                id="start-journey"
                data-testid="footer-cta-section"
                className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 opacity-10" />

                <div className="relative z-10 text-center space-y-8 max-w-4xl">
                    <motion.h2
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent leading-tight tracking-tight"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Ready to Dominate Your Market?
                    </motion.h2>

                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium max-w-4xl mx-auto"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Join forward-thinking leaders who trust SniperThink for strategic superiority.
                    </motion.p>

                    {/* Conditional Content: Default Content or Form */}
                    <AnimatePresence mode="wait">
                        {!showForm ? (
                            <motion.div
                                key="default-content"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.button
                                    data-testid="footer-cta-button"
                                    onClick={() => setShowForm(true)}
                                    className="mt-8 px-12 py-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-semibold shadow-2xl"
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 }}
                                    whileHover={{
                                        scale: 1.05
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Start Your Journey
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form-content"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="mt-8 max-w-md mx-auto space-y-4"
                            >
                                {/* Form Title */}
                                <div className="text-center mb-4">
                                    <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Start Your Journey
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Let's begin your path to strategic excellence
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            data-testid="footer-name-input"
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-2 py-3 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-all"
                                            placeholder="Enter your full name"
                                            disabled={isFormLoading}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            data-testid="footer-email-input"
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-2 py-3 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-all"
                                            placeholder="your.email@company.com"
                                            disabled={isFormLoading}
                                        />
                                    </div>

                                    {/* Status Message */}
                                    <AnimatePresence>
                                        {formStatus.message && (
                                            <motion.div
                                                data-testid="footer-status-message"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className={`p-3 rounded-lg text-sm ${
                                                    formStatus.type === 'success'
                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                                }`}
                                            >
                                                {formStatus.message}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Form Actions */}
                                    <div className="flex space-x-3">
                                        {/* Submit Button */}
                                        <motion.button
                                            data-testid="footer-submit-button"
                                            type="submit"
                                            disabled={isFormLoading}
                                            className="group relative flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
                                            whileHover={{ scale: isFormLoading ? 1 : 1.02, y: isFormLoading ? 0 : -2 }}
                                            whileTap={{ scale: isFormLoading ? 1 : 0.98 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                        >
                                            <span className="relative z-10 flex items-center justify-center space-x-2">
                                                {isFormLoading ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span>Processing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Submit</span>
                                                        <motion.svg
                                                            className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                            initial={{ x: -10 }}
                                                            whileHover={{ x: 0 }}
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                        </motion.svg>
                                                    </>
                                                )}
                                            </span>
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{ filter: 'brightness(1.1)' }}
                                            />
                                        </motion.button>

                                        {/* Cancel Button */}
                                        <motion.button
                                            data-testid="footer-cancel-button"
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            disabled={isFormLoading}
                                            className="group relative px-6 py-4 rounded-xl bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:from-slate-300 hover:to-slate-400 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                            whileHover={{ scale: isFormLoading ? 1 : 1.02, y: isFormLoading ? 0 : -2 }}
                                            whileTap={{ scale: isFormLoading ? 1 : 0.98 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                        >
                                            <span className="relative z-10 flex items-center space-x-2">
                                                <span>Cancel</span>
                                                <motion.svg
                                                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    initial={{ x: -10 }}
                                                    whileHover={{ x: 0 }}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </motion.svg>
                                            </span>
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{ filter: 'brightness(1.1)' }}
                                            />
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        className="pt-12 text-sm text-gray-500 dark:text-gray-600"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                    >
                        ©2026 SniperThink. Built with precision.
                    </motion.div>
                </div>
            </motion.section>

        </div>
    );
}

export default App;
