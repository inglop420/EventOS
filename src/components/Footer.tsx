'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Instagram, Facebook, Mail } from 'lucide-react';

export function Footer({ onOpenWizard }: { onOpenWizard: () => void }) {
    return (
        <footer className="relative overflow-hidden" id="contacto">
            {/* CTA Band */}
            <div className="relative py-24 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative max-w-2xl mx-auto text-center"
                >
                    <div className="line-accent mb-8" />
                    <h2 className="text-3xl md:text-5xl font-medium mb-4"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        ¿Listo para crear{' '}
                        <span className="gradient-text italic">tu momento</span>?
                    </h2>
                    <p className="text-[var(--text-muted)] mb-10 text-sm leading-relaxed"
                        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                        No dejes que otro se quede con tu fecha soñada.
                    </p>
                    <button
                        onClick={onOpenWizard}
                        className="px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-medium
              bg-[var(--accent)] text-[var(--bg)]
              hover:bg-[var(--accent-light)] transition-all duration-300"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Verificar Disponibilidad
                    </button>
                </motion.div>
            </div>

            {/* Footer Content */}
            <div className="border-t border-[var(--border)] bg-[var(--bg-light)]">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Brand */}
                        <div>
                            <h3 className="text-lg font-medium text-[var(--accent)] mb-3"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                Jardín El Paraíso
                            </h3>
                            <p className="text-xs text-[var(--text-dim)] leading-relaxed"
                                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                                El jardín de eventos más exclusivo de Chapala, Jalisco.
                                Donde los sueños se celebran con vista al Lago de Chapala.
                            </p>
                            <div className="flex gap-3 mt-4">
                                {[
                                    { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100088107916315' },
                                    { Icon: Instagram, href: '#' },
                                    { Icon: Mail, href: 'mailto:info@jardinelparaiso.com' },
                                ].map(({ Icon, href }, i) => (
                                    <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-full bg-transparent border border-[var(--border)]
                                        flex items-center justify-center hover:border-[var(--accent)] transition-colors duration-300">
                                        <Icon className="w-3.5 h-3.5 text-[var(--text-dim)]" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-[10px] tracking-[0.2em] uppercase text-[var(--accent-dark)] mb-4"
                                style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Contacto
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-dark)] mt-0.5 flex-shrink-0" />
                                    <span className="text-xs text-[var(--text-dim)]" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                                        Chapala, Jalisco, México<br />A orillas del Lago de Chapala
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="w-3.5 h-3.5 text-[var(--accent-dark)] flex-shrink-0" />
                                    <a href="tel:+523312345678" className="text-xs text-[var(--text-dim)] hover:text-[var(--accent)] transition"
                                        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                                        +52 33 1234 5678
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Clock className="w-3.5 h-3.5 text-[var(--accent-dark)] flex-shrink-0" />
                                    <span className="text-xs text-[var(--text-dim)]" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                                        Visitas con cita previa · L-D
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Map */}
                        <div>
                            <h4 className="text-[10px] tracking-[0.2em] uppercase text-[var(--accent-dark)] mb-4"
                                style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Ubicación
                            </h4>
                            <div className="overflow-hidden border border-[var(--border)] aspect-[4/3]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59798.94!2d-103.18!3d20.295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f5bff94c19011%3A0x93f4f23a42e2bf38!2sChapala%2C%20Jal.!5e0!3m2!1ses!2smx!4v1"
                                    width="100%" height="100%"
                                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación Jardín El Paraíso"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[var(--border)] py-4">
                    <p className="text-center text-[10px] text-[var(--text-dim)] tracking-wider"
                        style={{ fontFamily: "'Outfit', sans-serif" }}>
                        © {new Date().getFullYear()} Jardín El Paraíso. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
