import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Plus } from 'lucide-react';
import { chatMessages } from '../data';
import { Btn } from '../components/ui';

export function IAPage() {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages(m => [...m, {
        role: 'assistant',
        content: 'Com base nos dados disponíveis, posso analisar esse ponto com mais detalhes. Gostaria que eu gere um relatório completo ou apenas um resumo executivo?'
      }]);
      setLoading(false);
    }, 1200);
  };

  const suggestions = [
    'Empresas em risco de churn',
    'Relatório financeiro julho',
    'Técnicos mais produtivos',
    'Serviços mais agendados',
  ];

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#27272A]">
          <div className="w-8 h-8 bg-[#22C55E]/10 rounded-[10px] flex items-center justify-center">
            <Sparkles size={15} className="text-[#22C55E]" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>IA AutoNova</div>
            <div className="text-xs text-[#71717A]">Assistente inteligente · GPT-4o</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full" />
            <span className="text-xs text-[#71717A]">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {m.role === 'assistant' && (
                <div className="w-7 h-7 bg-[#22C55E]/10 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={13} className="text-[#22C55E]" />
                </div>
              )}
              <div className={`max-w-[70%] rounded-[16px] px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                m.role === 'user'
                  ? 'bg-[#22C55E]/10 text-white border border-[#22C55E]/20 rounded-tr-[4px]'
                  : 'bg-[#18181B] text-[#A1A1AA] border border-[#27272A] rounded-tl-[4px]'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-[#22C55E]/10 rounded-[8px] flex items-center justify-center flex-shrink-0">
                <Sparkles size={13} className="text-[#22C55E]" />
              </div>
              <div className="bg-[#18181B] border border-[#27272A] rounded-[16px] rounded-tl-[4px] px-4 py-3 flex items-center gap-1.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-[#71717A] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="px-6 pb-3 flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button
              key={s}
              className="px-3 py-1.5 bg-[#18181B] border border-[#27272A] rounded-[10px] text-xs text-[#A1A1AA] hover:text-white hover:border-zinc-500 transition-colors"
              onClick={() => setInput(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-6 pb-5">
          <div className="flex items-end gap-2 bg-[#18181B] border border-[#27272A] rounded-[16px] p-3 focus-within:border-zinc-500 transition-colors">
            <textarea
              className="flex-1 bg-transparent text-sm text-white placeholder-[#71717A] resize-none focus:outline-none min-h-[20px] max-h-32"
              placeholder="Pergunte algo sobre o AutoNova..."
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={1}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            />
            <button
              className={`p-2 rounded-[10px] transition-colors flex-shrink-0 ${input.trim() ? 'bg-[#22C55E] text-black hover:bg-[#16A34A]' : 'bg-[#27272A] text-[#71717A]'}`}
              onClick={send}
              disabled={!input.trim()}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar — histórico */}
      <div className="w-56 border-l border-[#27272A] flex flex-col overflow-hidden hidden lg:flex">
        <div className="px-4 py-4 border-b border-[#27272A]">
          <div className="text-xs font-medium text-[#71717A] uppercase tracking-wider">Histórico</div>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {[
            { title: 'Análise de churn', time: 'Hoje' },
            { title: 'Relatório financeiro', time: 'Ontem' },
            { title: 'Ranking de clientes', time: '11 Jul' },
            { title: 'Previsão de demanda', time: '10 Jul' },
            { title: 'KPIs do trimestre', time: '08 Jul' },
          ].map((h, i) => (
            <button key={i} className="w-full px-4 py-2.5 text-left hover:bg-zinc-800/50 transition-colors group">
              <div className="text-xs font-medium text-[#A1A1AA] group-hover:text-white truncate transition-colors">{h.title}</div>
              <div className="text-[10px] text-[#71717A] mt-0.5">{h.time}</div>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-[#27272A]">
          <Btn variant="ghost" size="xs" icon={<Plus size={12} />}>Nova conversa</Btn>
        </div>
      </div>
    </div>
  );
}
