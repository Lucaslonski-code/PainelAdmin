import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { usuarios } from '../data';
import {
  SectionHeader, SearchInput, Btn, TableContainer, Th, Td, Avatar,
  StatusBadge, Modal, FormField, Input, Select
} from '../components/ui';

export function UsuariosPage() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const filtered = usuarios.filter(u => u.nome.toLowerCase().includes(search.toLowerCase()));
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
  );
}
