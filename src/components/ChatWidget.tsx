'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot, Sparkles } from 'lucide-react';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const WELCOME_MESSAGE = '¡Hola! 👋 Soy la asistente virtual de Jardín El Paraíso. Puedo ayudarte con información sobre:\n\n• 💰 Precios y paquetes\n• 📍 Ubicación y acceso\n• 🎉 Tipos de eventos\n• 📅 Disponibilidad\n\n¿En qué te puedo ayudar?';

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
                    body: JSON.stringify({
                        message: userMessage,
                        sessionId: 'web-' + Date.now(),
                    }),
                });
                const data = await res.json();
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: data.response || data.message || data.output || 'Disculpa, no pude procesar tu mensaje. ¿Podrías intentar de nuevo?' },
                ]);
            } else {
                // Fallback responses
                const responses: Record<string, string> = {
                    precio: '💰 Nuestros paquetes van desde $25,000 MXN para eventos íntimos hasta $85,000 MXN para grandes celebraciones. El precio incluye uso del jardín, estacionamiento y áreas comunes. ¡Agenda una visita para cotización personalizada!',
                    ubicación: '📍 Estamos ubicados en Chapala, Jalisco, a orillas del Lago de Chapala. A solo 45 minutos de Guadalajara. Contamos con estacionamiento amplio para tus invitados.',
                    boda: '💒 ¡Las bodas son nuestra especialidad! Ofrecemos un jardín con vista al lago, áreas verdes, zona techada, cocina para catering, y capacidad flexible. ¿Te gustaría agendar una visita?',
                    capacidad: '👥 Tenemos capacidad desde 50 hasta 350 invitados. Contamos con áreas verdes al aire libre, zona techada y opción de carpa para eventos grandes.',
                    horario: '🕐 Atendemos de Lunes a Domingo. Las visitas al jardín se agendan con cita previa. Los eventos se realizan principalmente viernes, sábados y domingos.',
                };

                const lowerMsg = userMessage.toLowerCase();
                let reply = '¡Gracias por tu interés! 🌿\n\nPara darte información más detallada, te invito a:\n\n📅 Verificar disponibilidad con nuestro calendario\n📱 Contactarnos por WhatsApp: +52 33 XXXX XXXX\n\n¿Hay algo más en lo que pueda ayudarte?';

                for (const [key, value] of Object.entries(responses)) {
                    if (lowerMsg.includes(key)) {
                        reply = value;
                        break;
                    }
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
                { role: 'assistant', content: 'Disculpa, hubo un error. Por favor intenta de nuevo o contáctanos por WhatsApp.' },
            ]);
        }
        setIsLoading(false);
    };

    return (
        <>
            {/* Floating Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        {/* Tooltip bubble */}
                        {showBubble && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="absolute bottom-full right-0 mb-3 whitespace-nowrap"
                            >
                                <div className="glass rounded-xl px-4 py-2 text-sm text-white">
                                    <Sparkles className="w-3 h-3 inline mr-1 text-[var(--accent)]" />
                                    ¿Tienes dudas? ¡Pregúntame!
                                </div>
                                <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/10" />
                            </motion.div>
                        )}
                        <button
                            onClick={() => { setIsOpen(true); setShowBubble(false); }}
                            className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)]
                flex items-center justify-center shadow-lg pulse-gold
                hover:from-[var(--accent-light)] hover:to-[var(--accent)] transition-all"
                        >
                            <MessageCircle className="w-6 h-6 text-[var(--black)]" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[70vh]
              glass rounded-2xl overflow-hidden flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[var(--green-dark)] to-[var(--black)]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-[var(--black)]" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white"
                                        style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        Asistente El Paraíso
                                    </p>
                                    <p className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                        En línea
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-white/10 transition">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                                        <p className="text-sm whitespace-pre-line">{msg.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="chat-bubble-ai flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-[var(--accent)]" />
                                        <span className="text-sm text-gray-400">Escribiendo...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="px-4 py-3 border-t border-white/10">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                    placeholder="Escribe tu pregunta..."
                                    className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10
                    focus:border-[var(--accent)] focus:outline-none text-sm text-white
                    placeholder:text-gray-500 transition"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center
                    hover:bg-[var(--accent-light)] disabled:opacity-30 transition"
                                >
                                    <Send className="w-4 h-4 text-[var(--black)]" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
