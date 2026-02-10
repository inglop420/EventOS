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
                    className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
                >
                    <div className="bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/95 to-transparent pt-6 pb-4 px-4">
                        <button
                            onClick={onOpenWizard}
                            className="w-full py-3.5 text-xs tracking-[0.15em] uppercase font-medium
                bg-[var(--accent)] text-[var(--bg)]
                active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            <Calendar className="w-4 h-4" />
                            Verificar Disponibilidad
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
