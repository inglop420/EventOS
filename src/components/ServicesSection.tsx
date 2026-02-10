'use client';

import { motion } from 'framer-motion';
import {
    TreePine, UtensilsCrossed, Car, Tent, Eye, Music, Warehouse, Wifi,
} from 'lucide-react';

const services = [
    { icon: TreePine, title: 'Vista al Lago', description: 'Amplias áreas verdes con vista panorámica al Lago de Chapala para ceremonias al aire libre.' },
    { icon: Tent, title: 'Zona Techada', description: 'Espacios cubiertos para proteger a tus invitados, con opción de carpa para eventos grandes.' },
    { icon: UtensilsCrossed, title: 'Cocina Equipada', description: 'Cocina disponible para tu catering. Usa tus propios proveedores o elige de nuestros socios.' },
    { icon: Car, title: 'Estacionamiento', description: 'Estacionamiento privado con capacidad para todos tus invitados, con seguridad incluida.' },
    { icon: Eye, title: 'Atardeceres', description: 'El escenario perfecto para fotos inolvidables con el atardecer sobre la laguna.' },
    { icon: Music, title: 'Sonido e Iluminación', description: 'Sistema de audio y pista de baile con iluminación ambiental para la atmósfera perfecta.' },
    { icon: Warehouse, title: 'Capacidad Flexible', description: 'Desde bodas íntimas de 50 personas hasta grandes celebraciones de 350+ invitados.' },
    { icon: Wifi, title: 'Conectividad', description: 'WiFi de alta velocidad para que tus invitados compartan cada momento en redes sociales.' },
];

export function ServicesSection() {
    return (
        <section className="py-20 px-4 relative" id="servicios">
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
                        Servicios
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        Todo para un{' '}
                        <span className="gradient-text">evento perfecto</span>
                    </h2>
                    <p className="text-[var(--text-muted)] max-w-lg mx-auto"
                        style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Un jardín diseñado para crear momentos que trascienden
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="group glass rounded-xl p-6 hover:border-[var(--accent)]/30 transition-all duration-300
                                    hover:shadow-[0_0_20px_rgba(201,185,154,0.08)]"
                            >
                                <div className="w-12 h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4
                                    group-hover:bg-[var(--accent)]/20 transition-colors">
                                    <Icon className="w-6 h-6 text-[var(--accent)]" />
                                </div>
                                <h3 className="text-lg font-semibold text-[var(--text)] mb-2"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                    {s.title}
                                </h3>
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}>
                                    {s.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
