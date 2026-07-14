import React from 'react';
import { Download } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell
} from 'recharts';
import { revenueData, agendamentosData, pieData, agendamentos } from '../data';
import { KpiCard, Btn, StatusBadge, Avatar } from '../components/ui';

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1200px] text-slate-300">
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
        <div className="lg:col-span-2 bg-[#0F172A]/80 border border-slate-700/80 rounded-xl p-6 shadow-sm shadow-slate-950/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm font-semibold text-white uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Receita vs Despesas</div>
              <div className="text-xs text-slate-400 mt-0.5">Últimos 7 meses</div>
            </div>
            <Btn variant="secondary" size="xs" icon={<Download size={12} />}>Exportar</Btn>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="receitaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="despesaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.10} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 12, color: '#F1F5F9' }}
                labelStyle={{ color: '#94A3B8' }}
                formatter={(v: unknown) => [`R$ ${Number(v).toLocaleString('pt-BR')}`, '']}
              />
              <Area type="monotone" dataKey="receita" stroke="#10B981" strokeWidth={2} fill="url(#receitaGrad)" name="Receita" />
              <Area type="monotone" dataKey="despesa" stroke="#EF4444" strokeWidth={2} fill="url(#despesaGrad)" name="Despesas" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status pie */}
        <div className="bg-[#0F172A]/80 border border-slate-700/80 rounded-xl p-6 shadow-sm shadow-slate-950/10">
          <div className="text-sm font-semibold text-white mb-1 uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Distribuição Empresas</div>
          <div className="text-xs text-slate-400 mb-4">Por status atual</div>
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
                  <span className="text-xs text-slate-400">{d.name}</span>
                </div>
                <span className="text-xs font-semibold text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent appointments */}
        <div className="bg-[#0F172A]/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm shadow-slate-950/10">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
            <span className="text-sm font-semibold text-white uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Últimos Agendamentos</span>
            <Btn variant="ghost" size="xs">Ver todos</Btn>
          </div>
          <div className="divide-y divide-slate-800/80">
            {agendamentos.slice(0, 4).map(a => (
              <div key={a.id} className="flex items-center gap-3 px-6 py-3.5 hover:bg-slate-800/20 transition-colors">
                <Avatar name={a.cliente} size="xs" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{a.cliente}</div>
                  <div className="text-xs text-slate-400 truncate">{a.servico}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <StatusBadge status={a.status} />
                  <div className="text-[10px] text-slate-500 mt-1">{a.hora}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly bar */}
        <div className="bg-[#0F172A]/80 border border-slate-700/80 rounded-xl p-6 shadow-sm shadow-slate-950/10">
          <div className="text-sm font-semibold text-white mb-1 uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Agendamentos por Dia</div>
          <div className="text-xs text-slate-400 mb-4">Semana atual</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={agendamentosData} barSize={28} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 12, color: '#F1F5F9' }}
                labelStyle={{ color: '#94A3B8' }}
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              />
              <Bar dataKey="total" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Agendamentos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
