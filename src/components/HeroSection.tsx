'use client';

import { motion } from 'framer-motion';
import { Calendar, Star, ChevronDown } from 'lucide-react';

export default function HeroSection({ onOpenWizard }: { onOpenWizard: () => void }) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
            {/* Video / Image Background */}
            <div className="absolute inset-0 z-0">
                {/* Background image (serves as poster/fallback) */}
                <img
                    src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&h=1080&fit=crop"
                    alt="Jardín El Paraíso"
                    className="w-full h-full object-cover absolute inset-0"
                />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover absolute inset-0"
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
                >
                    <Star className="w-4 h-4 text-[var(--gold)]" fill="currentColor" />
                    <span className="text-sm text-[var(--gold-light)] tracking-wide">
                        El jardín de eventos más exclusivo de Chapala
                    </span>
                    <Star className="w-4 h-4 text-[var(--gold)]" fill="currentColor" />
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Tu evento soñado{' '}
                    <span className="gradient-text">comienza aquí</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg md:text-xl text-gray-300 mb-4 max-w-2xl mx-auto"
                >
                    Celebra rodeado de naturaleza con{' '}
                    <span className="text-[var(--gold)]">vista al Lago de Chapala</span>.
                    Bodas, XV Años y eventos sociales que se convierten en recuerdos eternos.
                </motion.p>

                {/* Urgency text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-sm text-[var(--orange-cta)] font-medium mb-8"
                >
                    ⚡ Solo quedan 3 fechas disponibles este mes
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button
                        onClick={onOpenWizard}
                        className="group relative px-8 py-4 rounded-full text-lg font-semibold
              bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)]
              text-[var(--black)] hover:from-[var(--gold-light)] hover:to-[var(--gold)]
              transition-all duration-300 transform hover:scale-105
              shadow-[0_0_30px_rgba(200,169,81,0.3)]
              hover:shadow-[0_0_50px_rgba(200,169,81,0.5)]"
                    >
                        <span className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Verificar Disponibilidad 📅
                        </span>
                    </button>
                    <a
                        href="#galeria"
                        className="px-8 py-4 rounded-full text-lg font-medium
              border border-white/20 text-white/90 hover:border-[var(--gold)]
              hover:text-[var(--gold)] transition-all duration-300"
                    >
                        Ver el Jardín
                    </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="mt-12 flex justify-center gap-8 md:gap-16"
                >
                    {[
                        { number: '500+', label: 'Eventos Realizados' },
                        { number: '4.9', label: 'Calificación', icon: '⭐' },
                        { number: '8 años', label: 'de Experiencia' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <p className="text-2xl md:text-3xl font-bold gradient-text">
                                {stat.icon || ''} {stat.number}
                            </p>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ChevronDown className="w-6 h-6 text-[var(--gold)] opacity-60" />
                </motion.div>
            </motion.div>
        </section>
    );
}
