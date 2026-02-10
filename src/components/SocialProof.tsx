'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
    {
        name: 'María & Carlos',
        event: 'Boda',
        text: 'Nuestra boda en El Paraíso fue mágica. La vista al lago al atardecer hizo que todo fuera perfecto. ¡Nuestros invitados aún hablan de lo hermoso que estuvo!',
        rating: 5,
        image: '/testimonial-1.jpg',
    },
    {
        name: 'Familia Rodríguez',
        event: 'XV Años',
        text: 'Los XV años de nuestra hija fueron espectaculares. El jardín decorado con luces y las áreas verdes hicieron que todo se viera como un cuento de hadas.',
        rating: 5,
        image: '/testimonial-2.jpg',
    },
    {
        name: 'Andrea & Luis',
        event: 'Boda',
        text: 'Buscamos muchos lugares y ninguno se compara con El Paraíso. El equipo nos ayudó con todo y la cocina nos permitió usar nuestro propio catering. 100% recomendado.',
        rating: 5,
        image: '/testimonial-3.jpg',
    },
    {
        name: 'Empresa TechMX',
        event: 'Evento Corporativo',
        text: 'Organizamos nuestro evento de fin de año aquí y fue un éxito total. El estacionamiento amplio y las áreas techadas facilitaron todo. Volveremos sin duda.',
        rating: 5,
        image: '/testimonial-4.jpg',
    },
];

const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop', label: 'Bodas de Ensueño' },
    { src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&h=800&fit=crop', label: 'Decoración Floral' },
    { src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=800&fit=crop', label: 'Vista al Lago' },
    { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=800&fit=crop', label: 'Jardín Iluminado' },
    { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=800&fit=crop', label: 'XV Años Mágicos' },
    { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=800&fit=crop', label: 'Espacios Amplios' },
];

export function SocialProofSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-20 px-4 relative overflow-hidden" id="galeria">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-[var(--gold)] text-sm tracking-[0.2em] uppercase font-medium">
                        Historias de Éxito
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                        Eventos que se convierten en{' '}
                        <span className="gradient-text">recuerdos eternos</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Más de 500 familias han celebrado sus momentos más importantes con nosotros
                    </p>
                </motion.div>

                {/* Instagram Stories Carousel */}
                <div className="mb-20">
                    <div ref={scrollRef} className="stories-carousel">
                        {galleryImages.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="story-card w-[200px] md:w-[260px] flex-shrink-0"
                            >
                                <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                                    {/* Gold ring border like Instagram */}
                                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[var(--gold)] via-[var(--orange-cta)] to-[var(--gold-light)] p-[2px]">
                                        <div className="w-full h-full rounded-2xl bg-[var(--black)]" />
                                    </div>
                                    <div className="relative aspect-[3/4] bg-gradient-to-br from-[var(--green-dark)] to-[var(--black)] rounded-2xl overflow-hidden m-[3px]">
                                        <img
                                            src={img.src}
                                            alt={img.label}
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <p className="text-sm font-medium text-white">{img.label}</p>
                                        </div>
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
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="glass rounded-2xl p-6 hover:border-[var(--gold)]/30 transition-all duration-300 group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center flex-shrink-0">
                                    <span className="text-[var(--black)] font-bold text-lg">
                                        {t.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-semibold text-white">{t.name}</h4>
                                        <span className="text-xs px-3 py-1 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20">
                                            {t.event}
                                        </span>
                                    </div>
                                    <div className="flex gap-1 mb-3">
                                        {Array.from({ length: t.rating }).map((_, j) => (
                                            <Star key={j} className="w-4 h-4 text-[var(--gold)]" fill="currentColor" />
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <Quote className="w-6 h-6 text-[var(--gold)]/20 absolute -top-1 -left-1" />
                                        <p className="text-gray-300 text-sm leading-relaxed pl-4">
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
