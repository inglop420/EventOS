'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bell } from 'lucide-react';

const notifications = [
    { city: 'Chapala', type: 'boda', time: 'hace 3 min' },
    { city: 'Guadalajara', type: 'XV años', time: 'hace 8 min' },
    { city: 'Ajijic', type: 'evento social', time: 'hace 12 min' },
    { city: 'Jocotepec', type: 'boda', time: 'hace 15 min' },
    { city: 'Zapopan', type: 'evento corporativo', time: 'hace 22 min' },
    { city: 'Tlaquepaque', type: 'graduación', time: 'hace 27 min' },
];

export function UrgencyBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const initialDelay = setTimeout(() => setIsVisible(true), 5000);
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % notifications.length);
                setIsVisible(true);
            }, 1000);
            setTimeout(() => setIsVisible(false), 6000);
        }, 15000);
        return () => { clearTimeout(initialDelay); clearInterval(interval); };
    }, []);

    const notification = notifications[currentIndex];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 400, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40
                    glass px-4 py-3 shadow-xl max-w-sm cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                            <Bell className="w-4 h-4 text-[var(--accent-dark)]" />
                        </div>
                        <div>
                            <p className="text-xs text-[var(--text)]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                <span className="font-medium">Alguien de {notification.city}</span>{' '}
                                cotizó una{' '}
                                <span className="text-[var(--accent)]">{notification.type}</span>
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                                <MapPin className="w-2.5 h-2.5 text-[var(--text-dim)]" />
                                <span className="text-[10px] text-[var(--text-dim)]">{notification.time}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
