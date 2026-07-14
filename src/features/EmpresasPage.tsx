import React, { useState } from 'react';
import { Filter, Plus, Building2, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { empresas } from '../data';
import {
  SectionHeader, SearchInput, Btn, TableContainer, Th, Td, Badge,
  StatusBadge, Pagination, Modal, EmptyState, FormField, Input, Select
} from '../components/ui';

export function EmpresasPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<typeof empresas[0] | null>(null);
  const filtered = empresas.filter(e =>
    e.nome.toLowerCase().includes(search.toLowerCase()) ||
    e.cnpj.includes(search)
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <SectionHeader
        title="Empresas"
        subtitle={`${empresas.length} empresas cadastradas`}
        actions={
          <>
            <SearchInput placeholder="Buscar empresa..." value={search} onChange={setSearch} />
            <Btn variant="secondary" size="sm" icon={<Filter size={13} />}>Filtrar</Btn>
            <Btn variant="primary" size="sm" icon={<Plus size={13} />} onClick={() => { setSelected(null); setModalOpen(true); }}>Nova Empresa</Btn>
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
                    <button className="p-1 rounded-[6px] text-[#71717A] hover:text-white hover:bg-zinc-700 transition-colors" onClick={() => { setSelected(e); setModalOpen(true); }}>
                      <Edit2 size={13} />
                    </button>
                    <button className="p-1 rounded-[6px] text-[#71717A] hover:text-red-400 hover:bg-red-500/10 transition-colors" onClick={() => { setSelected(e); setDeleteOpen(true); }}>
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
  );
}
