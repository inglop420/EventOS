'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

export function StickyCTA({ onOpenWizard }: { onOpenWizard: () => void }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsVisible(window.scrollY > 600);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="fixed bottom-6 left-6 z-50 md:hidden"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full left-0 mb-3 whitespace-nowrap"
                    >
                        <div className="glass rounded-full px-4 py-2 text-sm text-[var(--text-muted)] shadow-lg"
                            style={{ fontFamily: "'Outfit', sans-serif" }}>
                            📅 Agendar Visita
                        </div>
                    </motion.div>
                    <button
                        onClick={onOpenWizard}
                        className="w-14 h-14 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]
              text-[var(--bg)] shadow-[0_8px_30px_rgba(201,185,154,0.4)]
              active:scale-[0.90] transition-transform flex items-center justify-center border border-[var(--accent-light)]/20 pulse-gold"
                    >
                        <Calendar className="w-6 h-6" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
