import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { transacoes, revenueData } from '../data';
import {
  SectionHeader, KpiCard, TableContainer, Th, Td, StatusBadge, Badge, EmptyState
} from '../components/ui';

export function FinanceiroPage() {
  const [tab, setTab] = useState<'visao' | 'transacoes' | 'faturas'>('visao');
  const receita = transacoes.filter(t => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0);
  const despesa = transacoes.filter(t => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0);

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
  );
}
