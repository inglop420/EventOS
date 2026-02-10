'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

export function StickyCTA({ onOpenWizard }: { onOpenWizard: () => void }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 600);
        };
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
                    <div className="bg-gradient-to-t from-black via-black/95 to-transparent pt-6 pb-4 px-4">
                        <button
                            onClick={onOpenWizard}
                            className="w-full py-3.5 rounded-full text-base font-semibold
                bg-gradient-to-r from-[var(--orange-cta)] to-[var(--orange-hover)]
                text-white shadow-[0_-4px_30px_rgba(232,122,30,0.3)]
                active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                        >
                            <Calendar className="w-5 h-5" />
                            Verificar Disponibilidad 📅
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
