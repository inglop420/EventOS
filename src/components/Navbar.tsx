'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Contacto', href: '#contacto' },
];

export function Navbar({ onOpenWizard }: { onOpenWizard: () => void }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <a href="#hero" className="flex items-center gap-2">
                    <span className="text-lg font-medium tracking-[0.05em] text-[var(--accent)]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        El Paraíso
                    </span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]
                               hover:text-[var(--accent)] transition-colors duration-300"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <button
                        onClick={onOpenWizard}
                        className="px-5 py-2 text-xs tracking-[0.15em] uppercase font-medium
              border border-[var(--accent-dark)] text-[var(--accent)]
              hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Agendar Visita
                    </button>
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="md:hidden p-2 text-[var(--text-muted)]"
                >
                    {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden glass border-t border-[var(--border)]"
                >
                    <div className="px-6 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="block text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition py-1 tracking-wide"
                            >
                                {link.label}
                            </a>
                        ))}
                        <button
                            onClick={() => { setIsMobileOpen(false); onOpenWizard(); }}
                            className="w-full py-3 text-xs tracking-[0.15em] uppercase font-medium
                bg-[var(--accent)] text-[var(--bg)] transition-all mt-2"
                        >
                            Agendar Visita
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
