import React, { useState } from 'react';
import { Settings, Globe, Bell, Shield, CreditCard, Mail, Phone, Calendar, Key } from 'lucide-react';
import {
  SectionHeader, Btn, FormField, Input, Select, Badge
} from '../components/ui';

export function ConfiguracoesPage() {
  const [section, setSection] = useState('geral');
  const sections = [
    { id: 'geral', label: 'Geral', icon: Settings },
    { id: 'integracoes', label: 'Integrações', icon: Globe },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <SectionHeader title="Configurações" subtitle="Preferências e integrações do sistema" />
      <div className="flex gap-6">
        {/* Sidebar interno */}
        <div className="w-44 flex-shrink-0">
          <div className="flex flex-col gap-0.5">
            {sections.map(s => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-sm transition-colors w-full text-left ${section === s.id ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'text-[#A1A1AA] hover:text-white hover:bg-zinc-800'}`}
                >
                  <Icon size={14} />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {section === 'geral' && (
            <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6 flex flex-col gap-6">
              <div>
                <div className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Informações da Conta</div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Nome da Empresa"><Input value="AutoNova Sistemas" /></FormField>
                    <FormField label="Domínio"><Input value="autonova.io" /></FormField>
                  </div>
                  <FormField label="E-mail de Contato"><Input value="contato@autonova.io" type="email" /></FormField>
                  <FormField label="Fuso Horário">
                    <Select options={['America/Sao_Paulo', 'America/Manaus', 'America/Fortaleza']} value="America/Sao_Paulo" onChange={() => {}} />
                  </FormField>
                </div>
              </div>
              <div className="pt-4 border-t border-[#27272A] flex justify-end">
                <Btn variant="primary">Salvar Alterações</Btn>
              </div>
            </div>
          )}

          {section === 'integracoes' && (
            <div className="flex flex-col gap-3">
              {[
                { name: 'Stripe', desc: 'Pagamentos e assinaturas', icon: CreditCard, ativo: true },
                { name: 'SendGrid', desc: 'E-mails transacionais', icon: Mail, ativo: true },
                { name: 'Twilio', desc: 'SMS e WhatsApp', icon: Phone, ativo: false },
                { name: 'Google Calendar', desc: 'Sincronização de agenda', icon: Calendar, ativo: false },
              ].map(i => {
                const Icon = i.icon;
                return (
                  <div key={i.name} className="bg-[#18181B] border border-[#27272A] rounded-[16px] px-5 py-4 flex items-center gap-4">
                    <div className="w-9 h-9 bg-[#27272A] rounded-[10px] flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#A1A1AA]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{i.name}</div>
                      <div className="text-xs text-[#71717A]">{i.desc}</div>
                    </div>
                    <Badge variant={i.ativo ? 'success' : 'neutral'}>{i.ativo ? 'Conectado' : 'Desconectado'}</Badge>
                    <Btn variant={i.ativo ? 'secondary' : 'primary'} size="xs">
                      {i.ativo ? 'Configurar' : 'Conectar'}
                    </Btn>
                  </div>
                );
              })}
            </div>
          )}

          {section === 'notificacoes' && (
            <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6 flex flex-col gap-5">
              {[
                { label: 'Novo agendamento', desc: 'Quando um cliente agenda um serviço' },
                { label: 'Pagamento recebido', desc: 'Confirmação de transações' },
                { label: 'Empresa inativa', desc: 'Alerta de churn potencial' },
                { label: 'Relatório semanal', desc: 'Resumo automático toda segunda-feira' },
              ].map((n, i) => (
                <div key={i} className={`flex items-center justify-between ${i > 0 ? 'pt-5 border-t border-[#27272A]' : ''}`}>
                  <div>
                    <div className="text-sm font-medium text-white">{n.label}</div>
                    <div className="text-xs text-[#71717A] mt-0.5">{n.desc}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-9 h-5 rounded-full flex items-center transition-colors cursor-pointer ${i % 2 === 0 ? 'bg-[#22C55E] justify-end pr-0.5' : 'bg-[#27272A] justify-start pl-0.5'}`}>
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {section === 'seguranca' && (
            <div className="flex flex-col gap-4">
              <div className="bg-[#18181B] border border-[#27272A] rounded-[16px] p-5 flex items-center gap-4">
                <div className="w-9 h-9 bg-emerald-500/10 rounded-[10px] flex items-center justify-center">
                  <Shield size={16} className="text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Autenticação em Dois Fatores</div>
                  <div className="text-xs text-[#71717A]">Sua conta está protegida com 2FA ativo</div>
                </div>
                <Badge variant="success">Ativo</Badge>
              </div>
              <div className="bg-[#18181B] border border-[#27272A] rounded-[16px] p-5 flex items-center gap-4">
                <div className="w-9 h-9 bg-[#27272A] rounded-[10px] flex items-center justify-center">
                  <Key size={16} className="text-[#71717A]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Senha</div>
                  <div className="text-xs text-[#71717A]">Última alteração há 42 dias</div>
                </div>
                <Btn variant="secondary" size="xs">Alterar</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
