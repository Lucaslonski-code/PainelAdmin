import React, { useState } from 'react';
import { Page } from './types';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { DashboardPage } from './features/DashboardPage';
import { EmpresasPage } from './features/EmpresasPage';
import { ClientesPage } from './features/ClientesPage';
import { ServicosPage } from './features/ServicosPage';
import { UsuariosPage } from './features/UsuariosPage';
import { AgendamentosPage } from './features/AgendamentosPage';
import { FinanceiroPage } from './features/FinanceiroPage';
import { ConfiguracoesPage } from './features/ConfiguracoesPage';
import { PerfilPage } from './features/PerfilPage';
import { IAPage } from './features/IAPage';

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [collapsed, setCollapsed] = useState(false);

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
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-300 font-sans">
      <Sidebar current={page} onChange={setPage} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar page={page} />
        <main className="flex-1 overflow-y-auto bg-[#020617]">
          {pages[page]}
        </main>
      </div>
    </div>
  );
}
