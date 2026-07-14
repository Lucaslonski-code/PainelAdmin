import React from 'react';
import {
  TrendingUp, TrendingDown, Search, ChevronLeft, ChevronRight, X
} from 'lucide-react';

export function Badge({ variant = 'neutral', children }: { variant?: 'success' | 'danger' | 'warning' | 'info' | 'neutral', children: React.ReactNode }) {
  const styles = {
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string, variant: 'success' | 'danger' | 'warning' | 'info' | 'neutral' }> = {
    ativo: { label: 'Ativo', variant: 'success' },
    inativo: { label: 'Inativo', variant: 'neutral' },
    pendente: { label: 'Pendente', variant: 'warning' },
    confirmado: { label: 'Confirmado', variant: 'success' },
    em_andamento: { label: 'Em Andamento', variant: 'info' },
    cancelado: { label: 'Cancelado', variant: 'danger' },
    pago: { label: 'Pago', variant: 'success' },
    receita: { label: 'Receita', variant: 'success' },
    despesa: { label: 'Despesa', variant: 'danger' },
    admin: { label: 'Admin', variant: 'info' },
    manager: { label: 'Gestor', variant: 'neutral' },
    viewer: { label: 'Visualizador', variant: 'neutral' },
  };
  const { label, variant } = map[status] || { label: status, variant: 'neutral' as const };
  return <Badge variant={variant}>{label}</Badge>;
}

export function KpiCard({ label, value, sub, trend, mono = false }: {
  label: string, value: string, sub: string, trend?: { dir: 'up' | 'down', val: string }, mono?: boolean
}) {
  return (
    <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-5 shadow-sm shadow-slate-950/20 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
        {trend && (
          <span className={`flex items-center gap-1 text-xs font-semibold ${trend.dir === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend.dir === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.val}
          </span>
        )}
      </div>
      <div>
        <div className={`text-2xl font-bold text-white ${mono ? 'font-mono' : ''}`} style={mono ? { fontFamily: 'JetBrains Mono, monospace' } : { fontFamily: 'Space Grotesk, sans-serif' }}>
          {value}
        </div>
        <div className="text-xs text-slate-400 mt-1">{sub}</div>
      </div>
    </div>
  );
}

export function SectionHeader({ title, subtitle, actions }: { title: string, subtitle?: string, actions?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-lg font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{title}</h2>
        {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Btn({ children, variant = 'primary', size = 'sm', icon, onClick, disabled }: {
  children?: React.ReactNode, variant?: 'primary' | 'secondary' | 'danger' | 'ghost',
  size?: 'xs' | 'sm' | 'md', icon?: React.ReactNode, onClick?: () => void, disabled?: boolean
}) {
  const base = 'inline-flex items-center gap-1.5 font-semibold rounded-lg transition-all duration-150 cursor-pointer border';
  const sizes = { xs: 'px-2.5 py-1 text-xs', sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm' };
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white border-transparent shadow-md shadow-blue-950/20',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 hover:border-slate-600',
    danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20',
    ghost: 'bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white border-transparent',
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

export function SearchInput({ placeholder, value, onChange }: { placeholder?: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
      <input
        className="bg-[#0F172A] border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-64 transition-colors"
        placeholder={placeholder || 'Buscar...'}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

export function TableContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0F172A]/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm shadow-slate-950/10">
      <div className="overflow-x-auto">
        <table className="w-full">{children}</table>
      </div>
    </div>
  );
}

export function Th({ children, className = '' }: { children?: React.ReactNode, className?: string }) {
  return (
    <th className={`px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700 ${className}`}>
      {children}
    </th>
  );
}

export function Td({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <td className={`px-4 py-3.5 text-sm text-slate-300 border-b border-slate-800/80 ${className}`}>
      {children}
    </td>
  );
}

export function Pagination({ current, total, onChange }: { current: number, total: number, onChange: (p: number) => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700 bg-[#0F172A]/40">
      <span className="text-xs text-slate-400">Página {current} de {total}</span>
      <div className="flex items-center gap-1">
        <button
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-colors"
          onClick={() => onChange(current - 1)} disabled={current === 1}
        >
          <ChevronLeft size={14} />
        </button>
        {Array.from({ length: Math.min(total, 5) }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${p === current ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-850'}`}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ))}
        <button
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-colors"
          onClick={() => onChange(current + 1)} disabled={current === total}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function Avatar({ name, size = 'sm' }: { name: string, size?: 'xs' | 'sm' | 'md' }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const colors = ['bg-emerald-500/20 text-emerald-400', 'bg-blue-500/20 text-blue-400', 'bg-amber-500/20 text-amber-400', 'bg-purple-500/20 text-purple-400', 'bg-rose-500/20 text-rose-400'];
  const color = colors[name.charCodeAt(0) % colors.length];
  const sizes = { xs: 'w-6 h-6 text-[10px]', sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm' };
  return (
    <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center font-semibold flex-shrink-0`}>
      {initials}
    </div>
  );
}

export function EmptyState({ title, sub, action }: { title: string, sub: string, action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 border border-slate-700">
        <Search size={20} className="text-slate-400" />
      </div>
      <div className="text-sm font-semibold text-white mb-1">{title}</div>
      <div className="text-xs text-slate-400 mb-4 max-w-[280px]">{sub}</div>
      {action}
    </div>
  );
}

export function Modal({ open, onClose, title, children, footer }: {
  open: boolean, onClose: () => void, title: string, children: React.ReactNode, footer?: React.ReactNode
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1E293B] border border-slate-700 rounded-xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h3 className="text-base font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{title}</h3>
          <button className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 p-6 border-t border-slate-700">{footer}</div>}
      </div>
    </div>
  );
}

export function FormField({ label, children, hint }: { label: string, children: React.ReactNode, hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      {children}
      {hint && <span className="text-xs text-slate-500">{hint}</span>}
    </div>
  );
}

export function Input({ placeholder, value, onChange, type = 'text' }: {
  placeholder?: string, value?: string, onChange?: (v: string) => void, type?: string
}) {
  return (
    <input
      type={type}
      className="bg-[#020617] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors w-full"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
    />
  );
}

export function Select({ options, value, onChange }: { options: string[], value: string, onChange: (v: string) => void }) {
  return (
    <select
      className="bg-[#020617] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors w-full appearance-none"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
