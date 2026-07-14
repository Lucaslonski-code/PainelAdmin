import React from 'react';
import { ChevronRight, Search, Bell } from 'lucide-react';
import { Page } from '../types';
import { Avatar } from './ui';

interface TopbarProps {
  page: Page;
}

export function Topbar({ page }: TopbarProps) {
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
  };
  const crumbs = labels[page];
  return (
    <header className="h-14 border-b border-slate-700 bg-[#1E293B] flex items-center px-6 gap-4 flex-shrink-0 shadow-sm shadow-slate-950/10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs flex-1 uppercase tracking-wider font-semibold">
        <span className="text-slate-400">AutoNova</span>
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight size={12} className="text-slate-600" />
            <span className={i === crumbs.length - 1 ? 'text-white' : 'text-slate-400'}>{c}</span>
          </span>
        ))}
      </nav>
      {/* Actions */}
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            className="bg-[#0F172A] border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-48 transition-colors"
            placeholder="Busca rápida..."
          />
        </div>
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-sm shadow-blue-900/40" />
        </button>
        <Avatar name="Ana Beatriz Lima" size="xs" />
      </div>
    </header>
  );
}
