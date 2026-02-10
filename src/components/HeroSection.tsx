'use client';

import { motion } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';

export default function HeroSection({ onOpenWizard }: { onOpenWizard: () => void }) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&h=1080&fit=crop"
                    alt="Jardín El Paraíso"
                    className="w-full h-full object-cover absolute inset-0"
                />
                <video autoPlay muted loop playsInline className="w-full h-full object-cover absolute inset-0">
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/80 via-[var(--bg)]/50 to-[var(--bg)]" />
            </div>

            {/* Ambient glow decorations */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[var(--warm)]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* Overline */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm tracking-widest uppercase text-[var(--accent-dark)] mb-6"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                    ✨ Chapala, Jalisco — desde 2018 ✨
                </motion.p>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-[var(--text)]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                    Tu evento soñado<br />
                    <span className="gradient-text">comienza aquí</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-base md:text-lg text-[var(--text-muted)] mb-10 max-w-xl mx-auto"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                    Un jardín exclusivo con vista al Lago de Chapala.
                    Bodas, XV Años y celebraciones que trascienden.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button
                        onClick={onOpenWizard}
                        className="group relative px-8 py-4 rounded-full text-lg font-semibold
              bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]
              text-[var(--bg)] hover:from-[var(--accent-light)] hover:to-[var(--accent)]
              transition-all duration-300 transform hover:scale-105
              shadow-[0_0_30px_rgba(201,185,154,0.2)]
              hover:shadow-[0_0_50px_rgba(201,185,154,0.3)]"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        <span className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Verificar Disponibilidad
                        </span>
                    </button>
                    <a
                        href="#galeria"
                        className="px-8 py-4 rounded-full text-lg font-semibold
              border border-[var(--accent)]/30 text-[var(--accent)]
              hover:bg-[var(--accent)]/10 transition-all duration-300"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Ver el Jardín
                    </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-16 flex justify-center gap-8 md:gap-16"
                >
                    {[
                        { number: '500+', label: 'Eventos Realizados' },
                        { number: '4.9★', label: 'Calificación' },
                        { number: '8+', label: 'Años de Experiencia' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <p className="text-2xl md:text-3xl font-bold gradient-text"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                {stat.number}
                            </p>
                            <p className="text-xs text-[var(--text-dim)] mt-1"
                                style={{ fontFamily: "'Outfit', sans-serif" }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
                    <ChevronDown className="w-6 h-6 text-[var(--accent)]" />
                </motion.div>
            </motion.div>
        </section>
    );
}
