'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot, Sparkles } from 'lucide-react';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const WELCOME_MESSAGE = '¡Hola! 👋 Soy la asistente virtual de Jardín El Paraíso. Puedo ayudarte con:\n\n• 💰 Precios y paquetes\n• 📍 Ubicación y acceso\n• 🎉 Tipos de eventos\n• 📅 Disponibilidad\n\n¿En qué te puedo ayudar?';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: WELCOME_MESSAGE },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowBubble(true), 8000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;
        const userMessage = input.trim();
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL;
            if (webhookUrl && !webhookUrl.includes('your-n8n')) {
                const res = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userMessage, sessionId: 'web-' + Date.now() }),
                });
                const data = await res.json();
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: data.response || data.message || data.output || 'Disculpa, no pude procesar tu mensaje.' },
                ]);
            } else {
                const responses: Record<string, string> = {
                    precio: '💰 Nuestros paquetes van desde $25,000 MXN hasta $85,000 MXN. Incluye uso del jardín, estacionamiento y áreas comunes.',
                    ubicación: '📍 Chapala, Jalisco, a orillas del Lago de Chapala. A solo 45 minutos de Guadalajara.',
                    boda: '💒 ¡Las bodas son nuestra especialidad! Jardín con vista al lago, áreas verdes, zona techada y cocina para catering.',
                    capacidad: '👥 Desde 50 hasta 350 invitados. Áreas verdes, zona techada y opción de carpa.',
                    horario: '🕐 Lunes a Domingo. Visitas con cita previa.',
                };
                const lowerMsg = userMessage.toLowerCase();
                let reply = '¡Gracias por tu interés! 🌿\n\nPara más información:\n\n📅 Verifica disponibilidad\n📱 WhatsApp: +52 33 XXXX XXXX';
                for (const [key, value] of Object.entries(responses)) {
                    if (lowerMsg.includes(key)) { reply = value; break; }
                }
                setTimeout(() => {
                    setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
                    setIsLoading(false);
                }, 1000);
                return;
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Disculpa, hubo un error. Intenta de nuevo o contáctanos por WhatsApp.' },
            ]);
        }
        setIsLoading(false);
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="fixed bottom-28 right-6 md:bottom-6 md:right-6 z-50">
                        {showBubble && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-full right-0 mb-3 whitespace-nowrap">
                                <div className="glass rounded-full px-4 py-2 text-sm text-[var(--text-muted)] shadow-lg"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}>
                                    <Sparkles className="w-3 h-3 inline mr-2 text-[var(--accent)]" />
                                    ¿Tienes dudas? Pregúntame
                                </div>
                            </motion.div>
                        )}
                        <button
                            onClick={() => { setIsOpen(true); setShowBubble(false); }}
                            className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)]
                flex items-center justify-center pulse-gold shadow-2xl
                hover:scale-110 transition-all duration-300"
                        >
                            <MessageCircle className="w-6 h-6 text-[var(--bg)]" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[70vh]
                        glass rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-[var(--border)]"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-card)]/80 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center shadow-md">
                                    <Bot className="w-5 h-5 text-[var(--bg)]" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[var(--text)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                        Asistente El Paraíso
                                    </p>
                                    <p className="text-[10px] text-[var(--accent)] flex items-center gap-1.5 uppercase tracking-wide font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                                        En línea
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-[var(--bg)]/50 transition">
                                <X className="w-5 h-5 text-[var(--text-muted)]" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[var(--bg)]/50">
                            {messages.map((msg, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`
                                        max-w-[85%] p-3 text-sm leading-relaxed shadow-sm
                                        ${msg.role === 'user'
                                            ? 'bg-[var(--accent)] text-[var(--bg)] rounded-2xl rounded-tr-sm'
                                            : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] rounded-2xl rounded-tl-sm'}
                                    `}>
                                        <p className="whitespace-pre-line">{msg.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl rounded-tl-sm p-3 flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-[var(--accent)]" />
                                        <span className="text-xs text-[var(--text-muted)]">Escribiendo...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-md">
                            <div className="flex gap-2 relative">
                                <input
                                    type="text" value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                    placeholder="Escribe tu pregunta..."
                                    className="flex-1 pl-4 pr-12 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl
                                    focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] focus:outline-none 
                                    text-sm text-[var(--text)] placeholder:text-[var(--text-dim)] transition-all shadow-inner"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                />
                                <button
                                    onClick={sendMessage} disabled={!input.trim() || isLoading}
                                    className="absolute right-2 top-1.5 w-9 h-9 bg-[var(--accent)] rounded-lg flex items-center justify-center
                                    hover:bg-[var(--accent-light)] disabled:opacity-50 disabled:hover:bg-[var(--accent)] transition-all transform active:scale-95"
                                >
                                    <Send className="w-4 h-4 text-[var(--bg)]" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
