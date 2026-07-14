import React, { useState } from 'react';
import { ChevronRight, Plus, Edit2, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { agendamentos } from '../data';
import {
  SectionHeader, SearchInput, Btn, TableContainer, Th, Td, Avatar, StatusBadge, Pagination
} from '../components/ui';

export function AgendamentosPage() {
  const [view, setView] = useState<'tabela' | 'lista'>('tabela');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const filtered = agendamentos.filter(a =>
    a.cliente.toLowerCase().includes(search.toLowerCase()) ||
    a.servico.toLowerCase().includes(search.toLowerCase())
  );

  const statusIcon = (s: string) => {
    if (s === 'confirmado') return <CheckCircle size={13} className="text-emerald-400" />;
    if (s === 'em_andamento') return <RefreshCw size={13} className="text-blue-400" />;
    if (s === 'cancelado') return <XCircle size={13} className="text-red-400" />;
    return <Clock size={13} className="text-amber-400" />;
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <SectionHeader
        title="Agendamentos"
        subtitle={`${agendamentos.length} agendamentos nesta semana`}
        actions={
          <>
            <SearchInput placeholder="Buscar..." value={search} onChange={setSearch} />
            <div className="flex bg-[#0F172A] border border-slate-700 rounded-lg p-0.5">
              {(['tabela', 'lista'] as const).map(v => (
                <button
                  key={v}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors capitalize ${view === v ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
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
              <tr key={a.id} className="hover:bg-slate-850/40 border-b border-slate-800/30 last:border-0 transition-colors group">
                <Td>
                  <div className="flex items-center gap-2">
                    <Avatar name={a.cliente} size="xs" />
                    <div>
                      <div className="text-sm font-semibold text-white">{a.cliente}</div>
                      <div className="text-xs text-slate-400">{a.empresa}</div>
                    </div>
                  </div>
                </Td>
                <Td>{a.servico}</Td>
                <Td>{a.data}</Td>
                <Td><span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-xs text-slate-200 font-medium">{a.hora}</span></Td>
                <Td>{a.tecnico}</Td>
                <Td>
                  <div className="flex items-center gap-1.5">
                    {statusIcon(a.status)}
                    <StatusBadge status={a.status} />
                  </div>
                </Td>
                <Td>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Edit2 size={13} /></button>
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
            <div key={a.id} className="bg-[#0F172A]/80 border border-slate-800 rounded-xl px-5 py-4 flex items-center gap-4 hover:border-slate-600 transition-colors group shadow-sm shadow-slate-950/10">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-700">
                {statusIcon(a.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{a.cliente}</span>
                  <ChevronRight size={12} className="text-slate-600" />
                  <span className="text-sm text-slate-300">{a.servico}</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{a.empresa} · {a.tecnico}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-semibold text-slate-200" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{a.hora}</div>
                <div className="text-xs text-slate-400">{a.data}</div>
              </div>
              <StatusBadge status={a.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
