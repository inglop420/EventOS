'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
    { name: 'María & Carlos', event: 'Boda', text: 'Nuestra boda en El Paraíso fue mágica. La vista al lago al atardecer hizo que todo fuera perfecto. Nuestros invitados aún hablan de lo hermoso que estuvo.', rating: 5 },
    { name: 'Familia Rodríguez', event: 'XV Años', text: 'Los XV años de nuestra hija fueron espectaculares. El jardín decorado con luces y las áreas verdes hicieron que todo se viera como un cuento de hadas.', rating: 5 },
    { name: 'Andrea & Luis', event: 'Boda', text: 'Buscamos muchos lugares y ninguno se compara con El Paraíso. El equipo nos ayudó con todo y la cocina nos permitió usar nuestro propio catering.', rating: 5 },
    { name: 'Empresa TechMX', event: 'Corporativo', text: 'Organizamos nuestro evento de fin de año aquí y fue un éxito total. El estacionamiento amplio y las áreas techadas facilitaron todo.', rating: 5 },
];

const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop', label: 'Bodas de Ensueño' },
    { src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&h=800&fit=crop', label: 'Decoración Floral' },
    { src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=800&fit=crop', label: 'Vista al Lago' },
    { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=800&fit=crop', label: 'Jardín Iluminado' },
    { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=800&fit=crop', label: 'XV Años' },
    { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=800&fit=crop', label: 'Espacios Amplios' },
];

export function SocialProofSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-24 px-4 relative overflow-hidden" id="galeria">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent-dark)] mb-4"
                        style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Galería & Testimonios
                    </p>
                    <div className="line-accent mb-6" />
                    <h2 className="text-3xl md:text-5xl font-medium mb-4"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        Momentos que se convierten en{' '}
                        <span className="gradient-text italic">recuerdos eternos</span>
                    </h2>
                    <p className="text-[var(--text-muted)] max-w-lg mx-auto text-sm leading-relaxed"
                        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                        Más de 500 familias han celebrado con nosotros
                    </p>
                </motion.div>

                {/* Gallery Carousel */}
                <div className="mb-20">
                    <div ref={scrollRef} className="stories-carousel">
                        {galleryImages.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="story-card w-[200px] md:w-[260px] flex-shrink-0 group cursor-pointer"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <img
                                        src={img.src}
                                        alt={img.label}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/90 via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-xs tracking-[0.15em] uppercase text-[var(--accent-light)]"
                                            style={{ fontFamily: "'Outfit', sans-serif" }}>
                                            {img.label}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-2 gap-px bg-[var(--border)]">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[var(--bg)] p-8 group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                                    <span className="text-[var(--accent)] font-medium text-sm"
                                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                        {t.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-medium text-[var(--text)]"
                                            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem' }}>
                                            {t.name}
                                        </h4>
                                        <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--text-dim)]"
                                            style={{ fontFamily: "'Outfit', sans-serif" }}>
                                            {t.event}
                                        </span>
                                    </div>
                                    <div className="flex gap-0.5 mb-3">
                                        {Array.from({ length: t.rating }).map((_, j) => (
                                            <Star key={j} className="w-3 h-3 text-[var(--accent-dark)]" fill="currentColor" />
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <Quote className="w-4 h-4 text-[var(--accent-dark)] opacity-30 absolute -top-1 -left-1" />
                                        <p className="text-[var(--text-muted)] text-xs leading-relaxed pl-4"
                                            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                                            {t.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
