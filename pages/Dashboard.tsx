
import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  LayoutGrid, 
  Wallet, 
  MoreVertical,
  PauseCircle,
  Trash2,
  ExternalLink,
  QrCode,
  ArrowUpRight,
  Loader2,
  Phone,
  Mail,
  Fingerprint,
  Zap
} from 'lucide-react';
import { GameType } from '../types';

type TabType = 'overview' | 'my_ads' | 'finance';
type PixType = 'cpf' | 'email' | 'phone' | 'random';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [pixKey, setPixKey] = useState('');
  const [pixType, setPixType] = useState<PixType>('cpf');
  const [withdrawAmount, setWithdrawAmount] = useState('1250.00');

  // Mock data for user's own ads
  const myAds = [
    { id: '1', title: 'Conta Valorant Ascendente', game: GameType.VALORANT, price: 450, status: 'sold', date: '12 Out' },
    { id: '10', title: 'Free Fire Angelical', game: GameType.MOBILE_GAMES, price: 600, status: 'active', date: 'Hoje' },
    { id: '99', title: 'Xbox Game Pass 12 Meses', game: GameType.GAME_PASS, price: 180, status: 'pending', date: '2 horas atrás' },
  ];

  const handleWithdraw = () => {
    if (!pixKey) return alert("Insira uma chave PIX válida.");
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      alert(`Solicitação de resgate via PIX (${pixType.toUpperCase()}) enviada! O valor estará na sua conta em até 24h.`);
      setWithdrawAmount('0.00');
      setPixKey('');
    }, 2000);
  };

  const pixTypeLabels: Record<PixType, string> = {
    cpf: 'CPF',
    email: 'E-mail',
    phone: 'Celular',
    random: 'Chave Aleatória'
  };

  const pixTypePlaceholders: Record<PixType, string> = {
    cpf: '000.000.000-00',
    email: 'seu@email.com',
    phone: '(00) 00000-0000',
    random: 'Insira a chave aleatória completa'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="gaming-font text-4xl font-black tracking-tighter">CENTRAL DO <span className="text-violet-500">VENDEDOR</span></h1>
          <p className="text-slate-400 text-sm mt-1">Gerencie seus lucros e seus anúncios de elite.</p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Resumo
          </button>
          <button 
            onClick={() => setActiveTab('my_ads')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'my_ads' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Meus Anúncios
          </button>
          <button 
            onClick={() => setActiveTab('finance')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'finance' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Financeiro
          </button>
        </div>
      </div>

      {/* SECTION: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-violet-500">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500"><DollarSign size={20} /></div>
                <span className="text-xs text-green-400 font-bold">+12%</span>
              </div>
              <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Vendas Concluídas</span>
              <h3 className="text-2xl font-black mt-1">R$ 1.250,00</h3>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><ShoppingBag size={20} /></div>
              </div>
              <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Total de Itens</span>
              <h3 className="text-2xl font-black mt-1">12</h3>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><CheckCircle size={20} /></div>
              </div>
              <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Reputação</span>
              <h3 className="text-2xl font-black mt-1">4.9/5</h3>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-l-4 border-amber-500">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><Clock size={20} /></div>
              </div>
              <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Saldo Pendente</span>
              <h3 className="text-2xl font-black mt-1">R$ 380,00</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-panel rounded-3xl overflow-hidden border-slate-800">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h2 className="font-bold">Atividade Recente</h2>
                <button onClick={() => setActiveTab('my_ads')} className="text-xs text-violet-400 hover:underline">Ver tudo</button>
              </div>
              <div className="divide-y divide-slate-800">
                {myAds.slice(0, 2).map((ad) => (
                  <div key={ad.id} className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${ad.status === 'sold' ? 'bg-green-500/10 text-green-500' : 'bg-violet-500/10 text-violet-500'}`}>
                        <ShoppingBag size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{ad.title}</h4>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">{ad.date} • {ad.game}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">R$ {ad.price.toFixed(2)}</div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${ad.status === 'sold' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>
                        {ad.status === 'sold' ? 'Vendido' : 'Ativo'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel p-6 rounded-3xl border-slate-800 bg-gradient-to-br from-slate-900/50 to-violet-900/10">
              <h2 className="font-bold mb-4">Dica do Especialista</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">Com apenas 5% de taxa, o GameTrade é a plataforma mais lucrativa do mercado para vendedores de elite.</p>
              <button className="w-full bg-violet-600 py-3 rounded-xl text-sm font-bold hover:bg-violet-700 transition-all">Otimizar Meus Anúncios</button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: MY ADS */}
      {activeTab === 'my_ads' && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="glass-panel rounded-3xl overflow-hidden border-slate-800">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h2 className="font-bold">Gerenciar Anúncios</h2>
              <button className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">+ Novo Anúncio</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-900/80 text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Produto</th>
                    <th className="px-6 py-4">Categoria</th>
                    <th className="px-6 py-4">Preço</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {myAds.map((ad) => (
                    <tr key={ad.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 font-bold text-sm text-slate-200">{ad.title}</td>
                      <td className="px-6 py-4 text-xs text-slate-400">{ad.game}</td>
                      <td className="px-6 py-4 font-bold text-sm">R$ {ad.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                          ad.status === 'sold' ? 'bg-green-500/10 text-green-500' : 
                          ad.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {ad.status === 'sold' ? 'Vendido' : ad.status === 'pending' ? 'Pendente' : 'Ativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button title="Pausar" className="p-2 text-slate-500 hover:text-amber-500 transition-colors"><PauseCircle size={16} /></button>
                          <button title="Excluir" className="p-2 text-slate-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                          <button title="Ver" className="p-2 text-slate-500 hover:text-violet-500 transition-colors"><ExternalLink size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: FINANCE / WITHDRAW */}
      {activeTab === 'finance' && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto">
          <div className="glass-panel p-8 rounded-3xl border-violet-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Wallet size={120} />
            </div>
            
            <h2 className="text-xl font-bold mb-8 flex items-center space-x-2">
              <Wallet className="text-violet-500" size={24} />
              <span>Minha Carteira</span>
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Saldo Disponível</span>
                <div className="text-3xl font-black text-green-400 mt-1 neon-text">R$ {withdrawAmount}</div>
              </div>
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Em Processamento</span>
                <div className="text-3xl font-black text-slate-500 mt-1">R$ 0,00</div>
              </div>
            </div>

            <div className="space-y-8">
              {/* PIX Type Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-4 uppercase tracking-widest">Tipo de Chave PIX</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button 
                    onClick={() => setPixType('cpf')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${pixType === 'cpf' ? 'bg-violet-600 border-violet-500 text-white shadow-lg' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                  >
                    <Fingerprint size={20} className="mb-2" />
                    <span className="text-[10px] font-bold">CPF</span>
                  </button>
                  <button 
                    onClick={() => setPixType('email')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${pixType === 'email' ? 'bg-violet-600 border-violet-500 text-white shadow-lg' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                  >
                    <Mail size={20} className="mb-2" />
                    <span className="text-[10px] font-bold">E-mail</span>
                  </button>
                  <button 
                    onClick={() => setPixType('phone')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${pixType === 'phone' ? 'bg-violet-600 border-violet-500 text-white shadow-lg' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                  >
                    <Phone size={20} className="mb-2" />
                    <span className="text-[10px] font-bold">Celular</span>
                  </button>
                  <button 
                    onClick={() => setPixType('random')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${pixType === 'random' ? 'bg-violet-600 border-violet-500 text-white shadow-lg' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                  >
                    <Zap size={20} className="mb-2" />
                    <span className="text-[10px] font-bold">Aleatória</span>
                  </button>
                </div>
              </div>

              {/* PIX Key Input */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center">
                  <QrCode size={16} className="mr-2 text-violet-400" />
                  Sua Chave PIX ({pixTypeLabels[pixType]})
                </label>
                <input 
                  type="text" 
                  placeholder={pixTypePlaceholders[pixType]}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-violet-500 transition-all font-mono"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                />
              </div>

              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-start space-x-3">
                <Clock className="text-amber-500 mt-1 shrink-0" size={18} />
                <p className="text-xs text-slate-400 leading-relaxed">
                  Os resgates via PIX são processados em até 24 horas úteis. Certifique-se de que a chave {pixTypeLabels[pixType]} esteja correta para evitar atrasos.
                </p>
              </div>

              <button 
                onClick={handleWithdraw}
                disabled={isWithdrawing || parseFloat(withdrawAmount) <= 0}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                {isWithdrawing ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <ArrowUpRight size={20} />
                    <span>SOLICITAR RESGATE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              Taxa de resgate: <span className="text-slate-300">R$ 0,00 (Grátis via PIX)</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
