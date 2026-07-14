import React, { useState } from 'react';
import { Upload, Smartphone, Shield, Key } from 'lucide-react';
import {
  SectionHeader, Avatar, Badge, Btn, FormField, Input
} from '../components/ui';

export function PerfilPage() {
  const [tab, setTab] = useState<'info' | 'sessoes' | '2fa'>('info');
  return (
    <div className="flex flex-col gap-6 p-6 max-w-2xl">
      <SectionHeader title="Perfil" subtitle="Gerencie sua conta pessoal" />

      {/* Avatar section */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6 flex items-center gap-5">
        <Avatar name="Ana Beatriz Lima" size="md" />
        <div className="flex-1">
          <div className="text-base font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Ana Beatriz Lima</div>
          <div className="text-sm text-[#71717A]">ana@autonova.io</div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="info">Admin</Badge>
            <Badge variant="success">Ativo</Badge>
          </div>
        </div>
        <Btn variant="secondary" size="sm" icon={<Upload size={13} />}>Foto</Btn>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#27272A]">
        {(['info', 'sessoes', '2fa'] as const).map(t => (
          <button
            key={t}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === t ? 'border-[#22C55E] text-white' : 'border-transparent text-[#71717A] hover:text-white'}`}
            onClick={() => setTab(t)}
          >
            {t === 'info' ? 'Informações' : t === 'sessoes' ? 'Sessões' : '2FA'}
          </button>
        ))}
      </div>

      {tab === 'info' && (
        <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Nome"><Input value="Ana Beatriz" /></FormField>
            <FormField label="Sobrenome"><Input value="Lima" /></FormField>
          </div>
          <FormField label="E-mail"><Input value="ana@autonova.io" type="email" /></FormField>
          <FormField label="Cargo"><Input value="Administradora" /></FormField>
          <FormField label="Telefone"><Input value="+55 11 99999-0000" /></FormField>
          <div className="pt-4 border-t border-[#27272A] flex justify-end">
            <Btn variant="primary">Salvar</Btn>
          </div>
        </div>
      )}

      {tab === 'sessoes' && (
        <div className="flex flex-col gap-3">
          {[
            { browser: 'Chrome 126', os: 'macOS 14', ip: '187.45.23.11', local: 'São Paulo, BR', ativo: true, quando: 'Agora' },
            { browser: 'Safari Mobile', os: 'iOS 17', ip: '187.45.23.12', local: 'São Paulo, BR', ativo: false, quando: '2h atrás' },
            { browser: 'Firefox 127', os: 'Windows 11', ip: '201.12.54.89', local: 'Curitiba, BR', ativo: false, quando: '3 dias atrás' },
          ].map((s, i) => (
            <div key={i} className="bg-[#18181B] border border-[#27272A] rounded-[14px] px-5 py-4 flex items-center gap-4">
              <div className="w-8 h-8 bg-[#27272A] rounded-[8px] flex items-center justify-center">
                <Smartphone size={14} className="text-[#71717A]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{s.browser}</span>
                  {s.ativo && <Badge variant="success">Atual</Badge>}
                </div>
                <div className="text-xs text-[#71717A]">{s.os} · {s.ip} · {s.local}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#71717A]">{s.quando}</div>
                {!s.ativo && (
                  <button className="text-xs text-red-400 hover:text-red-300 mt-1 transition-colors">Encerrar</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === '2fa' && (
        <div className="bg-[#18181B] border border-[#27272A] rounded-[20px] p-6 flex flex-col gap-5">
          <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-[12px]">
            <Shield size={18} className="text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-white">2FA Ativo</div>
              <div className="text-xs text-[#71717A]">Sua conta está protegida com autenticador TOTP</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <FormField label="Código de Verificação" hint="Digite o código do seu aplicativo autenticador">
              <Input placeholder="000 000" />
            </FormField>
          </div>
          <div className="flex justify-between">
            <Btn variant="ghost" size="sm">Ver códigos de recuperação</Btn>
            <Btn variant="danger" size="sm">Desativar 2FA</Btn>
          </div>
        </div>
      )}
    </div>
  );
}
