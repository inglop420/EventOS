'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, ChevronLeft, ChevronRight, Calendar, Users, MessageCircle,
    PartyPopper, Heart, Briefcase, GlassWater, Check, Loader2, Sparkles,
    Package as PackageIcon, Plus, Minus
} from 'lucide-react';
import { supabase, type Package, type ServiceCatalog } from '@/lib/supabase';

type WizardData = {
    date: string;
    eventType: string;
    guests: number;
    name: string;
    phone: string;
    packageId: string | null;
    addonIds: string[];
};

const eventTypes = [
    { id: 'boda', label: 'Boda', icon: Heart, emoji: '💒' },
    { id: 'xv', label: 'XV Años', icon: PartyPopper, emoji: '👑' },
    { id: 'corporativo', label: 'Corporativo', icon: Briefcase, emoji: '🏢' },
    { id: 'social', label: 'Evento Social', icon: GlassWater, emoji: '🥂' },
];

const MONTHS_ES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const DAYS_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0 }).format(amount);
}

export default function BookingWizard({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<WizardData>({
        date: '',
        eventType: '',
        guests: 100,
        name: '',
        phone: '',
        packageId: null,
        addonIds: [],
    });
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [blockedDates, setBlockedDates] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    // Dynamic data from Supabase
    const [packages, setPackages] = useState<Package[]>([]);
    const [addons, setAddons] = useState<ServiceCatalog[]>([]);
    const [loadingCatalog, setLoadingCatalog] = useState(true);

    // Fetch blocked dates from Supabase (bookings + availability_blocks)
    useEffect(() => {
        const fetchBlockedDates = async () => {
            try {
                const { data: bookings } = await supabase
                    .from('bookings')
                    .select('date')
                    .in('status', ['pending', 'confirmed']);

                const { data: blocks } = await supabase
                    .from('availability_blocks')
                    .select('date')
                    .eq('is_full_day_block', true);

                const allBlocked = [
                    ...(bookings?.map((e) => e.date) || []),
                    ...(blocks?.map((b) => b.date) || []),
                ];
                setBlockedDates(allBlocked);
            } catch {
                // Fallback: also try legacy tables
                try {
                    const { data: events } = await supabase.from('events').select('date').in('status', ['pending', 'confirmed']);
                    const { data: blocked } = await supabase.from('blocked_dates').select('date');
                    setBlockedDates([
                        ...(events?.map((e) => e.date) || []),
                        ...(blocked?.map((b) => b.date) || []),
                    ]);
                } catch {
                    setBlockedDates([
                        formatDate(addDays(new Date(), 3)),
                        formatDate(addDays(new Date(), 7)),
                        formatDate(addDays(new Date(), 14)),
                    ]);
                }
            }
        };
        if (isOpen) fetchBlockedDates();
    }, [isOpen]);

    // Fetch packages & addons from Supabase
    useEffect(() => {
        const fetchCatalog = async () => {
            setLoadingCatalog(true);
            try {
                const { data: pkgs } = await supabase
                    .from('packages')
                    .select('*')
                    .eq('is_active', true)
                    .order('sort_order');

                const { data: services } = await supabase
                    .from('services_catalog')
                    .select('*')
                    .eq('is_active', true)
                    .eq('category', 'addon')
                    .order('sort_order');

                if (pkgs) setPackages(pkgs);
                if (services) setAddons(services);
            } catch {
                // Use hardcoded fallback if tables don't exist yet
                setPackages([
                    { id: 'fallback-1', name: 'Paquete Esencial', description: 'Jardín + zona techada', total_price: 25000, includes_services: [], event_type: 'general', max_guests: 100, is_active: true, sort_order: 1 },
                    { id: 'fallback-2', name: 'Paquete Boda Clásica', description: 'Bodas de hasta 200 personas', total_price: 45000, includes_services: [], event_type: 'boda', max_guests: 200, is_active: true, sort_order: 2 },
                    { id: 'fallback-3', name: 'Paquete Premium', description: 'Experiencia completa con coordinación', total_price: 65000, includes_services: [], event_type: 'boda', max_guests: 350, is_active: true, sort_order: 3 },
                ] as Package[]);
                setAddons([
                    { id: 'fallback-a1', name: 'Iluminación Decorativa', description: '', price: 3500, category: 'addon', is_active: true, sort_order: 1 },
                    { id: 'fallback-a2', name: 'Pista de Baile', description: '', price: 3000, category: 'addon', is_active: true, sort_order: 2 },
                    { id: 'fallback-a3', name: 'WiFi Premium', description: '', price: 1500, category: 'addon', is_active: true, sort_order: 3 },
                ] as ServiceCatalog[]);
            }
            setLoadingCatalog(false);
        };
        if (isOpen) fetchCatalog();
    }, [isOpen]);

    function addDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function formatDate(date: Date) {
        return date.toISOString().split('T')[0];
    }

    const getDaysInMonth = useCallback(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days: { date: Date; inMonth: boolean }[] = [];

        for (let i = 0; i < firstDay; i++) {
            const d = new Date(year, month, -firstDay + i + 1);
            days.push({ date: d, inMonth: false });
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ date: new Date(year, month, i), inMonth: true });
        }
        return days;
    }, [currentMonth]);

    // Filter packages by selected event type
    const filteredPackages = packages.filter(
        (p) => p.event_type === data.eventType || p.event_type === 'general'
    );

    // Calculate total
    const selectedPackage = packages.find((p) => p.id === data.packageId);
    const selectedAddons = addons.filter((a) => data.addonIds.includes(a.id));
    const totalAmount = (selectedPackage?.total_price || 0) + selectedAddons.reduce((sum, a) => sum + a.price, 0);

    const toggleAddon = (id: string) => {
        setData((prev) => ({
            ...prev,
            addonIds: prev.addonIds.includes(id)
                ? prev.addonIds.filter((x) => x !== id)
                : [...prev.addonIds, id],
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Save to Supabase bookings table
            await supabase.from('bookings').insert({
                date: data.date,
                event_type: data.eventType,
                client_name: data.name,
                phone: data.phone,
                guests: data.guests,
                package_id: data.packageId?.startsWith('fallback') ? null : data.packageId,
                addons: data.addonIds.filter((id) => !id.startsWith('fallback')),
                total_amount: totalAmount,
                paid_amount: 0,
                status: 'pending',
            });

            // Send webhook to n8n with structured payload
            const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
            if (webhookUrl) {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        client_info: {
                            name: data.name,
                            phone: data.phone,
                        },
                        selected_date: data.date,
                        event_type: data.eventType,
                        guests: data.guests,
                        package_id: data.packageId,
                        addons: data.addonIds,
                        total_amount: totalAmount,
                        source: 'landing-page-wizard',
                        timestamp: new Date().toISOString(),
                    }),
                }).catch(() => { });
            }

            setIsCompleted(true);
        } catch (err) {
            console.error('Error submitting:', err);
        }
        setIsSubmitting(false);
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const suggestedDates = (): string[] => {
        const suggestions: string[] = [];
        let d = new Date();
        d.setDate(d.getDate() + 1);
        while (suggestions.length < 3) {
            const ds = formatDate(d);
            if (!blockedDates.includes(ds) && d.getDay() !== 2) {
                suggestions.push(ds);
            }
            d.setDate(d.getDate() + 1);
        }
        return suggestions;
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                <motion.div
                    initial={{ scale: 0.9, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 30 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative glass rounded-3xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto z-10"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>

                    {/* Step Indicator — now 4 steps */}
                    <div className="step-indicator mb-6">
                        {[1, 2, 3, 4].map((s) => (
                            <div
                                key={s}
                                className={`step-dot ${s === step ? 'active' : ''} ${s < step ? 'completed' : ''}`}
                            />
                        ))}
                    </div>

                    {/* Completed State */}
                    {isCompleted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--green)] to-[var(--green-light)] flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">¡Listo! 🎉</h3>
                            <p className="text-gray-300 mb-2">
                                Nuestra asistente IA te está enviando los detalles a tu WhatsApp.
                            </p>
                            <p className="text-sm text-[var(--gold)]">
                                📱 Revisa tu WhatsApp en{' '}
                                <span className="font-bold">{data.phone}</span>
                            </p>

                            {/* Resumen con precio */}
                            <div className="mt-6 p-4 rounded-xl bg-[var(--green-dark)]/30 border border-[var(--green)]/20 text-left">
                                <p className="text-sm text-gray-400 mb-2">Resumen de tu cotización:</p>
                                <p className="text-white font-medium">
                                    {eventTypes.find((e) => e.id === data.eventType)?.emoji}{' '}
                                    {eventTypes.find((e) => e.id === data.eventType)?.label} · {data.date} · {data.guests} invitados
                                </p>
                                {selectedPackage && (
                                    <p className="text-sm text-gray-300 mt-1">📦 {selectedPackage.name}</p>
                                )}
                                {selectedAddons.length > 0 && (
                                    <p className="text-sm text-gray-300 mt-1">
                                        ➕ {selectedAddons.map((a) => a.name).join(', ')}
                                    </p>
                                )}
                                <p className="text-[var(--gold)] font-bold text-lg mt-2">
                                    Total estimado: {formatCurrency(totalAmount)}
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setIsCompleted(false);
                                    setStep(1);
                                    setData({ date: '', eventType: '', guests: 100, name: '', phone: '', packageId: null, addonIds: [] });
                                    onClose();
                                }}
                                className="mt-6 px-6 py-3 rounded-full bg-[var(--gold)] text-[var(--black)] font-semibold hover:bg-[var(--gold-light)] transition"
                            >
                                Cerrar
                            </button>
                        </motion.div>
                    ) : (
                        <>
                            {/* Step 1: Calendar */}
                            {step === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <Calendar className="w-5 h-5 text-[var(--gold)]" />
                                        <h3 className="text-xl font-bold">¿Cuándo es tu evento?</h3>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-6">
                                        Las fechas en rojo ya están reservadas
                                    </p>

                                    <div className="flex items-center justify-between mb-4">
                                        <button
                                            onClick={() => {
                                                const prev = new Date(currentMonth);
                                                prev.setMonth(prev.getMonth() - 1);
                                                setCurrentMonth(prev);
                                            }}
                                            className="p-2 rounded-lg hover:bg-white/10 transition"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <span className="font-semibold text-[var(--gold)]">
                                            {MONTHS_ES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                        </span>
                                        <button
                                            onClick={() => {
                                                const next = new Date(currentMonth);
                                                next.setMonth(next.getMonth() + 1);
                                                setCurrentMonth(next);
                                            }}
                                            className="p-2 rounded-lg hover:bg-white/10 transition"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="calendar-grid mb-2">
                                        {DAYS_ES.map((d) => (
                                            <div key={d} className="text-center text-xs text-gray-500 font-medium py-1">
                                                {d}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="calendar-grid">
                                        {getDaysInMonth().map((day, i) => {
                                            const ds = formatDate(day.date);
                                            const isBlocked = blockedDates.includes(ds);
                                            const isPast = day.date < today;
                                            const isSelected = ds === data.date;
                                            const isToday = ds === formatDate(today);

                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        if (!isBlocked && !isPast && day.inMonth) {
                                                            setData((prev) => ({ ...prev, date: ds }));
                                                        }
                                                    }}
                                                    disabled={isBlocked || isPast || !day.inMonth}
                                                    className={`calendar-day ${!day.inMonth ? 'disabled' : ''} ${isBlocked ? 'blocked' : ''
                                                        } ${isPast && day.inMonth ? 'disabled' : ''} ${isSelected ? 'selected' : ''
                                                        } ${isToday ? 'today' : ''}`}
                                                >
                                                    {day.date.getDate()}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-4 p-3 rounded-xl bg-[var(--gold)]/5 border border-[var(--gold)]/10">
                                        <p className="text-xs text-[var(--gold)] font-medium mb-2 flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" /> Fechas sugeridas disponibles:
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            {suggestedDates().map((d) => (
                                                <button
                                                    key={d}
                                                    onClick={() => setData((prev) => ({ ...prev, date: d }))}
                                                    className={`text-xs px-3 py-1.5 rounded-full transition ${data.date === d
                                                        ? 'bg-[var(--gold)] text-[var(--black)] font-semibold'
                                                        : 'bg-white/5 text-gray-300 hover:bg-[var(--gold)]/20'
                                                        }`}
                                                >
                                                    {new Date(d + 'T12:00:00').toLocaleDateString('es-MX', {
                                                        weekday: 'short',
                                                        day: 'numeric',
                                                        month: 'short',
                                                    })}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => data.date && setStep(2)}
                                        disabled={!data.date}
                                        className="w-full mt-6 py-3 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[var(--black)] font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:from-[var(--gold-light)] hover:to-[var(--gold)] transition-all"
                                    >
                                        Continuar →
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 2: Event Type & Guests */}
                            {step === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-4 transition"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Cambiar fecha
                                    </button>

                                    <h3 className="text-xl font-bold mb-1">¿Qué tipo de evento?</h3>
                                    <p className="text-sm text-gray-400 mb-6">
                                        Esto nos ayuda a sugerirte el paquete ideal
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        {eventTypes.map((type) => {
                                            const Icon = type.icon;
                                            return (
                                                <button
                                                    key={type.id}
                                                    onClick={() => setData((prev) => ({ ...prev, eventType: type.id, packageId: null }))}
                                                    className={`p-4 rounded-xl border transition-all text-left ${data.eventType === type.id
                                                        ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                                                        : 'border-white/10 hover:border-white/30 bg-white/5'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-2xl">{type.emoji}</span>
                                                        <Icon className={`w-5 h-5 ${data.eventType === type.id ? 'text-[var(--gold)]' : 'text-gray-400'
                                                            }`} />
                                                    </div>
                                                    <p className={`font-medium ${data.eventType === type.id ? 'text-[var(--gold)]' : 'text-white'
                                                        }`}>
                                                        {type.label}
                                                    </p>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Guest count */}
                                    <div className="mb-6">
                                        <label className="flex items-center gap-2 text-sm text-gray-300 mb-3">
                                            <Users className="w-4 h-4 text-[var(--gold)]" />
                                            Invitados: <span className="text-[var(--gold)] font-bold text-lg">{data.guests}</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="20"
                                            max="500"
                                            step="10"
                                            value={data.guests}
                                            onChange={(e) => setData((prev) => ({ ...prev, guests: parseInt(e.target.value) }))}
                                            className="w-full h-2 rounded-full appearance-none cursor-pointer
                        bg-white/10 [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--gold)]
                        [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(200,169,81,0.5)]
                        [&::-webkit-slider-thumb]:cursor-pointer"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>20</span>
                                            <span>250</span>
                                            <span>500</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => data.eventType && setStep(3)}
                                        disabled={!data.eventType}
                                        className="w-full py-3 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[var(--black)] font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:from-[var(--gold-light)] hover:to-[var(--gold)] transition-all"
                                    >
                                        Continuar →
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 3: Package & Addons Selection */}
                            {step === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <button
                                        onClick={() => setStep(2)}
                                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-4 transition"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Atrás
                                    </button>

                                    <div className="flex items-center gap-2 mb-1">
                                        <PackageIcon className="w-5 h-5 text-[var(--gold)]" />
                                        <h3 className="text-xl font-bold">Elige tu paquete</h3>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4">
                                        Selecciona un paquete y personalízalo con extras
                                    </p>

                                    {loadingCatalog ? (
                                        <div className="text-center py-8 text-gray-500">
                                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                            Cargando paquetes...
                                        </div>
                                    ) : (
                                        <>
                                            {/* Packages */}
                                            <div className="space-y-3 mb-6">
                                                {filteredPackages.map((pkg) => (
                                                    <button
                                                        key={pkg.id}
                                                        onClick={() => setData((prev) => ({ ...prev, packageId: pkg.id }))}
                                                        className={`w-full p-4 rounded-xl border transition-all text-left ${data.packageId === pkg.id
                                                            ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                                                            : 'border-white/10 hover:border-white/30 bg-white/5'
                                                            }`}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1">
                                                                <p className={`font-semibold ${data.packageId === pkg.id ? 'text-[var(--gold)]' : 'text-white'}`}>
                                                                    📦 {pkg.name}
                                                                </p>
                                                                {pkg.description && (
                                                                    <p className="text-xs text-gray-400 mt-1">{pkg.description}</p>
                                                                )}
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    Hasta {pkg.max_guests} invitados
                                                                </p>
                                                            </div>
                                                            <span className={`text-lg font-bold whitespace-nowrap ml-3 ${data.packageId === pkg.id ? 'text-[var(--gold)]' : 'text-white'
                                                                }`}>
                                                                {formatCurrency(pkg.total_price)}
                                                            </span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Addons */}
                                            {addons.length > 0 && (
                                                <div className="mb-6">
                                                    <p className="text-sm text-gray-300 font-medium mb-3 flex items-center gap-1">
                                                        <Plus className="w-4 h-4 text-[var(--gold)]" /> Extras opcionales:
                                                    </p>
                                                    <div className="space-y-2">
                                                        {addons.map((addon) => {
                                                            const isSelected = data.addonIds.includes(addon.id);
                                                            return (
                                                                <button
                                                                    key={addon.id}
                                                                    onClick={() => toggleAddon(addon.id)}
                                                                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${isSelected
                                                                        ? 'border-[var(--green-light)] bg-[var(--green)]/10'
                                                                        : 'border-white/10 hover:border-white/20 bg-white/5'
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${isSelected
                                                                            ? 'bg-[var(--green-light)] border-[var(--green-light)]'
                                                                            : 'border-white/20'
                                                                            }`}>
                                                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                                                        </div>
                                                                        <span className="text-sm text-white">{addon.name}</span>
                                                                    </div>
                                                                    <span className="text-sm text-gray-400">
                                                                        +{formatCurrency(addon.price)}
                                                                    </span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Running total */}
                                            {data.packageId && (
                                                <div className="p-3 rounded-xl bg-[var(--gold)]/5 border border-[var(--gold)]/10 mb-4">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-300">Total estimado:</span>
                                                        <span className="text-xl font-bold text-[var(--gold)]">
                                                            {formatCurrency(totalAmount)}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <button
                                        onClick={() => data.packageId && setStep(4)}
                                        disabled={!data.packageId}
                                        className="w-full py-3 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[var(--black)] font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:from-[var(--gold-light)] hover:to-[var(--gold)] transition-all"
                                    >
                                        Continuar →
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 4: Contact Info */}
                            {step === 4 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <button
                                        onClick={() => setStep(3)}
                                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-4 transition"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Atrás
                                    </button>

                                    <div className="flex items-center gap-2 mb-1">
                                        <MessageCircle className="w-5 h-5 text-[var(--gold)]" />
                                        <h3 className="text-xl font-bold">¡Último paso!</h3>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-6">
                                        Para enviarte tu cotización de {formatCurrency(totalAmount)}, ¿a qué WhatsApp te la mandamos?
                                    </p>

                                    {/* Summary */}
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                                        <p className="text-xs text-gray-400 mb-2">Tu evento:</p>
                                        <p className="text-white font-medium">
                                            {eventTypes.find((e) => e.id === data.eventType)?.emoji}{' '}
                                            {eventTypes.find((e) => e.id === data.eventType)?.label} ·{' '}
                                            {new Date(data.date + 'T12:00:00').toLocaleDateString('es-MX', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}{' '}
                                            · {data.guests} invitados
                                        </p>
                                        {selectedPackage && (
                                            <p className="text-sm text-[var(--gold)] mt-1">
                                                📦 {selectedPackage.name} — {formatCurrency(selectedPackage.total_price)}
                                            </p>
                                        )}
                                        {selectedAddons.length > 0 && (
                                            <p className="text-xs text-gray-400 mt-1">
                                                + {selectedAddons.map((a) => a.name).join(', ')} ({formatCurrency(selectedAddons.reduce((s, a) => s + a.price, 0))})
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label className="text-sm text-gray-400 mb-1 block">Tu nombre</label>
                                            <input
                                                type="text"
                                                placeholder="Ej: María García"
                                                value={data.name}
                                                onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                          focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30
                          text-white placeholder:text-gray-600 transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 mb-1 block">WhatsApp</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                                    +52
                                                </span>
                                                <input
                                                    type="tel"
                                                    placeholder="33 1234 5678"
                                                    value={data.phone}
                                                    onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
                                                    className="w-full pl-14 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                            focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/30
                            text-white placeholder:text-gray-600 transition"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={!data.name || !data.phone || isSubmitting}
                                        className="w-full py-3 rounded-full bg-gradient-to-r from-[var(--orange-cta)] to-[var(--orange-hover)] text-white font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(232,122,30,0.4)] transition-all flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Enviando...
                                            </>
                                        ) : (
                                            <>Recibir mi cotización 📲</>
                                        )}
                                    </button>

                                    <p className="text-center text-xs text-gray-500 mt-3">
                                        🔒 Tu información está segura. No compartimos tus datos.
                                    </p>
                                </motion.div>
                            )}
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
