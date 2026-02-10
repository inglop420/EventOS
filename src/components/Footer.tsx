'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Instagram, Facebook, Mail } from 'lucide-react';

export function Footer({ onOpenWizard }: { onOpenWizard: () => void }) {
    return (
        <footer className="relative overflow-hidden" id="contacto">
            {/* CTA Band */}
            <div className="relative py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--green-dark)]/20 to-[var(--green-dark)]/40" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        ¿Listo para crear{' '}
                        <span className="gradient-text">tu momento mágico</span>?
                    </h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        No dejes que otro se quede con tu fecha soñada. Verifica disponibilidad ahora.
                    </p>
                    <button
                        onClick={onOpenWizard}
                        className="px-10 py-4 rounded-full text-lg font-semibold
              bg-gradient-to-r from-[var(--orange-cta)] to-[var(--orange-hover)]
              text-white hover:shadow-[0_0_40px_rgba(232,122,30,0.4)]
              transform hover:scale-105 transition-all duration-300"
                    >
                        Verificar Disponibilidad 📅
                    </button>
                </motion.div>
            </div>

            {/* Footer Content */}
            <div className="border-t border-white/10 bg-[var(--black-light)]/50">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Brand */}
                        <div>
                            <h3 className="text-xl font-bold gradient-text mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Jardín El Paraíso
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                El jardín de eventos más exclusivo de Chapala, Jalisco.
                                Donde los sueños se celebran con vista al Lago de Chapala.
                            </p>
                            <div className="flex gap-3 mt-4">
                                <a
                                    href="https://www.facebook.com/profile.php?id=100088107916315"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10
                    flex items-center justify-center hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 transition"
                                >
                                    <Facebook className="w-4 h-4 text-gray-400 hover:text-[var(--gold)]" />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10
                    flex items-center justify-center hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 transition"
                                >
                                    <Instagram className="w-4 h-4 text-gray-400 hover:text-[var(--gold)]" />
                                </a>
                                <a
                                    href="mailto:info@jardinelparaiso.com"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10
                    flex items-center justify-center hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 transition"
                                >
                                    <Mail className="w-4 h-4 text-gray-400 hover:text-[var(--gold)]" />
                                </a>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-sm font-semibold text-[var(--gold)] uppercase tracking-wider mb-4">
                                Contacto
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-[var(--gold)] mt-1 flex-shrink-0" />
                                    <span className="text-sm text-gray-400">
                                        Chapala, Jalisco, México<br />
                                        A orillas del Lago de Chapala
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                                    <a href="tel:+523312345678" className="text-sm text-gray-400 hover:text-[var(--gold)] transition">
                                        +52 33 1234 5678
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                                    <span className="text-sm text-gray-400">
                                        Visitas con cita previa · L-D
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Map embed placeholder */}
                        <div>
                            <h4 className="text-sm font-semibold text-[var(--gold)] uppercase tracking-wider mb-4">
                                Ubicación
                            </h4>
                            <div className="rounded-xl overflow-hidden border border-white/10 aspect-[4/3]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59798.94!2d-103.18!3d20.295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f5bff94c19011%3A0x93f4f23a42e2bf38!2sChapala%2C%20Jal.!5e0!3m2!1ses!2smx!4v1"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación Jardín El Paraíso"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/5 py-4">
                    <p className="text-center text-xs text-gray-600">
                        © {new Date().getFullYear()} Jardín El Paraíso. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
