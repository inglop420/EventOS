'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Instagram, Facebook, Mail } from 'lucide-react';

export function Footer({ onOpenWizard }: { onOpenWizard: () => void }) {
    return (
        <footer className="relative overflow-hidden" id="contacto">
            {/* CTA Band */}
            <div className="relative py-24 px-4 bg-[var(--bg-light)]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative max-w-3xl mx-auto text-center z-10"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        ¿Listo para crear{' '}
                        <span className="gradient-text">tu momento</span>?
                    </h2>
                    <p className="text-[var(--text-muted)] mb-10 text-lg"
                        style={{ fontFamily: "'Outfit', sans-serif" }}>
                        No dejes que otro se quede con tu fecha soñada.
                    </p>
                    <button
                        onClick={onOpenWizard}
                        className="px-10 py-4 rounded-full text-lg font-semibold tracking-wide
              bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]
              text-[var(--bg)] hover:shadow-[0_0_30px_rgba(201,185,154,0.4)]
              transform hover:scale-105 transition-all duration-300"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Verificar Disponibilidad
                    </button>
                </motion.div>

                {/* Background glow for CTA */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-[var(--accent)]/5 blur-3xl rounded-full pointer-events-none" />
            </div>

            {/* Footer Content */}
            <div className="border-t border-[var(--border)] bg-[var(--bg)]">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Brand */}
                        <div>
                            <h3 className="text-2xl font-bold gradient-text mb-4"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                Jardín El Paraíso
                            </h3>
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6"
                                style={{ fontFamily: "'Outfit', sans-serif" }}>
                                El jardín de eventos más exclusivo de Chapala, Jalisco.
                                Donde los sueños se celebran con vista al Lago de Chapala.
                            </p>
                            <div className="flex gap-4">
                                {[
                                    { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100088107916315' },
                                    { Icon: Instagram, href: '#' },
                                    { Icon: Mail, href: 'mailto:info@jardinelparaiso.com' },
                                ].map(({ Icon, href }, i) => (
                                    <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)]
                                        flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--bg)]
                                        text-[var(--text-muted)] transition-all duration-300">
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-sm font-bold tracking-widest uppercase text-[var(--text)] mb-6"
                                style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Contacto
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-[var(--text-muted)]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        Chapala, Jalisco, México<br />A orillas del Lago de Chapala
                                    </span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Phone className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                                    <a href="tel:+523312345678" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition"
                                        style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        +52 33 1234 5678
                                    </a>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Clock className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                                    <span className="text-sm text-[var(--text-muted)]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        Visitas con cita previa · L-D
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Map */}
                        <div>
                            <h4 className="text-sm font-bold tracking-widest uppercase text-[var(--text)] mb-6"
                                style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Ubicación
                            </h4>
                            <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-lg aspect-[4/3] group relative">
                                <div className="absolute inset-0 bg-[var(--accent)]/10 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.0624796355815!2d-103.18266448777!3d20.297590500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f41362b26fca7%3A0xf66e8f263dcc3871!2sJard%C3%ADn%20EL%20PARAISO!5e0!3m2!1ses-419!2smx!4v1707504000000!5m2!1ses-419!2smx"
                                    width="100%" height="100%"
                                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.2)' }}
                                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación Jardín El Paraíso"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[var(--border)] py-8 bg-[var(--bg-card)]">
                    <p className="text-center text-xs text-[var(--text-dim)] tracking-wider"
                        style={{ fontFamily: "'Outfit', sans-serif" }}>
                        © {new Date().getFullYear()} Jardín El Paraíso. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
