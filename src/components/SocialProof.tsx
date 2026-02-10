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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-sm tracking-widest uppercase text-[var(--accent-dark)] mb-2"
                        style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Galería & Testimonios
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        Momentos que se convierten en{' '}
                        <span className="gradient-text">recuerdos eternos</span>
                    </h2>
                    <p className="text-[var(--text-muted)] max-w-lg mx-auto"
                        style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Más de 500 familias han celebrado con nosotros
                    </p>
                </motion.div>

                {/* Gallery Carousel */}
                <div className="mb-20">
                    <div ref={scrollRef} className="stories-carousel py-4">
                        {galleryImages.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="story-card w-[220px] md:w-[280px] flex-shrink-0 group cursor-pointer"
                            >
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-[var(--border)]
                  group-hover:shadow-[0_0_30px_rgba(201,185,154,0.3)] transition-all duration-500">
                                    <img
                                        src={img.src}
                                        alt={img.label}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/90 via-transparent to-transparent opacity-80" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="w-full h-[1px] bg-[var(--accent)]/50 mb-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                        <p className="text-sm tracking-widest uppercase text-[var(--accent-light)] font-medium"
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
                <div className="grid md:grid-cols-2 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass rounded-xl p-8 relative hover:border-[var(--accent)]/30 transition-colors"
                        >
                            <Quote className="w-8 h-8 text-[var(--accent)]/20 absolute top-6 right-6" />
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)]
                    flex items-center justify-center flex-shrink-0 shadow-lg text-[var(--bg)] font-bold text-lg"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[var(--text)]"
                                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                        {t.name}
                                    </h4>
                                    <span className="text-xs uppercase tracking-wider text-[var(--text-dim)]"
                                        style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        {t.event}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-1 mb-3">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star key={j} className="w-4 h-4 text-[var(--accent)] fill-[var(--accent)]" />
                                ))}
                            </div>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed italic"
                                style={{ fontFamily: "'Outfit', sans-serif" }}>
                                "{t.text}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
