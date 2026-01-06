
import React from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  CheckCircle, 
  XCircle, 
  Scale, 
  HelpCircle, 
  Zap, 
  Lock,
  UserX,
  MessageCircleOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Rules: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "O que é PERMITIDO ✅",
      icon: <CheckCircle className="text-green-500" />,
      items: [
        "Vender contas de sua propriedade com acesso total (Full Access).",
        "Utilizar o chat oficial para entrega de credenciais após a venda.",
        "Solicitar mediação caso o comprador não confirme o recebimento.",
        "Resgatar seus lucros via PIX em qualquer chave de sua titularidade.",
        "Promover seu anúncio utilizando a descrição gerada por nossa IA."
      ]
    },
    {
      title: "O que é PROIBIDO ❌",
      icon: <XCircle className="text-red-500" />,
      items: [
        "Passar Discord, WhatsApp ou qualquer contato externo no anúncio ou chat.",
        "Tentar burlar a taxa de 5% da plataforma realizando a venda 'por fora'.",
        "Vender contas roubadas, crackeadas ou de procedência duvidosa.",
        "Anunciar produtos que não sejam relacionados a jogos (serviços de boost são permitidos).",
        "Ofender outros usuários ou moderadores durante uma disputa."
      ]
    },
    {
      title: "Segurança e Pagamentos 🛡️",
      icon: <Lock className="text-blue-500" />,
      items: [
        "O dinheiro fica retido em nosso sistema de Escrow até a confirmação da entrega.",
        "Taxa Fixa: Cobramos 5% sobre cada venda para manter a infraestrutura e suporte.",
        "Prazos: O resgate via PIX pode levar até 24h úteis para processamento.",
        "Disputas: Se uma conta for recuperada pelo dono original (Recuperada), o vendedor será banido permanentemente."
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="gaming-font text-5xl font-black mb-4 tracking-tighter uppercase italic">
          REGRAS DO <span className="text-violet-500">MERCADO</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Para garantir a melhor experiência e segurança total em todas as transações, 
          todos os membros da GameTrade Elite devem seguir estas diretrizes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {sections.map((section, idx) => (
          <div key={idx} className="glass-panel p-8 rounded-3xl border-slate-800 hover:border-violet-500/30 transition-all flex flex-col h-full">
            <div className="mb-6 flex items-center space-x-3">
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
                {section.icon}
              </div>
              <h2 className="font-bold text-lg">{section.title}</h2>
            </div>
            <ul className="space-y-4 flex-grow">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm text-slate-300 leading-relaxed">
                  <div className="w-1 h-1 rounded-full bg-violet-500 mt-2 shrink-0"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-3xl border-violet-500/20 bg-gradient-to-br from-slate-900 to-violet-900/10 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0">
            <div className="w-20 h-20 bg-violet-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-violet-600/30 rotate-3">
              <Scale size={40} className="text-white" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Consequências de Violações</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              A GameTrade Elite reserva-se o direito de suspender ou banir permanentemente qualquer conta que viole estas regras, 
              especialmente em casos de fraude ou tentativa de evasão de taxas. O saldo disponível pode ser retido para reembolsos em casos de golpe comprovado.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <button 
          onClick={() => navigate('/sell')}
          className="px-10 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-violet-600/20 active:scale-95"
        >
          Entendido, quero Anunciar
        </button>
        <button 
          onClick={() => navigate('/')}
          className="px-10 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 transition-all active:scale-95"
        >
          Ir para o Mercado
        </button>
      </div>

      <div className="mt-20 pt-10 border-t border-slate-800 text-center">
        <p className="text-xs text-slate-500 italic">Última atualização: 24 de Maio de 2024. Sujeito a alterações sem aviso prévio.</p>
      </div>
    </div>
  );
};

export default Rules;
