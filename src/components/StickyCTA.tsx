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
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-4 right-4 z-40 md:hidden"
                >
                    <button
                        onClick={onOpenWizard}
                        className="w-full py-5 rounded-full text-lg font-bold tracking-wide
              bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]
              text-[var(--bg)] shadow-[0_8px_30px_rgba(0,0,0,0.3)]
              active:scale-[0.98] transition-transform flex items-center justify-center gap-3 border border-[var(--accent-light)]/20"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        <Calendar className="w-5 h-5" />
                        Verificar Disponibilidad
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
