'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lock, LogOut, Calendar, Users, Phone, ChevronRight, ChevronLeft,
    ExternalLink, Eye, CalendarDays, Plus, X, Check, DollarSign,
    Pencil, Trash2, Save, Loader2, Ban, Package
} from 'lucide-react';
import { supabase, type Booking, type ServiceCatalog, type AvailabilityBlock } from '@/lib/supabase';

const ADMIN_PASSWORD = 'paraiso2024';

const MONTHS_ES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

type AdminTab = 'leads' | 'calendar' | 'precios' | 'paquetes';

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0 }).format(amount);
}

// ─────────────────────── Main Component ───────────────────────

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<AdminTab>('leads');

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
            localStorage.setItem('admin_auth', 'true');
        } else {
            setError('Contraseña incorrecta');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('admin_auth') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // ─── Login screen ───
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--black)]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-2xl p-8 w-full max-w-sm"
                >
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-[var(--black)]" />
                        </div>
                        <h1 className="text-xl font-bold gradient-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            Panel de Administración
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">Jardín El Paraíso</p>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            placeholder="Contraseña"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                focus:border-[var(--gold)] focus:outline-none text-white placeholder:text-gray-600"
                        />
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button
                            onClick={handleLogin}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)]
                text-[var(--black)] font-semibold hover:from-[var(--gold-light)] hover:to-[var(--gold)] transition-all"
                        >
                            Entrar
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--black)] text-white">
            {/* Header */}
            <header className="glass border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
                <div>
                    <h1 className="text-lg font-bold gradient-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        El Paraíso Admin
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <a href="/" className="p-2 rounded-lg hover:bg-white/10 transition flex items-center gap-1 text-sm text-gray-400">
                        <Eye className="w-4 h-4" /> Ver sitio
                    </a>
                    <button
                        onClick={() => {
                            localStorage.removeItem('admin_auth');
                            setIsAuthenticated(false);
                        }}
                        className="p-2 rounded-lg hover:bg-white/10 transition"
                    >
                        <LogOut className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </header>

            {/* Tabs */}
            <div className="px-4 pt-4 flex gap-2 overflow-x-auto">
                <TabButton active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} icon={<Users className="w-4 h-4" />} label="Oportunidades" />
                <TabButton active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} icon={<CalendarDays className="w-4 h-4" />} label="Calendario" />
                <TabButton active={activeTab === 'precios'} onClick={() => setActiveTab('precios')} icon={<DollarSign className="w-4 h-4" />} label="Precios" />
                <TabButton active={activeTab === 'paquetes'} onClick={() => setActiveTab('paquetes')} icon={<Package className="w-4 h-4" />} label="Paquetes" />
            </div>

            {/* Content */}
            <div className="py-4 md:px-4">
                {activeTab === 'leads' && <LeadsTab />}
                {activeTab === 'calendar' && <CalendarTab />}
                {activeTab === 'precios' && <PreciosTab />}
                {activeTab === 'paquetes' && <PackagesTab />}
            </div>
        </div>
    );
}

// ─────────────────────── Tab Button ───────────────────────

function TabButton({ active, onClick, icon, label }: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${active
                ? 'bg-[var(--gold)] text-[var(--black)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
        >
            {icon}
            {label}
        </button>
    );
}

// ─────────────────────── Leads Tab ───────────────────────

function LeadsTab() {
    const [leads, setLeads] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setLeads(data);
            } else {
                // Try legacy table
                const { data: legacyData } = await supabase
                    .from('events')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (legacyData) {
                    setLeads(legacyData.map((e) => ({
                        ...e,
                        package_id: null,
                        addons: [],
                        total_amount: 0,
                        paid_amount: 0,
                    })));
                } else {
                    setLeads(getDemoLeads());
                }
            }
        } catch {
            setLeads(getDemoLeads());
        }
        setLoading(false);
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await supabase.from('bookings').update({ status }).eq('id', id);
        } catch {
            try { await supabase.from('events').update({ status }).eq('id', id); } catch { /* noop */ }
        }
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: status as Booking['status'] } : l)));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending': return '⏳ Pendiente';
            case 'confirmed': return '✅ Confirmado';
            case 'cancelled': return '❌ Cancelado';
            case 'completed': return '🏁 Completado';
            default: return status;
        }
    };

    const getEventEmoji = (type: string) => {
        switch (type) {
            case 'boda': return '💒';
            case 'xv': return '👑';
            case 'corporativo': return '🏢';
            case 'social': return '🥂';
            default: return '🎉';
        }
    };

    if (loading) return <div className="text-center py-12 text-gray-500">Cargando...</div>;

    return (
        <div className="space-y-3 px-3 md:px-0">
            {leads.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No hay oportunidades aún</div>
            ) : (
                leads.map((lead) => (
                    <motion.div
                        key={lead.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-xl p-4"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="font-semibold text-white flex items-center gap-2">
                                    {getEventEmoji(lead.event_type)} {lead.client_name}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    <Calendar className="w-3 h-3 inline mr-1" />
                                    {new Date(lead.date + 'T12:00:00').toLocaleDateString('es-MX', {
                                        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                                    })}
                                </p>
                            </div>
                            <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(lead.status)}`}>
                                {getStatusLabel(lead.status)}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                            <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" /> {lead.guests} invitados
                            </span>
                            <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" /> {lead.phone}
                            </span>
                        </div>

                        {/* Financial info */}
                        {lead.total_amount > 0 && (
                            <div className="flex items-center gap-3 text-sm mb-3 p-2 rounded-lg bg-white/5">
                                <span className="text-[var(--gold)] font-medium">
                                    💰 {formatCurrency(lead.total_amount)}
                                </span>
                                {lead.paid_amount > 0 && (
                                    <span className="text-green-400 text-xs">
                                        Pagado: {formatCurrency(lead.paid_amount)}
                                    </span>
                                )}
                                {(lead.balance_due ?? (lead.total_amount - lead.paid_amount)) > 0 && (
                                    <span className="text-yellow-400 text-xs">
                                        Saldo: {formatCurrency(lead.balance_due ?? (lead.total_amount - lead.paid_amount))}
                                    </span>
                                )}
                            </div>
                        )}

                        <div className="flex gap-2 flex-wrap">
                            <a
                                href={`https://wa.me/52${lead.phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600/20 text-green-400
                        text-sm hover:bg-green-600/30 transition border border-green-600/30"
                            >
                                <ExternalLink className="w-3 h-3" />
                                WhatsApp
                                <ChevronRight className="w-3 h-3" />
                            </a>
                            {lead.status === 'pending' && (
                                <>
                                    <button
                                        onClick={() => updateStatus(lead.id!, 'confirmed')}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--gold)]/10
                            text-[var(--gold)] text-sm hover:bg-[var(--gold)]/20 transition border border-[var(--gold)]/20"
                                    >
                                        <Check className="w-3 h-3" /> Confirmar
                                    </button>
                                    <button
                                        onClick={() => updateStatus(lead.id!, 'cancelled')}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10
                            text-red-400 text-sm hover:bg-red-500/20 transition border border-red-500/20"
                                    >
                                        <X className="w-3 h-3" /> Cancelar
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                ))
            )}
        </div>
    );
}

// ─────────────────────── Calendar Tab ───────────────────────

function CalendarTab() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [bookedDates, setBookedDates] = useState<Record<string, Booking>>({});
    const [blockedDates, setBlockedDates] = useState<Record<string, AvailabilityBlock>>({});
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [blockReason, setBlockReason] = useState('');
    const [saving, setSaving] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const { data: bookings } = await supabase
                .from('bookings')
                .select('*')
                .in('status', ['pending', 'confirmed']);

            const { data: blocks } = await supabase
                .from('availability_blocks')
                .select('*');

            const bookingsMap: Record<string, Booking> = {};
            bookings?.forEach((b) => { bookingsMap[b.date] = b; });

            const blocksMap: Record<string, AvailabilityBlock> = {};
            blocks?.forEach((b) => { blocksMap[b.date] = b; });

            setBookedDates(bookingsMap);
            setBlockedDates(blocksMap);
        } catch {
            // Try legacy tables
            try {
                const { data: events } = await supabase.from('events').select('*').in('status', ['pending', 'confirmed']);
                const bookingsMap: Record<string, Booking> = {};
                events?.forEach((e) => { bookingsMap[e.date] = { ...e, package_id: null, addons: [], total_amount: 0, paid_amount: 0 }; });
                setBookedDates(bookingsMap);

                const { data: blocked } = await supabase.from('blocked_dates').select('*');
                const blocksMap: Record<string, AvailabilityBlock> = {};
                blocked?.forEach((b) => { blocksMap[b.date] = { ...b, is_full_day_block: true }; });
                setBlockedDates(blocksMap);
            } catch { /* noop */ }
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleDayClick = (dateStr: string) => {
        if (bookedDates[dateStr]) return; // Can't block a booked date
        if (blockedDates[dateStr]) {
            // Unblock
            handleUnblock(dateStr);
            return;
        }
        setSelectedDate(dateStr);
        setBlockReason('');
        setShowBlockModal(true);
    };

    const handleBlock = async () => {
        if (!selectedDate) return;
        setSaving(true);
        try {
            await supabase.from('availability_blocks').insert({
                date: selectedDate,
                reason: blockReason || 'Bloqueado por admin',
                is_full_day_block: true,
            });
            setBlockedDates((prev) => ({
                ...prev,
                [selectedDate]: {
                    id: 'temp-' + Date.now(),
                    date: selectedDate,
                    reason: blockReason || 'Bloqueado por admin',
                    is_full_day_block: true,
                },
            }));
        } catch {
            // Fallback to legacy table
            try {
                await supabase.from('blocked_dates').insert({ date: selectedDate, reason: blockReason || 'Bloqueado por admin' });
                setBlockedDates((prev) => ({
                    ...prev,
                    [selectedDate]: {
                        id: 'temp-' + Date.now(),
                        date: selectedDate,
                        reason: blockReason || 'Bloqueado por admin',
                        is_full_day_block: true,
                    },
                }));
            } catch { /* noop */ }
        }
        setShowBlockModal(false);
        setSaving(false);
    };

    const handleUnblock = async (dateStr: string) => {
        const block = blockedDates[dateStr];
        if (!block) return;
        try {
            await supabase.from('availability_blocks').delete().eq('date', dateStr);
        } catch {
            try { await supabase.from('blocked_dates').delete().eq('date', dateStr); } catch { /* noop */ }
        }
        setBlockedDates((prev) => {
            const next = { ...prev };
            delete next[dateStr];
            return next;
        });
    };

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return (
        <div>
            <p className="text-sm text-gray-400 mb-4">
                Haz clic en un día para bloquear/desbloquear. Las fechas reservadas no se pueden modificar aquí.
            </p>

            <div className="glass md:rounded-xl p-1 md:p-4 border-x-0 md:border border-y md:border-y">
                <div className="flex items-center justify-between mb-4 px-4 md:px-0">
                    <button
                        onClick={() => {
                            const prev = new Date(currentMonth);
                            prev.setMonth(prev.getMonth() - 1);
                            setCurrentMonth(prev);
                        }}
                        className="p-2 rounded-lg hover:bg-white/10 transition text-gray-400"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="font-semibold text-[var(--gold)]">
                        {MONTHS_ES[month]} {year}
                    </span>
                    <button
                        onClick={() => {
                            const next = new Date(currentMonth);
                            next.setMonth(next.getMonth() + 1);
                            setCurrentMonth(next);
                        }}
                        className="p-2 rounded-lg hover:bg-white/10 transition text-gray-400"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="calendar-grid mb-2">
                    {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((d) => (
                        <div key={d} className="text-center text-xs text-gray-500 font-medium py-1">{d}</div>
                    ))}
                </div>

                <div className="calendar-grid">
                    {/* Padding */}
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`pad-${i}`} className="calendar-day disabled" />
                    ))}

                    {/* Days */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const d = i + 1;
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                        const booking = bookedDates[dateStr];
                        const block = blockedDates[dateStr];
                        const isBooked = !!booking;
                        const isBlocked = !!block;
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const isPast = new Date(year, month, d) < today;

                        return (
                            <button
                                key={d}
                                onClick={() => !isPast && handleDayClick(dateStr)}
                                disabled={isPast}
                                title={isBooked ? `${booking.client_name} — ${booking.event_type}` : isBlocked ? `🚫 ${block.reason}` : 'Disponible — clic para bloquear'}
                                className={`calendar-day relative group ${isBooked ? 'selected' : ''
                                    } ${isBlocked ? 'blocked' : ''
                                    } ${isPast ? 'disabled' : ''
                                    } ${!isBooked && !isBlocked && !isPast ? 'hover:bg-[var(--gold)]/10 cursor-pointer' : ''}`}
                            >
                                {d}
                                {isBooked && (
                                    <span className="absolute -top-1 -right-1 text-[8px]">
                                        {booking.event_type === 'boda' ? '💒' : booking.event_type === 'xv' ? '👑' : '🎉'}
                                    </span>
                                )}
                                {isBlocked && !isBooked && (
                                    <span className="absolute -top-1 -right-1 text-[8px]">🚫</span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex gap-4 mt-4 text-xs text-gray-500 flex-wrap">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm bg-[var(--gold)]" /> Reservado
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm bg-red-500/50" /> Bloqueado
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm border border-white/20" /> Disponible
                    </div>
                </div>
            </div>

            {/* Block Modal */}
            <AnimatePresence>
                {showBlockModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
                        onClick={() => setShowBlockModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass rounded-2xl p-6 w-full max-w-sm"
                        >
                            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                <Ban className="w-5 h-5 text-red-400" /> Bloquear Fecha
                            </h3>
                            <p className="text-sm text-gray-400 mb-4">
                                {new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-MX', {
                                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                                })}
                            </p>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">Razón</label>
                                    <select
                                        value={blockReason}
                                        onChange={(e) => setBlockReason(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[var(--gold)] focus:outline-none"
                                    >
                                        <option value="">Seleccionar razón...</option>
                                        <option value="Mantenimiento">🔧 Mantenimiento</option>
                                        <option value="Feriado">🎌 Feriado</option>
                                        <option value="Evento privado">🔒 Evento privado</option>
                                        <option value="Clima">🌧️ Clima</option>
                                        <option value="Otro">📝 Otro</option>
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowBlockModal(false)}
                                        className="flex-1 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleBlock}
                                        disabled={saving}
                                        className="flex-1 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 transition flex items-center justify-center gap-2"
                                    >
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ban className="w-4 h-4" />}
                                        Bloquear
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─────────────────────── Precios Tab ───────────────────────

function PreciosTab() {
    const [services, setServices] = useState<ServiceCatalog[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newCategory, setNewCategory] = useState<string>('addon');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('services_catalog')
                .select('*')
                .order('sort_order');

            if (!error && data) {
                setServices(data);
            } else {
                // Demo data
                setServices([
                    { id: 'demo-1', name: 'Renta del Jardín', description: null, price: 15000, category: 'renta', is_active: true, sort_order: 1 },
                    { id: 'demo-2', name: 'Zona Techada', description: null, price: 5000, category: 'servicio', is_active: true, sort_order: 2 },
                    { id: 'demo-3', name: 'Iluminación Decorativa', description: null, price: 3500, category: 'addon', is_active: true, sort_order: 3 },
                    { id: 'demo-4', name: 'Hora Extra', description: null, price: 2500, category: 'hora_extra', is_active: true, sort_order: 4 },
                ]);
            }
        } catch {
            setServices([]);
        }
        setLoading(false);
    };

    const startEdit = (service: ServiceCatalog) => {
        setEditingId(service.id);
        setEditName(service.name);
        setEditPrice(String(service.price));
        setEditCategory(service.category);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName('');
        setEditPrice('');
        setEditCategory('');
    };

    const saveEdit = async () => {
        if (!editingId || !editName || !editPrice) return;
        setSaving(true);
        try {
            await supabase.from('services_catalog').update({
                name: editName,
                price: parseFloat(editPrice),
                category: editCategory,
                updated_at: new Date().toISOString(),
            }).eq('id', editingId);
        } catch { /* noop — might be demo data */ }

        setServices((prev) => prev.map((s) =>
            s.id === editingId
                ? { ...s, name: editName, price: parseFloat(editPrice), category: editCategory as ServiceCatalog['category'] }
                : s
        ));
        cancelEdit();
        setSaving(false);
    };

    const addService = async () => {
        if (!newName || !newPrice) return;
        setSaving(true);
        const newService: ServiceCatalog = {
            id: 'temp-' + Date.now(),
            name: newName,
            description: null,
            price: parseFloat(newPrice),
            category: newCategory as ServiceCatalog['category'],
            is_active: true,
            sort_order: services.length + 1,
        };

        try {
            const { data } = await supabase.from('services_catalog').insert({
                name: newName,
                price: parseFloat(newPrice),
                category: newCategory,
                sort_order: services.length + 1,
            }).select().single();

            if (data) newService.id = data.id;
        } catch { /* noop */ }

        setServices((prev) => [...prev, newService]);
        setNewName('');
        setNewPrice('');
        setNewCategory('addon');
        setShowAddForm(false);
        setSaving(false);
    };

    const deleteService = async (id: string) => {
        try {
            await supabase.from('services_catalog').delete().eq('id', id);
        } catch { /* noop */ }
        setServices((prev) => prev.filter((s) => s.id !== id));
    };

    const toggleActive = async (id: string, currentActive: boolean) => {
        try {
            await supabase.from('services_catalog').update({ is_active: !currentActive }).eq('id', id);
        } catch { /* noop */ }
        setServices((prev) => prev.map((s) => s.id === id ? { ...s, is_active: !currentActive } : s));
    };

    const getCategoryLabel = (cat: string) => {
        switch (cat) {
            case 'renta': return '🏡 Renta';
            case 'servicio': return '⚙️ Servicio';
            case 'addon': return '✨ Extra';
            case 'hora_extra': return '🕐 Hora extra';
            default: return cat;
        }
    };

    if (loading) return <div className="text-center py-12 text-gray-500">Cargando catálogo...</div>;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Package className="w-5 h-5 text-[var(--gold)]" /> Catálogo de Servicios
                </h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] text-sm hover:bg-[var(--gold)]/20 transition border border-[var(--gold)]/20"
                >
                    <Plus className="w-4 h-4" /> Agregar
                </button>
            </div>

            {/* Add new service form */}
            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="glass rounded-xl p-4 mb-4 border border-[var(--gold)]/20">
                            <h3 className="text-sm font-medium text-[var(--gold)] mb-3">Nuevo servicio</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <input
                                    type="text"
                                    placeholder="Nombre del servicio"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600
                        focus:border-[var(--gold)] focus:outline-none"
                                />
                                <input
                                    type="number"
                                    placeholder="Precio"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600
                        focus:border-[var(--gold)] focus:outline-none"
                                />
                                <select
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm
                        focus:border-[var(--gold)] focus:outline-none"
                                >
                                    <option value="renta">🏡 Renta</option>
                                    <option value="servicio">⚙️ Servicio</option>
                                    <option value="addon">✨ Extra</option>
                                    <option value="hora_extra">🕐 Hora extra</option>
                                </select>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={addService}
                                    disabled={!newName || !newPrice || saving}
                                    className="px-4 py-2 rounded-lg bg-[var(--gold)] text-[var(--black)] font-semibold text-sm
                        hover:bg-[var(--gold-light)] transition disabled:opacity-30 flex items-center gap-1"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Services list */}
            <div className="space-y-2">
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        layout
                        className={`glass rounded-xl p-4 transition ${!service.is_active ? 'opacity-50' : ''}`}
                    >
                        {editingId === service.id ? (
                            // Edit mode
                            <div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="px-3 py-2 rounded-lg bg-white/5 border border-[var(--gold)]/30 text-white text-sm
                            focus:border-[var(--gold)] focus:outline-none"
                                    />
                                    <input
                                        type="number"
                                        value={editPrice}
                                        onChange={(e) => setEditPrice(e.target.value)}
                                        className="px-3 py-2 rounded-lg bg-white/5 border border-[var(--gold)]/30 text-white text-sm
                            focus:border-[var(--gold)] focus:outline-none"
                                    />
                                    <select
                                        value={editCategory}
                                        onChange={(e) => setEditCategory(e.target.value)}
                                        className="px-3 py-2 rounded-lg bg-white/5 border border-[var(--gold)]/30 text-white text-sm
                            focus:border-[var(--gold)] focus:outline-none"
                                    >
                                        <option value="renta">🏡 Renta</option>
                                        <option value="servicio">⚙️ Servicio</option>
                                        <option value="addon">✨ Extra</option>
                                        <option value="hora_extra">🕐 Hora extra</option>
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={cancelEdit}
                                        className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={saveEdit}
                                        disabled={saving}
                                        className="px-3 py-1.5 rounded-lg bg-[var(--gold)] text-[var(--black)] font-semibold text-sm
                            hover:bg-[var(--gold-light)] transition flex items-center gap-1"
                                    >
                                        {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Display mode
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                                <div className="flex-1 min-w-0 w-full">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-white truncate text-base sm:text-sm">{service.name}</p>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 whitespace-nowrap">
                                            {getCategoryLabel(service.category)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-5 ml-0 sm:ml-3 w-full sm:w-auto mt-2 sm:mt-0">
                                    <span className="text-[var(--gold)] font-bold whitespace-nowrap text-lg sm:text-base">
                                        {formatCurrency(service.price)}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleActive(service.id, service.is_active)}
                                            className={`p-3 sm:p-1.5 rounded-lg transition ${service.is_active
                                                ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                                                : 'bg-gray-500/20 text-gray-500 hover:bg-gray-500/30'
                                                }`}
                                            title={service.is_active ? 'Activo — clic para desactivar' : 'Inactivo — clic para activar'}
                                        >
                                            {service.is_active ? <Check className="w-4 h-4 sm:w-3 sm:h-3" /> : <X className="w-4 h-4 sm:w-3 sm:h-3" />}
                                        </button>
                                        <button
                                            onClick={() => startEdit(service)}
                                            className="p-3 sm:p-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition"
                                        >
                                            <Pencil className="w-5 h-5 sm:w-3 sm:h-3" />
                                        </button>
                                        <button
                                            onClick={() => deleteService(service.id)}
                                            className="p-3 sm:p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                                        >
                                            <Trash2 className="w-5 h-5 sm:w-3 sm:h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ─────────────────────── Packages Tab ───────────────────────

function PackagesTab() {
    const [packages, setPackages] = useState<import('@/lib/supabase').Package[]>([]);
    const [services, setServices] = useState<ServiceCatalog[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formName, setFormName] = useState('');
    const [formDesc, setFormDesc] = useState('');
    const [formPrice, setFormPrice] = useState('');
    const [formGuests, setFormGuests] = useState('');
    const [formType, setFormType] = useState('general');
    const [formServices, setFormServices] = useState<string[]>([]); // Array of service IDs

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Packages
            const { data: pkgData } = await supabase
                .from('packages')
                .select('*')
                .order('sort_order');

            if (pkgData) setPackages(pkgData);
            else setPackages(getDemoPackages());

            // Fetch Services for selector
            const { data: svcData } = await supabase
                .from('services_catalog')
                .select('*')
                .eq('is_active', true)
                .order('category')
                .order('name');

            if (svcData) setServices(svcData);
        } catch {
            setPackages(getDemoPackages());
        }
        setLoading(false);
    };

    const resetForm = () => {
        setEditingId(null);
        setFormName('');
        setFormDesc('');
        setFormPrice('');
        setFormGuests('');
        setFormType('general');
        setFormServices([]);
        setShowAddForm(false);
    };

    const startEdit = (pkg: import('@/lib/supabase').Package) => {
        setEditingId(pkg.id);
        setFormName(pkg.name);
        setFormDesc(pkg.description || '');
        setFormPrice(String(pkg.total_price));
        setFormGuests(String(pkg.max_guests));
        setFormType(pkg.event_type);
        setFormServices(pkg.includes_services || []); // Ensure array
        setShowAddForm(true);
    };

    const handleServiceToggle = (serviceId: string) => {
        setFormServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const handleSave = async () => {
        if (!formName || !formPrice) return;
        setSaving(true);

        const newPackage = {
            name: formName,
            description: formDesc,
            total_price: parseFloat(formPrice),
            max_guests: parseInt(formGuests) || 0,
            event_type: formType,
            includes_services: formServices,
            updated_at: new Date().toISOString(),
        };

        try {
            if (editingId) {
                // Update
                await supabase.from('packages').update(newPackage).eq('id', editingId);
                setPackages(prev => prev.map(p => p.id === editingId ? { ...p, ...newPackage } as any : p));
            } else {
                // Insert
                const { data } = await supabase.from('packages').insert({
                    ...newPackage,
                    is_active: true,
                    sort_order: packages.length + 1,
                }).select().single();

                if (data) {
                    setPackages(prev => [...prev, data]);
                } else {
                    // Fallback for demo mode
                    setPackages(prev => [...prev, {
                        ...newPackage,
                        id: 'temp-' + Date.now(),
                        is_active: true,
                        sort_order: packages.length + 1,
                    } as any]);
                }
            }
        } catch { /* noop */ }

        setSaving(false);
        resetForm();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este paquete?')) return;
        try {
            await supabase.from('packages').delete().eq('id', id);
            setPackages(prev => prev.filter(p => p.id !== id));
        } catch { /* noop */ }
    };

    const toggleActive = async (id: string, current: boolean) => {
        try {
            await supabase.from('packages').update({ is_active: !current }).eq('id', id);
            setPackages(prev => prev.map(p => p.id === id ? { ...p, is_active: !current } : p));
        } catch { /* noop */ }
    };

    const getServicesNames = (ids: string[]) => {
        if (!ids?.length) return 'Ninguno';
        return ids.map(id => services.find(s => s.id === id)?.name).filter(Boolean).join(', ');
    };

    if (loading) return <div className="text-center py-12 text-gray-500">Cargando paquetes...</div>;

    return (
        <div className="px-3 md:px-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Package className="w-5 h-5 text-[var(--gold)]" /> Catálogo de Paquetes
                </h2>
                {!showAddForm && (
                    <button
                        onClick={() => { resetForm(); setShowAddForm(true); }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)]
                       text-sm hover:bg-[var(--gold)]/20 transition border border-[var(--gold)]/20"
                    >
                        <Plus className="w-4 h-4" /> Nuevo Paquete
                    </button>
                )}
            </div>

            {/* Add/Edit Form */}
            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-6"
                    >
                        <div className="glass rounded-xl p-6 border border-[var(--gold)]/20">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-md font-medium text-[var(--gold)]">
                                    {editingId ? 'Editar Paquete' : 'Nuevo Paquete'}
                                </h3>
                                <button onClick={resetForm}><X className="w-5 h-5 text-gray-400 hover:text-white" /></button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-4">
                                    <input
                                        type="text" placeholder="Nombre del Paquete"
                                        value={formName} onChange={e => setFormName(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[var(--gold)] focus:outline-none"
                                    />
                                    <textarea
                                        placeholder="Descripción"
                                        value={formDesc} onChange={e => setFormDesc(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[var(--gold)] focus:outline-none h-24"
                                    />
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-xs text-gray-400 mb-1 block">Precio (MXN)</label>
                                            <input
                                                type="number" placeholder="0.00"
                                                value={formPrice} onChange={e => setFormPrice(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[var(--gold)] focus:outline-none"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs text-gray-400 mb-1 block">Capacidad (Personas)</label>
                                            <input
                                                type="number" placeholder="100"
                                                value={formGuests} onChange={e => setFormGuests(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[var(--gold)] focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 mb-1 block">Tipo de Evento</label>
                                        <select
                                            value={formType} onChange={e => setFormType(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[var(--gold)] focus:outline-none"
                                        >
                                            <option value="general">🎉 General</option>
                                            <option value="boda">💒 Boda</option>
                                            <option value="xv">👑 XV Años</option>
                                            <option value="corporativo">🏢 Corporativo</option>
                                            <option value="social">🥂 Social</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Service Selector */}
                                <div className="bg-white/5 rounded-lg p-3 border border-white/10 max-h-[340px] overflow-y-auto custom-scrollbar">
                                    <h4 className="text-sm font-medium text-gray-300 mb-3 sticky top-0 bg-[#0A0A09] pb-2 border-b border-white/10 z-10">
                                        Servicios Incluidos
                                    </h4>
                                    <div className="space-y-2">
                                        {services.map(svc => (
                                            <label key={svc.id} className="flex items-start gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition">
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5
                                        ${formServices.includes(svc.id) ? 'bg-[var(--gold)] border-[var(--gold)] text-black' : 'border-gray-500'}`}>
                                                    {formServices.includes(svc.id) && <Check className="w-3.5 h-3.5" />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={formServices.includes(svc.id)}
                                                    onChange={() => handleServiceToggle(svc.id)}
                                                />
                                                <div>
                                                    <p className="text-sm text-white font-medium">{svc.name}</p>
                                                    <p className="text-xs text-gray-500">{formatCurrency(svc.price)}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                                <button
                                    onClick={resetForm}
                                    className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving || !formName || !formPrice}
                                    className="px-6 py-2 rounded-lg bg-[var(--gold)] text-[var(--black)] font-bold
                                     hover:bg-[var(--gold-light)] transition disabled:opacity-50 flex items-center gap-2"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Guardar Paquete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Packages List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map(pkg => (
                    <motion.div
                        key={pkg.id}
                        layout
                        className={`glass rounded-xl overflow-hidden group hover:border-[var(--gold)]/30 transition-all ${!pkg.is_active ? 'opacity-60 grayscale' : ''}`}
                    >
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border 
                                    ${pkg.event_type === 'boda' ? 'border-pink-500/30 text-pink-300 bg-pink-500/10' :
                                        pkg.event_type === 'corporativo' ? 'border-blue-500/30 text-blue-300 bg-blue-500/10' :
                                            'border-[var(--gold)]/30 text-[var(--gold)] bg-[var(--gold)]/10'}`}>
                                    {pkg.event_type}
                                </span>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => toggleActive(pkg.id, pkg.is_active)} className="p-1 hover:bg-white/10 rounded">
                                        {pkg.is_active ? <Eye className="w-4 h-4 text-gray-400" /> : <Ban className="w-4 h-4 text-red-400" />}
                                    </button>
                                    <button onClick={() => startEdit(pkg)} className="p-1 hover:bg-white/10 rounded">
                                        <Pencil className="w-4 h-4 text-[var(--gold)]" />
                                    </button>
                                    <button onClick={() => handleDelete(pkg.id)} className="p-1 hover:bg-white/10 rounded">
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                {pkg.name}
                            </h3>
                            <p className="text-2xl font-semibold text-[var(--gold)] mb-4">{formatCurrency(pkg.total_price)}</p>

                            <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[40px]">
                                {pkg.description || 'Sin descripción'}
                            </p>

                            <div className="space-y-2 border-t border-white/10 pt-4">
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold flex items-center gap-2">
                                    <Check className="w-3 h-3 text-[var(--gold)]" /> Incluye:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {pkg.includes_services?.slice(0, 3).map(svcId => {
                                        const svc = services.find(s => s.id === svcId);
                                        return svc ? (
                                            <span key={svcId} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">
                                                {svc.name}
                                            </span>
                                        ) : null;
                                    })}
                                    {(pkg.includes_services?.length || 0) > 3 && (
                                        <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-500">
                                            +{pkg.includes_services!.length - 3} más
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 px-5 py-3 flex justify-between items-center text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Max: {pkg.max_guests} pax</span>
                            {!pkg.is_active && <span className="text-red-400 flex items-center gap-1"><Ban className="w-3 h-3" /> Inactivo</span>}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function getDemoPackages(): import('@/lib/supabase').Package[] {
    return [
        {
            id: 'demo-p-1',
            name: 'Paquete Esencial',
            description: 'Ideal para eventos íntimos. Incluye renta del jardín y zona techada.',
            total_price: 25000,
            event_type: 'general',
            max_guests: 100,
            is_active: true,
            sort_order: 1,
            includes_services: ['demo-1', 'demo-2'],
            created_at: new Date().toISOString(),
        },
        {
            id: 'demo-p-2',
            name: 'Boda de Ensueño',
            description: 'Todo lo necesario para tu gran día, con iluminación y sonido.',
            total_price: 45000,
            event_type: 'boda',
            max_guests: 200,
            is_active: true,
            sort_order: 2,
            includes_services: ['demo-1', 'demo-2', 'demo-3', 'demo-5'],
            created_at: new Date().toISOString(),
        }
    ];
}

// ─────────────────────── Demo Data ───────────────────────

function getDemoLeads(): Booking[] {
    return [
        {
            id: '1',
            date: '2026-03-15',
            event_type: 'boda',
            client_name: 'María García',
            phone: '3312345678',
            guests: 150,
            package_id: null,
            addons: [],
            total_amount: 45000,
            paid_amount: 15000,
            balance_due: 30000,
            status: 'pending',
            created_at: new Date().toISOString(),
        },
        {
            id: '2',
            date: '2026-03-22',
            event_type: 'xv',
            client_name: 'Roberto López',
            phone: '3398765432',
            guests: 200,
            package_id: null,
            addons: [],
            total_amount: 38000,
            paid_amount: 38000,
            balance_due: 0,
            status: 'confirmed',
            created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
            id: '3',
            date: '2026-04-05',
            event_type: 'social',
            client_name: 'Ana Martínez',
            phone: '3356781234',
            guests: 80,
            package_id: null,
            addons: [],
            total_amount: 22000,
            paid_amount: 0,
            balance_due: 22000,
            status: 'pending',
            created_at: new Date(Date.now() - 172800000).toISOString(),
        },
    ];
}
