import { useState, useRef, useEffect } from 'react'
import {
  LayoutDashboard, Building2, Users, Wrench, Calendar, DollarSign,
  Settings, User, Bot, ChevronRight, Bell, Search, TrendingUp,
  TrendingDown, ArrowUpRight, ArrowDownRight, Plus,
  Filter, Download, Upload, Eye, Edit2, Trash2, X, AlertCircle,
  Clock, CheckCircle, XCircle, RefreshCw, ChevronLeft,
  Send, Zap, Shield, Globe, Key, Smartphone,
  CreditCard, Mail, Phone,
  Sparkles, Menu
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell
} from 'recharts'

// ─── Types ───────────────────────────────────────────────────────────────────

type Page =
  | 'dashboard' | 'empresas' | 'clientes' | 'servicos'
  | 'usuarios' | 'agendamentos' | 'financeiro' | 'configuracoes'
  | 'perfil' | 'ia'

// ─── Data ────────────────────────────────────────────────────────────────────

const revenueData = [
  { month: 'Jan', receita: 42000, despesa: 28000 },
  { month: 'Fev', receita: 51000, despesa: 31000 },
  { month: 'Mar', receita: 47000, despesa: 29000 },
  { month: 'Abr', receita: 63000, despesa: 34000 },
  { month: 'Mai', receita: 58000, despesa: 32000 },
  { month: 'Jun', receita: 71000, despesa: 38000 },
  { month: 'Jul', receita: 68000, despesa: 35000 },
]

const agendamentosData = [
  { day: 'Seg', total: 24 },
  { day: 'Ter', total: 31 },
  { day: 'Qua', total: 28 },
  { day: 'Qui', total: 37 },
  { day: 'Sex', total: 42 },
  { day: 'Sáb', total: 19 },
  { day: 'Dom', total: 8 },
]

const pieData = [
  { name: 'Ativo', value: 68, color: '#22C55E' },
  { name: 'Pendente', value: 18, color: '#F59E0B' },
  { name: 'Inativo', value: 14, color: '#3F3F46' },
]

const empresas = [
  { id: 1, nome: 'TechCorp Brasil', cnpj: '12.345.678/0001-90', status: 'ativo', plano: 'Enterprise', clientes: 248, mrr: 4800, cidade: 'São Paulo', criado: '12 Jan 2024' },
  { id: 2, nome: 'Nexus Soluções', cnpj: '98.765.432/0001-10', status: 'ativo', plano: 'Pro', clientes: 91, mrr: 1200, cidade: 'Rio de Janeiro', criado: '23 Mar 2024' },
  { id: 3, nome: 'Apex Sistemas', cnpj: '45.678.901/0001-23', status: 'pendente', plano: 'Starter', clientes: 34, mrr: 400, cidade: 'Belo Horizonte', criado: '05 Abr 2024' },
  { id: 4, nome: 'DataStream Ltda', cnpj: '67.890.123/0001-45', status: 'ativo', plano: 'Pro', clientes: 127, mrr: 1200, cidade: 'Curitiba', criado: '18 Fev 2024' },
  { id: 5, nome: 'CloudBase S.A.', cnpj: '23.456.789/0001-67', status: 'inativo', plano: 'Starter', clientes: 12, mrr: 0, cidade: 'Porto Alegre', criado: '30 Jan 2024' },
  { id: 6, nome: 'SoftEdge Brasil', cnpj: '34.567.890/0001-78', status: 'ativo', plano: 'Enterprise', clientes: 312, mrr: 4800, cidade: 'Brasília', criado: '07 Mar 2024' },
  { id: 7, nome: 'Pixel Studios', cnpj: '56.789.012/0001-89', status: 'ativo', plano: 'Pro', clientes: 78, mrr: 1200, cidade: 'Fortaleza', criado: '14 Mai 2024' },
]

const clientes = [
  { id: 1, nome: 'Rafael Mendonça', email: 'rafael@techcorp.com', empresa: 'TechCorp Brasil', status: 'ativo', ultimo: '10 Jul 2025', agendamentos: 18, gasto: 12400 },
  { id: 2, nome: 'Camila Souza', email: 'camila@nexus.com', empresa: 'Nexus Soluções', status: 'ativo', ultimo: '08 Jul 2025', agendamentos: 7, gasto: 3200 },
  { id: 3, nome: 'Thiago Ferreira', email: 'thiago@apex.com', empresa: 'Apex Sistemas', status: 'inativo', ultimo: '15 Jun 2025', agendamentos: 3, gasto: 800 },
  { id: 4, nome: 'Juliana Costa', email: 'juliana@datastream.com', empresa: 'DataStream Ltda', status: 'ativo', ultimo: '11 Jul 2025', agendamentos: 22, gasto: 18900 },
  { id: 5, nome: 'Bruno Alves', email: 'bruno@cloudbase.com', empresa: 'CloudBase S.A.', status: 'pendente', ultimo: '01 Jul 2025', agendamentos: 1, gasto: 200 },
  { id: 6, nome: 'Larissa Nunes', email: 'larissa@softedge.com', empresa: 'SoftEdge Brasil', status: 'ativo', ultimo: '12 Jul 2025', agendamentos: 31, gasto: 24100 },
]

const servicos = [
  { id: 1, nome: 'Manutenção Preventiva', categoria: 'Manutenção', duracao: '2h', preco: 380, ativo: true, agendamentos: 142 },
  { id: 2, nome: 'Instalação de Software', categoria: 'TI', duracao: '1h', preco: 220, ativo: true, agendamentos: 87 },
  { id: 3, nome: 'Suporte Remoto', categoria: 'Suporte', duracao: '30min', preco: 120, ativo: true, agendamentos: 314 },
  { id: 4, nome: 'Consultoria Técnica', categoria: 'Consultoria', duracao: '3h', preco: 750, ativo: true, agendamentos: 56 },
  { id: 5, nome: 'Backup e Recuperação', categoria: 'TI', duracao: '4h', preco: 980, ativo: false, agendamentos: 23 },
  { id: 6, nome: 'Treinamento Usuários', categoria: 'Educação', duracao: '8h', preco: 1600, ativo: true, agendamentos: 41 },
]

const usuarios = [
  { id: 1, nome: 'Ana Beatriz Lima', email: 'ana@autonova.io', cargo: 'Administradora', role: 'admin', status: 'ativo', ultimo: 'Agora' },
  { id: 2, nome: 'Carlos Eduardo', email: 'carlos@autonova.io', cargo: 'Gestor de Contas', role: 'manager', status: 'ativo', ultimo: '2h atrás' },
  { id: 3, nome: 'Fernanda Ramos', email: 'fernanda@autonova.io', cargo: 'Atendente', role: 'viewer', status: 'ativo', ultimo: '15min atrás' },
  { id: 4, nome: 'Gustavo Pinto', email: 'gustavo@autonova.io', cargo: 'Técnico', role: 'manager', status: 'inativo', ultimo: '3 dias atrás' },
  { id: 5, nome: 'Helena Vieira', email: 'helena@autonova.io', cargo: 'Financeiro', role: 'viewer', status: 'ativo', ultimo: '1h atrás' },
]

const agendamentos = [
  { id: 1, cliente: 'Rafael Mendonça', servico: 'Manutenção Preventiva', data: '13 Jul 2025', hora: '09:00', status: 'confirmado', tecnico: 'Carlos Eduardo', empresa: 'TechCorp Brasil' },
  { id: 2, cliente: 'Camila Souza', servico: 'Suporte Remoto', data: '13 Jul 2025', hora: '10:30', status: 'em_andamento', tecnico: 'Fernanda Ramos', empresa: 'Nexus Soluções' },
  { id: 3, cliente: 'Juliana Costa', servico: 'Consultoria Técnica', data: '13 Jul 2025', hora: '14:00', status: 'confirmado', tecnico: 'Carlos Eduardo', empresa: 'DataStream Ltda' },
  { id: 4, cliente: 'Larissa Nunes', servico: 'Instalação de Software', data: '14 Jul 2025', hora: '08:30', status: 'pendente', tecnico: 'Gustavo Pinto', empresa: 'SoftEdge Brasil' },
  { id: 5, cliente: 'Bruno Alves', servico: 'Backup e Recuperação', data: '14 Jul 2025', hora: '11:00', status: 'cancelado', tecnico: 'Fernanda Ramos', empresa: 'CloudBase S.A.' },
  { id: 6, cliente: 'Thiago Ferreira', servico: 'Treinamento Usuários', data: '15 Jul 2025', hora: '09:00', status: 'pendente', tecnico: 'Helena Vieira', empresa: 'Apex Sistemas' },
]

const transacoes = [
  { id: 1, descricao: 'Pagamento - TechCorp Brasil', tipo: 'receita', valor: 4800, data: '12 Jul 2025', status: 'pago', metodo: 'Transferência' },
  { id: 2, descricao: 'Pagamento - SoftEdge Brasil', tipo: 'receita', valor: 4800, data: '11 Jul 2025', status: 'pago', metodo: 'Pix' },
  { id: 3, descricao: 'Pagamento - DataStream Ltda', tipo: 'receita', valor: 1200, data: '10 Jul 2025', status: 'pago', metodo: 'Cartão' },
  { id: 4, descricao: 'Servidor Cloud AWS', tipo: 'despesa', valor: 2340, data: '09 Jul 2025', status: 'pago', metodo: 'Débito' },
  { id: 5, descricao: 'Pagamento - Nexus Soluções', tipo: 'receita', valor: 1200, data: '08 Jul 2025', status: 'pendente', metodo: 'Boleto' },
  { id: 6, descricao: 'Licença Ferramentas Dev', tipo: 'despesa', valor: 890, data: '07 Jul 2025', status: 'pago', metodo: 'Cartão' },
  { id: 7, descricao: 'Pagamento - Pixel Studios', tipo: 'receita', valor: 1200, data: '06 Jul 2025', status: 'pago', metodo: 'Pix' },
]

const chatMessages = [
  { role: 'assistant', content: 'Olá! Sou a IA do AutoNova. Posso ajudar com análises, relatórios, insights de negócio e automações. O que você precisa hoje?' },
  { role: 'user', content: 'Quais são as empresas com maior risco de churn este mês?' },
  { role: 'assistant', content: 'Com base nos dados de uso e engajamento, identifiquei **3 empresas em risco**:\n\n1. **CloudBase S.A.** — Inativa há 28 dias. Uso 94% abaixo da média. MRR: R$ 400.\n2. **Apex Sistemas** — Apenas 1 agendamento nos últimos 60 dias. Status: Pendente.\n3. **Thiago Ferreira (Apex)** — Última sessão: 15 Jun. Nenhuma interação recente.\n\nRecomendo acionar o time de Customer Success para contato proativo nos próximos 48h.' },
]

// ─── Design System Components ────────────────────────────────────────────────

function Badge({ variant = 'neutral', children }: { variant?: 'success' | 'danger' | 'warning' | 'info' | 'neutral', children: React.ReactNode }) {
  const styles = {
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    neutral: 'bg-zinc-800 text-zinc-400 border border-zinc-700',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[10px] text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
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
  }
  const { label, variant } = map[status] || { label: status, variant: 'neutral' as const }
  return <Badge variant={variant}>{label}</Badge>
}

function KpiCard({ label, value, sub, trend, mono = false }: {
  label: string, value: string, sub: string, trend?: { dir: 'up' | 'down', val: string }, mono?: boolean
}) {
  return (
    <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#71717A] uppercase tracking-widest">{label}</span>
        {trend && (
          <span className={`flex items-center gap-1 text-xs font-medium ${trend.dir === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend.dir === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.val}
          </span>
        )}
      </div>
      <div>
        <div className={`text-2xl font-bold text-white ${mono ? 'font-mono' : ''}`} style={mono ? { fontFamily: 'JetBrains Mono, monospace' } : { fontFamily: 'Space Grotesk, sans-serif' }}>
          {value}
        </div>
        <div className="text-xs text-[#71717A] mt-1">{sub}</div>
      </div>
    </div>
  )
}

function SectionHeader({ title, subtitle, actions }: { title: string, subtitle?: string, actions?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-lg font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{title}</h2>
        {subtitle && <p className="text-sm text-[#71717A] mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

function Btn({ children, variant = 'primary', size = 'sm', icon, onClick, disabled }: {
  children?: React.ReactNode, variant?: 'primary' | 'secondary' | 'danger' | 'ghost',
  size?: 'xs' | 'sm' | 'md', icon?: React.ReactNode, onClick?: () => void, disabled?: boolean
}) {
  const base = 'inline-flex items-center gap-1.5 font-medium rounded-[12px] transition-all duration-150 cursor-pointer border'
  const sizes = { xs: 'px-2.5 py-1 text-xs', sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm' }
  const variants = {
    primary: 'bg-[#22C55E] hover:bg-[#16A34A] text-black border-transparent',
    secondary: 'bg-[#18181B] hover:bg-zinc-800 text-white border-[#27272A] hover:border-zinc-600',
    danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20',
    ghost: 'bg-transparent hover:bg-zinc-800 text-[#A1A1AA] hover:text-white border-transparent',
  }
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  )
}

function SearchInput({ placeholder, value, onChange }: { placeholder?: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
      <input
        className="bg-[#18181B] border border-[#27272A] rounded-[12px] pl-8 pr-3 py-1.5 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-zinc-500 w-64 transition-colors"
        placeholder={placeholder || 'Buscar...'}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

function TableContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">{children}</table>
      </div>
    </div>
  )
}

function Th({ children, className = '' }: { children?: React.ReactNode, className?: string }) {
  return (
    <th className={`px-4 py-3 text-left text-xs font-medium text-[#71717A] uppercase tracking-wider border-b border-[#27272A] ${className}`}>
      {children}
    </th>
  )
}

function Td({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <td className={`px-4 py-3.5 text-sm text-[#A1A1AA] border-b border-[#27272A]/50 ${className}`}>
      {children}
    </td>
  )
}

function Pagination({ current, total, onChange }: { current: number, total: number, onChange: (p: number) => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[#27272A]">
      <span className="text-xs text-[#71717A]">Página {current} de {total}</span>
      <div className="flex items-center gap-1">
        <button
          className="p-1.5 rounded-[8px] text-[#71717A] hover:text-white hover:bg-zinc-800 disabled:opacity-30 transition-colors"
          onClick={() => onChange(current - 1)} disabled={current === 1}
        >
          <ChevronLeft size={14} />
        </button>
        {Array.from({ length: Math.min(total, 5) }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            className={`w-7 h-7 rounded-[8px] text-xs font-medium transition-colors ${p === current ? 'bg-[#22C55E] text-black' : 'text-[#71717A] hover:text-white hover:bg-zinc-800'}`}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ))}
        <button
          className="p-1.5 rounded-[8px] text-[#71717A] hover:text-white hover:bg-zinc-800 disabled:opacity-30 transition-colors"
          onClick={() => onChange(current + 1)} disabled={current === total}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}

function Avatar({ name, size = 'sm' }: { name: string, size?: 'xs' | 'sm' | 'md' }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  const colors = ['bg-emerald-500/20 text-emerald-400', 'bg-blue-500/20 text-blue-400', 'bg-amber-500/20 text-amber-400', 'bg-purple-500/20 text-purple-400', 'bg-rose-500/20 text-rose-400']
  const color = colors[name.charCodeAt(0) % colors.length]
  const sizes = { xs: 'w-6 h-6 text-[10px]', sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm' }
  return (
    <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center font-semibold flex-shrink-0`}>
      {initials}
    </div>
  )
}

function EmptyState({ title, sub, action }: { title: string, sub: string, action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 bg-zinc-800 rounded-[16px] flex items-center justify-center mb-4">
        <Search size={20} className="text-[#71717A]" />
      </div>
      <div className="text-sm font-medium text-white mb-1">{title}</div>
      <div className="text-xs text-[#71717A] mb-4 max-w-[280px]">{sub}</div>
      {action}
    </div>
  )
}

function Modal({ open, onClose, title, children, footer }: {
  open: boolean, onClose: () => void, title: string, children: React.ReactNode, footer?: React.ReactNode
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#18181B] border border-[#27272A] rounded-[24px] w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-[#27272A]">
          <h3 className="text-base font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{title}</h3>
          <button className="p-1 rounded-[8px] text-[#71717A] hover:text-white hover:bg-zinc-800 transition-colors" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 p-6 border-t border-[#27272A]">{footer}</div>}
      </div>
    </div>
  )
}

function FormField({ label, children, hint }: { label: string, children: React.ReactNode, hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#A1A1AA]">{label}</label>
      {children}
      {hint && <span className="text-xs text-[#71717A]">{hint}</span>}
    </div>
  )
}

function Input({ placeholder, value, onChange, type = 'text' }: {
  placeholder?: string, value?: string, onChange?: (v: string) => void, type?: string
}) {
  return (
    <input
      type={type}
      className="bg-[#09090B] border border-[#27272A] rounded-[12px] px-3 py-2 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-zinc-500 transition-colors w-full"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
    />
  )
}

function Select({ options, value, onChange }: { options: string[], value: string, onChange: (v: string) => void }) {
  return (
    <select
      className="bg-[#09090B] border border-[#27272A] rounded-[12px] px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors w-full appearance-none"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'empresas', label: 'Empresas', icon: Building2 },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'servicos', label: 'Serviços', icon: Wrench },
  { id: 'usuarios', label: 'Usuários', icon: User },
  { id: 'agendamentos', label: 'Agendamentos', icon: Calendar },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
]

const bottomItems = [
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
  { id: 'perfil', label: 'Perfil', icon: User },
  { id: 'ia', label: 'IA AutoNova', icon: Bot },
]

function Sidebar({ current, onChange, collapsed, onToggle }: {
  current: Page, onChange: (p: Page) => void, collapsed: boolean, onToggle: () => void
}) {
  return (
    <aside
      className={`flex-shrink-0 bg-[#111827] border-r border-[#27272A] flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'}`}
      style={{ height: '100vh', position: 'sticky', top: 0 }}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-[#27272A] ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-7 h-7 bg-[#22C55E] rounded-[8px] flex items-center justify-center flex-shrink-0">
          <Zap size={14} className="text-black" />
        </div>
        {!collapsed && (
          <span className="text-sm font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>AutoNova</span>
        )}
        <button
          className={`ml-auto p-1 rounded-[6px] text-[#71717A] hover:text-white hover:bg-zinc-800 transition-colors ${collapsed ? 'hidden' : ''}`}
          onClick={onToggle}
        >
          <Menu size={14} />
        </button>
      </div>
      {collapsed && (
        <button className="mx-auto mt-2 p-1 rounded-[6px] text-[#71717A] hover:text-white hover:bg-zinc-800 transition-colors" onClick={onToggle}>
          <Menu size={14} />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon
          const active = current === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id as Page)}
              className={`flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm transition-all duration-150 w-full text-left group
                ${active
                  ? 'bg-[#22C55E]/10 text-[#22C55E]'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-zinc-800/60'
                }
                ${collapsed ? 'justify-center px-2' : ''}
              `}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
              {!collapsed && active && <span className="ml-auto w-1 h-1 rounded-full bg-[#22C55E]" />}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3 border-t border-[#27272A] flex flex-col gap-0.5">
        {bottomItems.map(item => {
          const Icon = item.icon
          const active = current === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id as Page)}
              className={`flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm transition-all duration-150 w-full text-left
                ${active ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'text-[#A1A1AA] hover:text-white hover:bg-zinc-800/60'}
                ${collapsed ? 'justify-center px-2' : ''}
              `}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          )
        })}

        {/* User */}
        <div className={`flex items-center gap-3 px-3 py-2 mt-1 ${collapsed ? 'justify-center' : ''}`}>
          <Avatar name="Ana Beatriz Lima" size="xs" />
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-xs font-medium text-white truncate">Ana Beatriz</div>
              <div className="text-[10px] text-[#71717A]">Admin</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

// ─── Topbar ───────────────────────────────────────────────────────────────────

function Topbar({ page }: { page: Page }) {
  const labels: Record<Page, string[]> = {
    dashboard: ['Dashboard'],
    empresas: ['Empresas'],
    clientes: ['Clientes'],
    servicos: ['Serviços'],
    usuarios: ['Usuários'],
    agendamentos: ['Agendamentos'],
    financeiro: ['Financeiro'],
    configuracoes: ['Configurações'],
    perfil: ['Perfil'],
    ia: ['IA AutoNova'],
  }
  const crumbs = labels[page]
  return (
    <header className="h-14 border-b border-[#27272A] bg-[#09090B] flex items-center px-6 gap-4 flex-shrink-0">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm flex-1">
        <span className="text-[#71717A]">AutoNova</span>
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight size={12} className="text-[#3F3F46]" />
            <span className={i === crumbs.length - 1 ? 'text-white font-medium' : 'text-[#71717A]'}>{c}</span>
          </span>
        ))}
      </nav>
      {/* Actions */}
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
          <input
            className="bg-[#18181B] border border-[#27272A] rounded-[10px] pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-zinc-500 w-48 transition-colors"
            placeholder="Busca rápida..."
          />
        </div>
        <button className="relative p-2 rounded-[10px] text-[#71717A] hover:text-white hover:bg-zinc-800 transition-colors">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#22C55E] rounded-full" />
        </button>
        <Avatar name="Ana Beatriz Lima" size="xs" />
      </div>
    </header>
  )
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1200px]">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="MRR" value="R$ 13.600" sub="vs R$ 11.800 mês anterior" trend={{ dir: 'up', val: '+15.3%' }} mono />
        <KpiCard label="Empresas Ativas" value="6" sub="de 7 totais" trend={{ dir: 'up', val: '+2' }} />
        <KpiCard label="Agendamentos" value="189" sub="este mês" trend={{ dir: 'up', val: '+8.1%' }} />
        <KpiCard label="Ticket Médio" value="R$ 480" sub="por serviço" trend={{ dir: 'down', val: '-2.4%' }} mono />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-[#18181B] border border-[#27272A] rounded-[20px] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Receita vs Despesas</div>
              <div className="text-xs text-[#71717A] mt-0.5">Últimos 7 meses</div>
            </div>
            <Btn variant="ghost" size="xs" icon={<Download size={12} />}>Exportar</Btn>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="receitaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="despesaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DC2626" stopOpacity={0.10} />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#27272A" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#18181B', border: '1px solid #27272A', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: '#A1A1AA' }}
                formatter={(v: unknown) => [`R$ ${Number(v).toLocaleString('pt-BR')}`, '']}
              />
              <Area type="monotone" dataKey="receita" stroke="#22C55E" strokeWidth={2} fill="url(#receitaGrad)" name="Receita" />
              <Area type="monotone" dataKey="despesa" stroke="#DC2626" strokeWidth={2} fill="url(#despesaGrad)" name="Despesas" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status pie */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6">
          <div className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Distribuição Empresas</div>
          <div className="text-xs text-[#71717A] mb-4">Por status atual</div>
          <ResponsiveContainer width="100%" height={150}>
            <RPieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" strokeWidth={0}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </RPieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-[#A1A1AA]">{d.name}</span>
                </div>
                <span className="text-xs font-medium text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent appointments */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272A]">
            <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Últimos Agendamentos</span>
            <Btn variant="ghost" size="xs">Ver todos</Btn>
          </div>
          <div className="divide-y divide-[#27272A]/50">
            {agendamentos.slice(0, 4).map(a => (
              <div key={a.id} className="flex items-center gap-3 px-6 py-3.5 hover:bg-zinc-800/30 transition-colors">
                <Avatar name={a.cliente} size="xs" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{a.cliente}</div>
                  <div className="text-xs text-[#71717A] truncate">{a.servico}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <StatusBadge status={a.status} />
                  <div className="text-[10px] text-[#71717A] mt-1">{a.hora}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly bar */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6">
          <div className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Agendamentos por Dia</div>
          <div className="text-xs text-[#71717A] mb-4">Semana atual</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={agendamentosData} barSize={28} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#27272A" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#18181B', border: '1px solid #27272A', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: '#A1A1AA' }}
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              />
              <Bar dataKey="total" fill="#22C55E" radius={[6, 6, 0, 0]} name="Agendamentos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function EmpresasPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selected, setSelected] = useState<typeof empresas[0] | null>(null)
  const filtered = empresas.filter(e =>
    e.nome.toLowerCase().includes(search.toLowerCase()) ||
    e.cnpj.includes(search)
  )

  return (
    <div className="flex flex-col gap-6 p-6">
      <SectionHeader
        title="Empresas"
        subtitle={`${empresas.length} empresas cadastradas`}
        actions={
          <>
            <SearchInput placeholder="Buscar empresa..." value={search} onChange={setSearch} />
            <Btn variant="secondary" size="sm" icon={<Filter size={13} />}>Filtrar</Btn>
            <Btn variant="primary" size="sm" icon={<Plus size={13} />} onClick={() => { setSelected(null); setModalOpen(true) }}>Nova Empresa</Btn>
          </>
        }
      />

      {filtered.length === 0 ? (
        <div className="bg-[#18181B] border border-[#27272A] rounded-[20px]">
          <EmptyState
            title="Nenhuma empresa encontrada"
            sub="Tente ajustar os filtros ou adicionar uma nova empresa."
            action={<Btn variant="primary" size="sm" icon={<Plus size={13} />} onClick={() => setModalOpen(true)}>Nova Empresa</Btn>}
          />
        </div>
      ) : (
        <TableContainer>
          <thead>
            <tr>
              <Th>Empresa</Th>
              <Th>CNPJ</Th>
              <Th>Plano</Th>
              <Th>Clientes</Th>
              <Th>MRR</Th>
              <Th>Status</Th>
              <Th>Criado em</Th>
              <Th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} className="hover:bg-zinc-800/20 transition-colors group">
                <Td>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#27272A] rounded-[8px] flex items-center justify-center">
                      <Building2 size={13} className="text-[#71717A]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{e.nome}</div>
                      <div className="text-xs text-[#71717A]">{e.cidade}</div>
                    </div>
                  </div>
                </Td>
                <Td><span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-xs">{e.cnpj}</span></Td>
                <Td>
                  <Badge variant={e.plano === 'Enterprise' ? 'info' : e.plano === 'Pro' ? 'neutral' : 'neutral'}>
                    {e.plano}
                  </Badge>
                </Td>
                <Td><span className="text-white">{e.clientes}</span></Td>
                <Td>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-white text-xs">
                    R$ {e.mrr.toLocaleString('pt-BR')}
                  </span>
                </Td>
                <Td><StatusBadge status={e.status} /></Td>
                <Td>{e.criado}</Td>
                <Td>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 rounded-[6px] text-[#71717A] hover:text-white hover:bg-zinc-700 transition-colors" onClick={() => { setSelected(e); setModalOpen(true) }}>
                      <Edit2 size={13} />
                    </button>
                    <button className="p-1 rounded-[6px] text-[#71717A] hover:text-red-400 hover:bg-red-500/10 transition-colors" onClick={() => { setSelected(e); setDeleteOpen(true) }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={8}>
                <Pagination current={page} total={3} onChange={setPage} />
              </td>
            </tr>
          </tfoot>
        </TableContainer>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selected ? 'Editar Empresa' : 'Nova Empresa'}
        footer={
          <>
            <Btn variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Btn>
            <Btn variant="primary" onClick={() => setModalOpen(false)}>
              {selected ? 'Salvar Alterações' : 'Criar Empresa'}
            </Btn>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <FormField label="Razão Social">
            <Input placeholder="Ex: TechCorp Brasil Ltda" value={selected?.nome} />
          </FormField>
          <FormField label="CNPJ">
            <Input placeholder="00.000.000/0001-00" value={selected?.cnpj} />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Cidade">
              <Input placeholder="São Paulo" value={selected?.cidade} />
            </FormField>
            <FormField label="Plano">
              <Select options={['Starter', 'Pro', 'Enterprise']} value={selected?.plano || 'Pro'} onChange={() => {}} />
            </FormField>
          </div>
          <FormField label="Status">
            <Select options={['ativo', 'pendente', 'inativo']} value={selected?.status || 'ativo'} onChange={() => {}} />
          </FormField>
        </div>
      </Modal>

      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Excluir Empresa"
        footer={
          <>
            <Btn variant="secondary" onClick={() => setDeleteOpen(false)}>Cancelar</Btn>
            <Btn variant="danger" onClick={() => setDeleteOpen(false)}>Excluir</Btn>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/10 rounded-[12px]">
            <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
            <div className="text-sm text-[#A1A1AA]">
              Esta ação é irreversível. A empresa <strong className="text-white">{selected?.nome}</strong> e todos os dados associados serão removidos permanentemente.
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function ClientesPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const filtered = clientes.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="flex flex-col gap-6 p-6">
      <SectionHeader
        title="Clientes"
        subtitle={`${clientes.length} clientes cadastrados`}
        actions={
          <>
            <SearchInput placeholder="Buscar cliente..." value={search} onChange={setSearch} />
            <Btn variant="secondary" size="sm" icon={<Filter size={13} />}>Filtrar</Btn>
            <Btn variant="primary" size="sm" icon={<Plus size={13} />}>Novo Cliente</Btn>
          </>
        }
      />
      {filtered.length === 0 ? (
        <div className="bg-[#18181B] border border-[#27272A] rounded-[20px]">
          <EmptyState title="Nenhum cliente encontrado" sub="Tente ajustar os termos de busca." />
        </div>
      ) : (
        <TableContainer>
          <thead>
            <tr>
              <Th>Cliente</Th>
              <Th>Empresa</Th>
              <Th>Status</Th>
              <Th>Agendamentos</Th>
              <Th>Total Gasto</Th>
              <Th>Último Acesso</Th>
              <Th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-zinc-800/20 transition-colors group">
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar name={c.nome} size="sm" />
                    <div>
                      <div className="text-sm font-medium text-white">{c.nome}</div>
                      <div className="text-xs text-[#71717A]">{c.email}</div>
                    </div>
                  </div>
                </Td>
                <Td>{c.empresa}</Td>
                <Td><StatusBadge status={c.status} /></Td>
                <Td><span className="text-white">{c.agendamentos}</span></Td>
                <Td>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-white text-xs">
                    R$ {c.gasto.toLocaleString('pt-BR')}
                  </span>
                </Td>
                <Td>{c.ultimo}</Td>
                <Td>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 rounded-[6px] text-[#71717A] hover:text-white hover:bg-zinc-700 transition-colors"><Eye size={13} /></button>
                    <button className="p-1 rounded-[6px] text-[#71717A] hover:text-white hover:bg-zinc-700 transition-colors"><Edit2 size={13} /></button>
                    <button className="p-1 rounded-[6px] text-[#71717A] hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={13} /></button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr><td colSpan={7}><Pagination current={page} total={3} onChange={setPage} /></td></tr>
          </tfoot>
        </TableContainer>
      )}
    </div>
  )
}

function ServicosPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const filtered = servicos.filter(s => s.nome.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="flex flex-col gap-6 p-6">
      <SectionHeader
        title="Serviços"
        subtitle="Catálogo de serviços disponíveis"
        actions={
          <>
            <SearchInput placeholder="Buscar serviço..." value={search} onChange={setSearch} />
            <Btn variant="primary" size="sm" icon={<Plus size={13} />}>Novo Serviço</Btn>
          </>
        }
      />
      <TableContainer>
        <thead>
          <tr>
            <Th>Serviço</Th>
            <Th>Categoria</Th>
            <Th>Duração</Th>
            <Th>Preço</Th>
            <Th>Agendamentos</Th>
            <Th>Status</Th>
            <Th className="w-10" />
          </tr>
        </thead>
        <tbody>
          {filtered.map(s => (
            <tr key={s.id} className="hover:bg-zinc-800/20 transition-colors group">
              <Td>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#27272A] rounded-[8px] flex items-center justify-center">
                    <Wrench size={13} className="text-[#71717A]" />
                  </div>
                  <span className="text-sm font-medium text-white">{s.nome}</span>
                </div>
              </Td>
              <Td><Badge variant="neutral">{s.categoria}</Badge></Td>
              <Td>{s.duracao}</Td>
              <Td>
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-white text-xs">
                  R$ {s.preco.toLocaleString('pt-BR')}
                </span>
              </Td>
              <Td><span className="text-white">{s.agendamentos}</span></Td>
              <Td><Badge variant={s.ativo ? 'success' : 'neutral'}>{s.ativo ? 'Ativo' : 'Inativo'}</Badge></Td>
              <Td>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 rounded-[6px] text-[#71717A] hover:text-white hover:bg-zinc-700 transition-colors"><Edit2 size={13} /></button>
                  <button className="p-1 rounded-[6px] text-[#71717A] hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={13} /></button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr><td colSpan={7}><Pagination current={page} total={2} onChange={setPage} /></td></tr>
        </tfoot>
      </TableContainer>
    </div>
  )
}

function UsuariosPage() {
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const filtered = usuarios.filter(u => u.nome.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="flex flex-col gap-6 p-6">
      <SectionHeader
        title="Usuários"
        subtitle="Equipe com acesso ao sistema"
        actions={
          <>
            <SearchInput placeholder="Buscar usuário..." value={search} onChange={setSearch} />
            <Btn variant="primary" size="sm" icon={<Plus size={13} />} onClick={() => setModalOpen(true)}>Convidar</Btn>
          </>
        }
      />
      <TableContainer>
        <thead>
          <tr>
            <Th>Usuário</Th>
            <Th>Cargo</Th>
            <Th>Permissão</Th>
            <Th>Status</Th>
            <Th>Último Acesso</Th>
            <Th className="w-10" />
          </tr>
        </thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id} className="hover:bg-zinc-800/20 transition-colors group">
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar name={u.nome} size="sm" />
                  <div>
                    <div className="text-sm font-medium text-white">{u.nome}</div>
                    <div className="text-xs text-[#71717A]">{u.email}</div>
                  </div>
                </div>
              </Td>
              <Td>{u.cargo}</Td>
              <Td><StatusBadge status={u.role} /></Td>
              <Td><StatusBadge status={u.status} /></Td>
              <Td>{u.ultimo}</Td>
              <Td>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 rounded-[6px] text-[#71717A] hover:text-white hover:bg-zinc-700 transition-colors"><Edit2 size={13} /></button>
                  <button className="p-1 rounded-[6px] text-[#71717A] hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={13} /></button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableContainer>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Convidar Usuário"
        footer={
          <>
            <Btn variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Btn>
            <Btn variant="primary" onClick={() => setModalOpen(false)}>Enviar Convite</Btn>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <FormField label="E-mail">
            <Input placeholder="colaborador@empresa.com" type="email" />
          </FormField>
          <FormField label="Cargo">
            <Input placeholder="Ex: Atendente" />
          </FormField>
          <FormField label="Permissão">
            <Select options={['admin', 'manager', 'viewer']} value="viewer" onChange={() => {}} />
          </FormField>
        </div>
      </Modal>
    </div>
  )
}

function AgendamentosPage() {
  const [view, setView] = useState<'tabela' | 'lista'>('tabela')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const filtered = agendamentos.filter(a =>
    a.cliente.toLowerCase().includes(search.toLowerCase()) ||
    a.servico.toLowerCase().includes(search.toLowerCase())
  )

  const statusIcon = (s: string) => {
    if (s === 'confirmado') return <CheckCircle size={13} className="text-emerald-400" />
    if (s === 'em_andamento') return <RefreshCw size={13} className="text-blue-400" />
    if (s === 'cancelado') return <XCircle size={13} className="text-red-400" />
    return <Clock size={13} className="text-amber-400" />
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <SectionHeader
        title="Agendamentos"
        subtitle={`${agendamentos.length} agendamentos nesta semana`}
        actions={
          <>
            <SearchInput placeholder="Buscar..." value={search} onChange={setSearch} />
            <div className="flex bg-[#18181B] border border-[#27272A] rounded-[10px] p-0.5">
              {(['tabela', 'lista'] as const).map(v => (
                <button
                  key={v}
                  className={`px-3 py-1 rounded-[8px] text-xs font-medium transition-colors capitalize ${view === v ? 'bg-[#27272A] text-white' : 'text-[#71717A] hover:text-white'}`}
                  onClick={() => setView(v)}
                >
                  {v}
                </button>
              ))}
            </div>
            <Btn variant="primary" size="sm" icon={<Plus size={13} />}>Novo Agendamento</Btn>
          </>
        }
      />

      {view === 'tabela' ? (
        <TableContainer>
          <thead>
            <tr>
              <Th>Cliente</Th>
              <Th>Serviço</Th>
              <Th>Data</Th>
              <Th>Hora</Th>
              <Th>Técnico</Th>
              <Th>Status</Th>
              <Th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="hover:bg-zinc-800/20 transition-colors group">
                <Td>
                  <div className="flex items-center gap-2">
                    <Avatar name={a.cliente} size="xs" />
                    <div>
                      <div className="text-sm font-medium text-white">{a.cliente}</div>
                      <div className="text-xs text-[#71717A]">{a.empresa}</div>
                    </div>
                  </div>
                </Td>
                <Td>{a.servico}</Td>
                <Td>{a.data}</Td>
                <Td><span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-xs">{a.hora}</span></Td>
                <Td>{a.tecnico}</Td>
                <Td>
                  <div className="flex items-center gap-1.5">
                    {statusIcon(a.status)}
                    <StatusBadge status={a.status} />
                  </div>
                </Td>
                <Td>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 rounded-[6px] text-[#71717A] hover:text-white hover:bg-zinc-700 transition-colors"><Edit2 size={13} /></button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr><td colSpan={7}><Pagination current={page} total={4} onChange={setPage} /></td></tr>
          </tfoot>
        </TableContainer>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map(a => (
            <div key={a.id} className="bg-[#18181B] border border-[#27272A] rounded-[16px] px-5 py-4 flex items-center gap-4 hover:border-zinc-600 transition-colors group">
              <div className="w-10 h-10 bg-[#27272A] rounded-[12px] flex items-center justify-center flex-shrink-0">
                {statusIcon(a.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{a.cliente}</span>
                  <ChevronRight size={12} className="text-[#3F3F46]" />
                  <span className="text-sm text-[#A1A1AA]">{a.servico}</span>
                </div>
                <div className="text-xs text-[#71717A] mt-0.5">{a.empresa} · {a.tecnico}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-medium text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{a.hora}</div>
                <div className="text-xs text-[#71717A]">{a.data}</div>
              </div>
              <StatusBadge status={a.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FinanceiroPage() {
  const [tab, setTab] = useState<'visao' | 'transacoes' | 'faturas'>('visao')
  const receita = transacoes.filter(t => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0)
  const despesa = transacoes.filter(t => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0)

  return (
    <div className="flex flex-col gap-6 p-6">
      <SectionHeader title="Financeiro" subtitle="Fluxo de caixa e transações" />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Receita Mês" value={`R$ ${receita.toLocaleString('pt-BR')}`} sub="Julho 2025" trend={{ dir: 'up', val: '+18%' }} mono />
        <KpiCard label="Despesas Mês" value={`R$ ${despesa.toLocaleString('pt-BR')}`} sub="Julho 2025" trend={{ dir: 'up', val: '+4%' }} mono />
        <KpiCard label="Lucro Líquido" value={`R$ ${(receita - despesa).toLocaleString('pt-BR')}`} sub="Julho 2025" trend={{ dir: 'up', val: '+28%' }} mono />
        <KpiCard label="Pendente" value="R$ 1.200" sub="2 faturas em aberto" trend={{ dir: 'down', val: '-1' }} mono />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#27272A]">
        {(['visao', 'transacoes', 'faturas'] as const).map(t => (
          <button
            key={t}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${tab === t ? 'border-[#22C55E] text-white' : 'border-transparent text-[#71717A] hover:text-white'}`}
            onClick={() => setTab(t)}
          >
            {t === 'visao' ? 'Visão Geral' : t === 'transacoes' ? 'Transações' : 'Faturas'}
          </button>
        ))}
      </div>

      {tab === 'visao' && (
        <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6">
          <div className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Receita vs Despesas — 7 meses</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData} barGap={4} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#27272A" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717A', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#18181B', border: '1px solid #27272A', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: '#A1A1AA' }}
                formatter={(v: unknown) => [`R$ ${Number(v).toLocaleString('pt-BR')}`, '']}
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              />
              <Bar dataKey="receita" fill="#22C55E" radius={[4, 4, 0, 0]} name="Receita" barSize={20} />
              <Bar dataKey="despesa" fill="#DC2626" radius={[4, 4, 0, 0]} name="Despesas" barSize={20} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === 'transacoes' && (
        <TableContainer>
          <thead>
            <tr>
              <Th>Descrição</Th>
              <Th>Tipo</Th>
              <Th>Valor</Th>
              <Th>Método</Th>
              <Th>Data</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map(t => (
              <tr key={t.id} className="hover:bg-zinc-800/20 transition-colors">
                <Td>
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-[8px] flex items-center justify-center ${t.tipo === 'receita' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                      {t.tipo === 'receita' ? <ArrowUpRight size={13} className="text-emerald-400" /> : <ArrowDownRight size={13} className="text-red-400" />}
                    </div>
                    <span className="text-sm text-white">{t.descricao}</span>
                  </div>
                </Td>
                <Td><StatusBadge status={t.tipo} /></Td>
                <Td>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className={`text-sm font-medium ${t.tipo === 'receita' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {t.tipo === 'receita' ? '+' : '-'} R$ {t.valor.toLocaleString('pt-BR')}
                  </span>
                </Td>
                <Td><Badge variant="neutral">{t.metodo}</Badge></Td>
                <Td>{t.data}</Td>
                <Td><StatusBadge status={t.status} /></Td>
              </tr>
            ))}
          </tbody>
        </TableContainer>
      )}

      {tab === 'faturas' && (
        <div className="bg-[#18181B] border border-[#27272A] rounded-[20px]">
          <EmptyState
            title="Módulo de Faturas"
            sub="Geração automática de faturas para clientes Enterprise. Em desenvolvimento."
            action={<Badge variant="warning">Em breve</Badge>}
          />
        </div>
      )}
    </div>
  )
}

function ConfiguracoesPage() {
  const [section, setSection] = useState('geral')
  const sections = [
    { id: 'geral', label: 'Geral', icon: Settings },
    { id: 'integracoes', label: 'Integrações', icon: Globe },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <SectionHeader title="Configurações" subtitle="Preferências e integrações do sistema" />
      <div className="flex gap-6">
        {/* Sidebar interno */}
        <div className="w-44 flex-shrink-0">
          <div className="flex flex-col gap-0.5">
            {sections.map(s => {
              const Icon = s.icon
              return (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-sm transition-colors w-full text-left ${section === s.id ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'text-[#A1A1AA] hover:text-white hover:bg-zinc-800'}`}
                >
                  <Icon size={14} />
                  {s.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {section === 'geral' && (
            <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6 flex flex-col gap-6">
              <div>
                <div className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Informações da Conta</div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Nome da Empresa"><Input value="AutoNova Sistemas" /></FormField>
                    <FormField label="Domínio"><Input value="autonova.io" /></FormField>
                  </div>
                  <FormField label="E-mail de Contato"><Input value="contato@autonova.io" type="email" /></FormField>
                  <FormField label="Fuso Horário">
                    <Select options={['America/Sao_Paulo', 'America/Manaus', 'America/Fortaleza']} value="America/Sao_Paulo" onChange={() => {}} />
                  </FormField>
                </div>
              </div>
              <div className="pt-4 border-t border-[#27272A] flex justify-end">
                <Btn variant="primary">Salvar Alterações</Btn>
              </div>
            </div>
          )}

          {section === 'integracoes' && (
            <div className="flex flex-col gap-3">
              {[
                { name: 'Stripe', desc: 'Pagamentos e assinaturas', icon: CreditCard, ativo: true },
                { name: 'SendGrid', desc: 'E-mails transacionais', icon: Mail, ativo: true },
                { name: 'Twilio', desc: 'SMS e WhatsApp', icon: Phone, ativo: false },
                { name: 'Google Calendar', desc: 'Sincronização de agenda', icon: Calendar, ativo: false },
              ].map(i => {
                const Icon = i.icon
                return (
                  <div key={i.name} className="bg-[#18181B] border border-[#27272A] rounded-[16px] px-5 py-4 flex items-center gap-4">
                    <div className="w-9 h-9 bg-[#27272A] rounded-[10px] flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#A1A1AA]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{i.name}</div>
                      <div className="text-xs text-[#71717A]">{i.desc}</div>
                    </div>
                    <Badge variant={i.ativo ? 'success' : 'neutral'}>{i.ativo ? 'Conectado' : 'Desconectado'}</Badge>
                    <Btn variant={i.ativo ? 'secondary' : 'primary'} size="xs">
                      {i.ativo ? 'Configurar' : 'Conectar'}
                    </Btn>
                  </div>
                )
              })}
            </div>
          )}

          {section === 'notificacoes' && (
            <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6 flex flex-col gap-5">
              {[
                { label: 'Novo agendamento', desc: 'Quando um cliente agenda um serviço' },
                { label: 'Pagamento recebido', desc: 'Confirmação de transações' },
                { label: 'Empresa inativa', desc: 'Alerta de churn potencial' },
                { label: 'Relatório semanal', desc: 'Resumo automático toda segunda-feira' },
              ].map((n, i) => (
                <div key={i} className={`flex items-center justify-between ${i > 0 ? 'pt-5 border-t border-[#27272A]' : ''}`}>
                  <div>
                    <div className="text-sm font-medium text-white">{n.label}</div>
                    <div className="text-xs text-[#71717A] mt-0.5">{n.desc}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-9 h-5 rounded-full flex items-center transition-colors cursor-pointer ${i % 2 === 0 ? 'bg-[#22C55E] justify-end pr-0.5' : 'bg-[#27272A] justify-start pl-0.5'}`}>
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {section === 'seguranca' && (
            <div className="flex flex-col gap-4">
              <div className="bg-[#18181B] border border-[#27272A] rounded-[16px] p-5 flex items-center gap-4">
                <div className="w-9 h-9 bg-emerald-500/10 rounded-[10px] flex items-center justify-center">
                  <Shield size={16} className="text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Autenticação em Dois Fatores</div>
                  <div className="text-xs text-[#71717A]">Sua conta está protegida com 2FA ativo</div>
                </div>
                <Badge variant="success">Ativo</Badge>
              </div>
              <div className="bg-[#18181B] border border-[#27272A] rounded-[16px] p-5 flex items-center gap-4">
                <div className="w-9 h-9 bg-[#27272A] rounded-[10px] flex items-center justify-center">
                  <Key size={16} className="text-[#71717A]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Senha</div>
                  <div className="text-xs text-[#71717A]">Última alteração há 42 dias</div>
                </div>
                <Btn variant="secondary" size="xs">Alterar</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PerfilPage() {
  const [tab, setTab] = useState<'info' | 'sessoes' | '2fa'>('info')
  return (
    <div className="flex flex-col gap-6 p-6 max-w-2xl">
      <SectionHeader title="Perfil" subtitle="Gerencie sua conta pessoal" />

      {/* Avatar section */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6 flex items-center gap-5">
        <Avatar name="Ana Beatriz Lima" size="md" />
        <div className="flex-1">
          <div className="text-base font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Ana Beatriz Lima</div>
          <div className="text-sm text-[#71717A]">ana@autonova.io</div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="info">Admin</Badge>
            <Badge variant="success">Ativo</Badge>
          </div>
        </div>
        <Btn variant="secondary" size="sm" icon={<Upload size={13} />}>Foto</Btn>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#27272A]">
        {(['info', 'sessoes', '2fa'] as const).map(t => (
          <button
            key={t}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === t ? 'border-[#22C55E] text-white' : 'border-transparent text-[#71717A] hover:text-white'}`}
            onClick={() => setTab(t)}
          >
            {t === 'info' ? 'Informações' : t === 'sessoes' ? 'Sessões' : '2FA'}
          </button>
        ))}
      </div>

      {tab === 'info' && (
        <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Nome"><Input value="Ana Beatriz" /></FormField>
            <FormField label="Sobrenome"><Input value="Lima" /></FormField>
          </div>
          <FormField label="E-mail"><Input value="ana@autonova.io" type="email" /></FormField>
          <FormField label="Cargo"><Input value="Administradora" /></FormField>
          <FormField label="Telefone"><Input value="+55 11 99999-0000" /></FormField>
          <div className="pt-4 border-t border-[#27272A] flex justify-end">
            <Btn variant="primary">Salvar</Btn>
          </div>
        </div>
      )}

      {tab === 'sessoes' && (
        <div className="flex flex-col gap-3">
          {[
            { browser: 'Chrome 126', os: 'macOS 14', ip: '187.45.23.11', local: 'São Paulo, BR', ativo: true, quando: 'Agora' },
            { browser: 'Safari Mobile', os: 'iOS 17', ip: '187.45.23.12', local: 'São Paulo, BR', ativo: false, quando: '2h atrás' },
            { browser: 'Firefox 127', os: 'Windows 11', ip: '201.12.54.89', local: 'Curitiba, BR', ativo: false, quando: '3 dias atrás' },
          ].map((s, i) => (
            <div key={i} className="bg-[#18181B] border border-[#27272A] rounded-[14px] px-5 py-4 flex items-center gap-4">
              <div className="w-8 h-8 bg-[#27272A] rounded-[8px] flex items-center justify-center">
                <Smartphone size={14} className="text-[#71717A]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{s.browser}</span>
                  {s.ativo && <Badge variant="success">Atual</Badge>}
                </div>
                <div className="text-xs text-[#71717A]">{s.os} · {s.ip} · {s.local}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#71717A]">{s.quando}</div>
                {!s.ativo && (
                  <button className="text-xs text-red-400 hover:text-red-300 mt-1 transition-colors">Encerrar</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === '2fa' && (
        <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6 flex flex-col gap-5">
          <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-[12px]">
            <Shield size={18} className="text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-white">2FA Ativo</div>
              <div className="text-xs text-[#71717A]">Sua conta está protegida com autenticador TOTP</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <FormField label="Código de Verificação" hint="Digite o código do seu aplicativo autenticador">
              <Input placeholder="000 000" />
            </FormField>
          </div>
          <div className="flex justify-between">
            <Btn variant="ghost" size="sm">Ver códigos de recuperação</Btn>
            <Btn variant="danger" size="sm">Desativar 2FA</Btn>
          </div>
        </div>
      )}
    </div>
  )
}

function IAPage() {
  const [messages, setMessages] = useState(chatMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages(m => [...m, userMsg])
    setInput('')
    setLoading(true)
    setTimeout(() => {
      setMessages(m => [...m, {
        role: 'assistant',
        content: 'Com base nos dados disponíveis, posso analisar esse ponto com mais detalhes. Gostaria que eu gere um relatório completo ou apenas um resumo executivo?'
      }])
      setLoading(false)
    }, 1200)
  }

  const suggestions = [
    'Empresas em risco de churn',
    'Relatório financeiro julho',
    'Técnicos mais produtivos',
    'Serviços mais agendados',
  ]

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#27272A]">
          <div className="w-8 h-8 bg-[#22C55E]/10 rounded-[10px] flex items-center justify-center">
            <Sparkles size={15} className="text-[#22C55E]" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>IA AutoNova</div>
            <div className="text-xs text-[#71717A]">Assistente inteligente · GPT-4o</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full" />
            <span className="text-xs text-[#71717A]">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {m.role === 'assistant' && (
                <div className="w-7 h-7 bg-[#22C55E]/10 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={13} className="text-[#22C55E]" />
                </div>
              )}
              <div className={`max-w-[70%] rounded-[16px] px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                m.role === 'user'
                  ? 'bg-[#22C55E]/10 text-white border border-[#22C55E]/20 rounded-tr-[4px]'
                  : 'bg-[#18181B] text-[#A1A1AA] border border-[#27272A] rounded-tl-[4px]'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-[#22C55E]/10 rounded-[8px] flex items-center justify-center flex-shrink-0">
                <Sparkles size={13} className="text-[#22C55E]" />
              </div>
              <div className="bg-[#18181B] border border-[#27272A] rounded-[16px] rounded-tl-[4px] px-4 py-3 flex items-center gap-1.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-[#71717A] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="px-6 pb-3 flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button
              key={s}
              className="px-3 py-1.5 bg-[#18181B] border border-[#27272A] rounded-[10px] text-xs text-[#A1A1AA] hover:text-white hover:border-zinc-500 transition-colors"
              onClick={() => setInput(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-6 pb-5">
          <div className="flex items-end gap-2 bg-[#18181B] border border-[#27272A] rounded-[16px] p-3 focus-within:border-zinc-500 transition-colors">
            <textarea
              className="flex-1 bg-transparent text-sm text-white placeholder-[#71717A] resize-none focus:outline-none min-h-[20px] max-h-32"
              placeholder="Pergunte algo sobre o AutoNova..."
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={1}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            />
            <button
              className={`p-2 rounded-[10px] transition-colors flex-shrink-0 ${input.trim() ? 'bg-[#22C55E] text-black hover:bg-[#16A34A]' : 'bg-[#27272A] text-[#71717A]'}`}
              onClick={send}
              disabled={!input.trim()}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar — histórico */}
      <div className="w-56 border-l border-[#27272A] flex flex-col overflow-hidden hidden lg:flex">
        <div className="px-4 py-4 border-b border-[#27272A]">
          <div className="text-xs font-medium text-[#71717A] uppercase tracking-wider">Histórico</div>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {[
            { title: 'Análise de churn', time: 'Hoje' },
            { title: 'Relatório financeiro', time: 'Ontem' },
            { title: 'Ranking de clientes', time: '11 Jul' },
            { title: 'Previsão de demanda', time: '10 Jul' },
            { title: 'KPIs do trimestre', time: '08 Jul' },
          ].map((h, i) => (
            <button key={i} className="w-full px-4 py-2.5 text-left hover:bg-zinc-800/50 transition-colors group">
              <div className="text-xs font-medium text-[#A1A1AA] group-hover:text-white truncate transition-colors">{h.title}</div>
              <div className="text-[10px] text-[#71717A] mt-0.5">{h.time}</div>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-[#27272A]">
          <Btn variant="ghost" size="xs" icon={<Plus size={12} />}>Nova conversa</Btn>
        </div>
      </div>
    </div>
  )
}

// ─── App Shell ────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const [collapsed, setCollapsed] = useState(false)

  const pages: Record<Page, React.ReactNode> = {
    dashboard: <DashboardPage />,
    empresas: <EmpresasPage />,
    clientes: <ClientesPage />,
    servicos: <ServicosPage />,
    usuarios: <UsuariosPage />,
    agendamentos: <AgendamentosPage />,
    financeiro: <FinanceiroPage />,
    configuracoes: <ConfiguracoesPage />,
    perfil: <PerfilPage />,
    ia: <IAPage />,
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#09090B]">
      <Sidebar current={page} onChange={setPage} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar page={page} />
        <main className="flex-1 overflow-y-auto">
          {pages[page]}
        </main>
      </div>
    </div>
  )
}
