export const revenueData = [
  { month: 'Jan', receita: 42000, despesa: 28000 },
  { month: 'Fev', receita: 51000, despesa: 31000 },
  { month: 'Mar', receita: 47000, despesa: 29000 },
  { month: 'Abr', receita: 63000, despesa: 34000 },
  { month: 'Mai', receita: 58000, despesa: 32000 },
  { month: 'Jun', receita: 71000, despesa: 38000 },
  { month: 'Jul', receita: 68000, despesa: 35000 },
];

export const agendamentosData = [
  { day: 'Seg', total: 24 },
  { day: 'Ter', total: 31 },
  { day: 'Qua', total: 28 },
  { day: 'Qui', total: 37 },
  { day: 'Sex', total: 42 },
  { day: 'Sáb', total: 19 },
  { day: 'Dom', total: 8 },
];

export const pieData = [
  { name: 'Ativo', value: 68, color: '#22C55E' },
  { name: 'Pendente', value: 18, color: '#F59E0B' },
  { name: 'Inativo', value: 14, color: '#3F3F46' },
];

export const empresas = [
  { id: 1, nome: 'TechCorp Brasil', cnpj: '12.345.678/0001-90', status: 'ativo', plano: 'Enterprise', clientes: 248, mrr: 4800, cidade: 'São Paulo', criado: '12 Jan 2024' },
  { id: 2, nome: 'Nexus Soluções', cnpj: '98.765.432/0001-10', status: 'ativo', plano: 'Pro', clientes: 91, mrr: 1200, cidade: 'Rio de Janeiro', criado: '23 Mar 2024' },
  { id: 3, nome: 'Apex Sistemas', cnpj: '45.678.901/0001-23', status: 'pendente', plano: 'Starter', clientes: 34, mrr: 400, cidade: 'Belo Horizonte', criado: '05 Abr 2024' },
  { id: 4, nome: 'DataStream Ltda', cnpj: '67.890.123/0001-45', status: 'ativo', plano: 'Pro', clientes: 127, mrr: 1200, cidade: 'Curitiba', criado: '18 Fev 2024' },
  { id: 5, nome: 'CloudBase S.A.', cnpj: '23.456.789/0001-67', status: 'inativo', plano: 'Starter', clientes: 12, mrr: 0, cidade: 'Porto Alegre', criado: '30 Jan 2024' },
  { id: 6, nome: 'SoftEdge Brasil', cnpj: '34.567.890/0001-78', status: 'ativo', plano: 'Enterprise', clientes: 312, mrr: 4800, cidade: 'Brasília', criado: '07 Mar 2024' },
  { id: 7, nome: 'Pixel Studios', cnpj: '56.789.012/0001-89', status: 'ativo', plano: 'Pro', clientes: 78, mrr: 1200, cidade: 'Fortaleza', criado: '14 Mai 2024' },
];

export const clientes = [
  { id: 1, nome: 'Rafael Mendonça', email: 'rafael@techcorp.com', empresa: 'TechCorp Brasil', status: 'ativo', ultimo: '10 Jul 2025', agendamentos: 18, gasto: 12400 },
  { id: 2, nome: 'Camila Souza', email: 'camila@nexus.com', empresa: 'Nexus Soluções', status: 'ativo', ultimo: '08 Jul 2025', agendamentos: 7, gasto: 3200 },
  { id: 3, nome: 'Thiago Ferreira', email: 'thiago@apex.com', empresa: 'Apex Sistemas', status: 'inativo', ultimo: '15 Jun 2025', agendamentos: 3, gasto: 800 },
  { id: 4, nome: 'Juliana Costa', email: 'juliana@datastream.com', empresa: 'DataStream Ltda', status: 'ativo', ultimo: '11 Jul 2025', agendamentos: 22, gasto: 18900 },
  { id: 5, nome: 'Bruno Alves', email: 'bruno@cloudbase.com', empresa: 'CloudBase S.A.', status: 'pendente', ultimo: '01 Jul 2025', agendamentos: 1, gasto: 200 },
  { id: 6, nome: 'Larissa Nunes', email: 'larissa@softedge.com', empresa: 'SoftEdge Brasil', status: 'ativo', ultimo: '12 Jul 2025', agendamentos: 31, gasto: 24100 },
];

export const servicos = [
  { id: 1, nome: 'Manutenção Preventiva', categoria: 'Manutenção', duracao: '2h', preco: 380, ativo: true, agendamentos: 142 },
  { id: 2, nome: 'Instalação de Software', categoria: 'TI', duracao: '1h', preco: 220, ativo: true, agendamentos: 87 },
  { id: 3, nome: 'Suporte Remoto', categoria: 'Suporte', duracao: '30min', preco: 120, ativo: true, agendamentos: 314 },
  { id: 4, nome: 'Consultoria Técnica', categoria: 'Consultoria', duracao: '3h', preco: 750, ativo: true, agendamentos: 56 },
  { id: 5, nome: 'Backup e Recuperação', categoria: 'TI', duracao: '4h', preco: 980, ativo: false, agendamentos: 23 },
  { id: 6, nome: 'Treinamento Usuários', categoria: 'Educação', duracao: '8h', preco: 1600, ativo: true, agendamentos: 41 },
];

export const usuarios = [
  { id: 1, nome: 'Ana Beatriz Lima', email: 'ana@autonova.io', cargo: 'Administradora', role: 'admin', status: 'ativo', ultimo: 'Agora' },
  { id: 2, nome: 'Carlos Eduardo', email: 'carlos@autonova.io', cargo: 'Gestor de Contas', role: 'manager', status: 'ativo', ultimo: '2h atrás' },
  { id: 3, nome: 'Fernanda Ramos', email: 'fernanda@autonova.io', cargo: 'Atendente', role: 'viewer', status: 'ativo', ultimo: '15min atrás' },
  { id: 4, nome: 'Gustavo Pinto', email: 'gustavo@autonova.io', cargo: 'Técnico', role: 'manager', status: 'inativo', ultimo: '3 dias atrás' },
  { id: 5, nome: 'Helena Vieira', email: 'helena@autonova.io', cargo: 'Financeiro', role: 'viewer', status: 'ativo', ultimo: '1h atrás' },
];

export const agendamentos = [
  { id: 1, cliente: 'Rafael Mendonça', servico: 'Manutenção Preventiva', data: '13 Jul 2025', hora: '09:00', status: 'confirmado', tecnico: 'Carlos Eduardo', empresa: 'TechCorp Brasil' },
  { id: 2, cliente: 'Camila Souza', servico: 'Suporte Remoto', data: '13 Jul 2025', hora: '10:30', status: 'em_andamento', tecnico: 'Fernanda Ramos', empresa: 'Nexus Soluções' },
  { id: 3, cliente: 'Juliana Costa', servico: 'Consultoria Técnica', data: '13 Jul 2025', hora: '14:00', status: 'confirmado', tecnico: 'Carlos Eduardo', empresa: 'DataStream Ltda' },
  { id: 4, cliente: 'Larissa Nunes', servico: 'Instalação de Software', data: '14 Jul 2025', hora: '08:30', status: 'pendente', tecnico: 'Gustavo Pinto', empresa: 'SoftEdge Brasil' },
  { id: 5, cliente: 'Bruno Alves', servico: 'Backup e Recuperação', data: '14 Jul 2025', hora: '11:00', status: 'cancelado', tecnico: 'Fernanda Ramos', empresa: 'CloudBase S.A.' },
  { id: 6, cliente: 'Thiago Ferreira', servico: 'Treinamento Usuários', data: '15 Jul 2025', hora: '09:00', status: 'pendente', tecnico: 'Helena Vieira', empresa: 'Apex Sistemas' },
];

export const transacoes = [
  { id: 1, descricao: 'Pagamento - TechCorp Brasil', tipo: 'receita', valor: 4800, data: '12 Jul 2025', status: 'pago', metodo: 'Transferência' },
  { id: 2, descricao: 'Pagamento - SoftEdge Brasil', tipo: 'receita', valor: 4800, data: '11 Jul 2025', status: 'pago', metodo: 'Pix' },
  { id: 3, descricao: 'Pagamento - DataStream Ltda', tipo: 'receita', valor: 1200, data: '10 Jul 2025', status: 'pago', metodo: 'Cartão' },
  { id: 4, descricao: 'Servidor Cloud AWS', tipo: 'despesa', valor: 2340, data: '09 Jul 2025', status: 'pago', metodo: 'Débito' },
  { id: 5, descricao: 'Pagamento - Nexus Soluções', tipo: 'receita', valor: 1200, data: '08 Jul 2025', status: 'pendente', metodo: 'Boleto' },
  { id: 6, descricao: 'Licença Ferramentas Dev', tipo: 'despesa', valor: 890, data: '07 Jul 2025', status: 'pago', metodo: 'Cartão' },
  { id: 7, descricao: 'Pagamento - Pixel Studios', tipo: 'receita', valor: 1200, data: '06 Jul 2025', status: 'pago', metodo: 'Pix' },
];

export const chatMessages = [
  { role: 'assistant', content: 'Olá! Sou a IA do AutoNova. Posso ajudar com análises, relatórios, insights de negócio e automações. O que você precisa hoje?' },
  { role: 'user', content: 'Quais são as empresas com maior risco de churn este mês?' },
  { role: 'assistant', content: 'Com base nos dados de uso e engajamento, identifiquei **3 empresas em risco**:\n\n1. **CloudBase S.A.** — Inativa há 28 dias. Uso 94% abaixo da média. MRR: R$ 400.\n2. **Apex Sistemas** — Apenas 1 agendamento nos últimos 60 dias. Status: Pendente.\n3. **Thiago Ferreira (Apex)** — Última sessão: 15 Jun. Nenhuma interação recente.\n\nRecomendo acionar o time de Customer Success para contato proativo nos próximos 48h.' },
];
