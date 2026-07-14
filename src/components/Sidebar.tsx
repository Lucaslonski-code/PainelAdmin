import React from 'react';
import {
  LayoutDashboard, Building2, Users, Wrench, Calendar, DollarSign,
  Settings, User, Bot, Menu, Zap
} from 'lucide-react';
import { Page } from '../types';
import { Avatar } from './ui';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'empresas', label: 'Empresas', icon: Building2 },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'servicos', label: 'Serviços', icon: Wrench },
  { id: 'usuarios', label: 'Usuários', icon: User },
  { id: 'agendamentos', label: 'Agendamentos', icon: Calendar },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
];

const bottomItems = [
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
  { id: 'perfil', label: 'Perfil', icon: User },
  { id: 'ia', label: 'IA AutoNova', icon: Bot },
];

interface SidebarProps {
  current: Page;
  onChange: (p: Page) => void;
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ current, onChange, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`flex-shrink-0 bg-[#0F172A] border-r border-slate-700 flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'}`}
      style={{ height: '100vh', position: 'sticky', top: 0 }}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-slate-700 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center flex-shrink-0 font-bold text-white shadow-md shadow-blue-900/30">
          <Zap size={14} className="text-white fill-white" />
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold tracking-wider text-white uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>AutoNova</span>
        )}
        <button
          className={`ml-auto p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${collapsed ? 'hidden' : ''}`}
          onClick={onToggle}
        >
          <Menu size={14} />
        </button>
      </div>
      {collapsed && (
        <button className="mx-auto mt-2 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" onClick={onToggle}>
          <Menu size={14} />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id as Page)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all duration-150 w-full text-left group border
                ${active
                  ? 'bg-blue-600/10 text-blue-400 border-blue-600/20 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border-transparent'
                }
                ${collapsed ? 'justify-center px-2' : ''}
              `}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
              {!collapsed && active && <span className="ml-auto w-1 h-1 rounded-full bg-blue-400" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3 border-t border-slate-700 flex flex-col gap-1">
        {bottomItems.map(item => {
          const Icon = item.icon;
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id as Page)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all duration-150 w-full text-left border
                ${active 
                  ? 'bg-blue-600/10 text-blue-400 border-blue-600/20 font-semibold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border-transparent'}
                ${collapsed ? 'justify-center px-2' : ''}
              `}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}

        {/* User */}
        <div className={`flex items-center gap-3 px-3 py-2 mt-1 border-t border-slate-800/50 pt-3 ${collapsed ? 'justify-center' : ''}`}>
          <Avatar name="Ana Beatriz Lima" size="xs" />
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">Ana Beatriz</div>
              <div className="text-[10px] text-slate-500 font-medium">Admin</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
