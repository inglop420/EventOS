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
        <section className="py-24 px-4 relative" id="servicios">
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
                        Servicios
                    </p>
                    <div className="line-accent mb-6" />
                    <h2 className="text-3xl md:text-5xl font-medium mb-4"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        Todo para un{' '}
                        <span className="gradient-text italic">evento perfecto</span>
                    </h2>
                    <p className="text-[var(--text-muted)] max-w-lg mx-auto text-sm leading-relaxed"
                        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                        Un jardín diseñado para crear momentos que trascienden
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)]">
                    {services.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                className="group bg-[var(--bg)] p-8 hover:bg-[var(--bg-card)] transition-all duration-500 cursor-default"
                            >
                                <Icon className="w-5 h-5 text-[var(--accent-dark)] mb-5 group-hover:text-[var(--accent)] transition-colors duration-500" />
                                <h3 className="text-base font-medium text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-500"
                                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem' }}>
                                    {s.title}
                                </h3>
                                <p className="text-xs text-[var(--text-dim)] leading-relaxed"
                                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
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
