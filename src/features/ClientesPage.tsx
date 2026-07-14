import React, { useState } from 'react';
import { Filter, Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import { clientes } from '../data';
import {
  SectionHeader, SearchInput, Btn, TableContainer, Th, Td, Avatar,
  StatusBadge, Pagination, EmptyState
} from '../components/ui';

export function ClientesPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const filtered = clientes.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );
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
        <div className="bg-[#0F172A]/80 border border-slate-700 rounded-xl shadow-sm shadow-slate-950/10">
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
              <tr key={c.id} className="hover:bg-slate-850/40 border-b border-slate-800/30 last:border-0 transition-colors group">
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar name={c.nome} size="sm" />
                    <div>
                      <div className="text-sm font-semibold text-white">{c.nome}</div>
                      <div className="text-xs text-slate-400">{c.email}</div>
                    </div>
                  </div>
                </Td>
                <Td>{c.empresa}</Td>
                <Td><StatusBadge status={c.status} /></Td>
                <Td><span className="text-white font-medium">{c.agendamentos}</span></Td>
                <Td>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-slate-200 text-xs font-semibold">
                    R$ {c.gasto.toLocaleString('pt-BR')}
                  </span>
                </Td>
                <Td>{c.ultimo}</Td>
                <Td>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Eye size={13} /></button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Edit2 size={13} /></button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={13} /></button>
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
  );
}
