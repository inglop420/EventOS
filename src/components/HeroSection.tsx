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
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/85 via-[var(--bg)]/60 to-[var(--bg)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* Overline */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs tracking-[0.3em] uppercase text-[var(--accent-dark)] mb-6"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                    Chapala, Jalisco — desde 2018
                </motion.p>

                {/* Decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="line-accent mb-8"
                />

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6 text-[var(--text)]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                    Tu evento soñado<br />
                    <span className="gradient-text italic">comienza aquí</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-base md:text-lg text-[var(--text-muted)] mb-10 max-w-xl mx-auto leading-relaxed"
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
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
                        className="px-8 py-3.5 rounded-none text-sm tracking-[0.15em] uppercase font-medium
              bg-[var(--accent)] text-[var(--bg)]
              hover:bg-[var(--accent-light)] transition-all duration-300"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        <span className="flex items-center gap-3">
                            <Calendar className="w-4 h-4" />
                            Verificar Disponibilidad
                        </span>
                    </button>
                    <a
                        href="#galeria"
                        className="px-8 py-3.5 rounded-none text-sm tracking-[0.15em] uppercase font-medium
              border border-[var(--border-hover)] text-[var(--text-muted)]
              hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
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
                    className="mt-20 flex justify-center gap-12 md:gap-20"
                >
                    {[
                        { number: '500+', label: 'Eventos' },
                        { number: '4.9', label: 'Calificación' },
                        { number: '8', label: 'Años' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <p className="text-2xl md:text-3xl font-light text-[var(--accent)]"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                {stat.number}
                            </p>
                            <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-dim)] mt-1"
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
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
                    <ChevronDown className="w-5 h-5 text-[var(--accent-dark)]" />
                </motion.div>
            </motion.div>
        </section>
    );
}
