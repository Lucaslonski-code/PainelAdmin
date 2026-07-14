import React, { useState } from 'react';
import { Plus, Wrench, Edit2, Trash2 } from 'lucide-react';
import { servicos } from '../data';
import {
  SectionHeader, SearchInput, Btn, TableContainer, Th, Td, Badge, Pagination
} from '../components/ui';

export function ServicosPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const filtered = servicos.filter(s => s.nome.toLowerCase().includes(search.toLowerCase()));
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
  );
}
