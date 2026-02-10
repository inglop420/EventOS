'use client';

import { motion } from 'framer-motion';
import {
    TreePine, UtensilsCrossed, Car, Tent, Eye, Music, Warehouse, Wifi,
} from 'lucide-react';

const services = [
    {
        icon: TreePine,
        title: 'Jardín con Vista al Lago',
        description: 'Amplias áreas verdes con vista panorámica al Lago de Chapala para ceremonias al aire libre.',
    },
    {
        icon: Tent,
        title: 'Zona Techada y Carpa',
        description: 'Espacios cubiertos para proteger a tus invitados del clima, con opción de carpa para eventos grandes.',
    },
    {
        icon: UtensilsCrossed,
        title: 'Cocina Disponible',
        description: 'Cocina equipada para tu servicio de catering. Usa tus propios proveedores o elige de nuestros socios.',
    },
    {
        icon: Car,
        title: 'Estacionamiento Amplio',
        description: 'Estacionamiento privado con capacidad para todos tus invitados, con seguridad incluida.',
    },
    {
        icon: Eye,
        title: 'Atardeceres Espectaculares',
        description: 'El escenario perfecto para fotos inolvidables con el atardecer sobre la laguna como telón de fondo.',
    },
    {
        icon: Music,
        title: 'Sonido e Iluminación',
        description: 'Sistema de audio y pista de baile con iluminación ambiental para crear la atmósfera perfecta.',
    },
    {
        icon: Warehouse,
        title: 'Capacidad Flexible',
        description: 'Desde bodas íntimas de 50 personas hasta grandes celebraciones de 350+ invitados.',
    },
    {
        icon: Wifi,
        title: 'Conectividad Total',
        description: 'WiFi de alta velocidad para que tus invitados compartan cada momento en redes sociales.',
    },
];

export function ServicesSection() {
    return (
        <section className="py-20 px-4 relative" id="servicios">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--green-dark)]/10 to-transparent" />

            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-[var(--gold)] text-sm tracking-[0.2em] uppercase font-medium">
                        Nuestros Servicios
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                        Todo lo que necesitas para un{' '}
                        <span className="gradient-text">evento perfecto</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Un jardín diseñado para crear momentos mágicos con todas las comodidades
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
                                className="group glass rounded-2xl p-6 hover:border-[var(--gold)]/30
                  hover:bg-[var(--gold)]/5 transition-all duration-300 cursor-default"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--gold)]/20 to-transparent
                  flex items-center justify-center mb-4 group-hover:from-[var(--gold)]/30 transition-all">
                                    <Icon className="w-6 h-6 text-[var(--gold)]" />
                                </div>
                                <h3 className="font-semibold text-white mb-2 group-hover:text-[var(--gold)] transition">
                                    {s.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{s.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
