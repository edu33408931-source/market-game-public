
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AccountListing, GameType } from '../types';
import { 
  ShieldCheck, 
  Layers, 
  Award, 
  MessageSquare, 
  ShoppingCart, 
  ArrowLeft, 
  CheckCircle2, 
  Send, 
  CreditCard, 
  QrCode, 
  Copy, 
  ChevronRight,
  Wallet,
  Loader2,
  AlertTriangle,
  LifeBuoy,
  ShieldAlert
} from 'lucide-react';

const MOCK_LISTINGS: AccountListing[] = [
  { id: '1', game: GameType.VALORANT, title: 'CONTA ASCENDENTE 3 - FULL ACESSO', description: 'Conta com diversas skins de passes anteriores e facas exclusivas. Entrega imediata.', price: 450, sellerFee: 45, sellerReceives: 405, rank: 'Ascendente 3', skinsCount: 24, level: 112, sellerName: 'ViperMain', createdAt: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f2?auto=format&fit=crop&q=80&w=800', status: 'active' },
  { id: '2', game: GameType.LEAGUE_OF_LEGENDS, title: 'CONTA LOL LEVEL 400 - DIAMANTE 1', description: 'Muitas skins raras de evento e todos os campeões habilitados.', price: 890, sellerFee: 89, sellerReceives: 801, rank: 'Diamante 1', skinsCount: 215, level: 405, sellerName: 'JungleDiff', createdAt: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800', status: 'active' }
];

type CheckoutStage = 'view' | 'selecting' | 'pix' | 'card' | 'processing' | 'success' | 'dispute' | 'dispute_confirmed';

const ListingDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<AccountListing | null>(null);
  const [stage, setStage] = useState<CheckoutStage>('view');
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [disputeReason, setDisputeReason] = useState('');

  useEffect(() => {
    const found = MOCK_LISTINGS.find(l => l.id === id);
    if (found) setListing(found);
  }, [id]);

  const handlePurchaseClick = () => setStage('selecting');

  const confirmPayment = () => {
    setStage('processing');
    setTimeout(() => {
      setStage('success');
    }, 2000);
  };

  const handleOpenDispute = () => {
    if (!disputeReason.trim()) return;
    setStage('dispute_confirmed');
    // Adiciona mensagem automática de sistema no chat
    setMessages(prev => [...prev, { 
      sender: 'SISTEMA', 
      text: '⚠️ MEDIAÇÃO ABERTA: O comprador relatou um problema. O pagamento foi bloqueado preventivamente.' 
    }]);
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    setMessages([...messages, { sender: 'Você', text: chatMessage }]);
    setChatMessage('');
    if (stage === 'success') {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: listing?.sellerName || 'Vendedor', text: 'Olá! Pagamento recebido. Vou preparar as credenciais agora mesmo.' }]);
      }, 1500);
    }
  };

  if (!listing) return <div className="p-20 text-center">Carregando anúncio...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-slate-400 hover:text-white mb-6 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Voltar ao Mercado</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl overflow-hidden glass-panel border-violet-500/20 aspect-video shadow-2xl">
            <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover" />
          </div>

          <div className="glass-panel p-8 rounded-3xl">
            <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700 flex items-center space-x-2">
                <Award className="text-violet-500" size={18} />
                <span className="text-sm font-medium">{listing.game}</span>
              </div>
              <div className="bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700 flex items-center space-x-2">
                <ShieldCheck className="text-violet-500" size={18} />
                <span className="text-sm font-medium">{listing.rank}</span>
              </div>
              <div className="bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700 flex items-center space-x-2">
                <Layers className="text-violet-500" size={18} />
                <span className="text-sm font-medium">{listing.skinsCount} Skins</span>
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-4 text-slate-100">Descrição Completa</h2>
            <div className="text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/30 p-6 rounded-2xl border border-slate-800">
              {listing.description}
            </div>
          </div>
        </div>

        {/* Right Column: Checkout/Chat Panel */}
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl border-violet-500/30 sticky top-24 overflow-hidden shadow-2xl transition-all duration-500 min-h-[400px]">
            
            {/* STAGE: VIEW */}
            {stage === 'view' && (
              <div className="p-8">
                <div className="text-sm text-slate-400 mb-2 font-medium uppercase tracking-widest">Valor da Conta</div>
                <div className="text-4xl font-black mb-6 text-white neon-text">
                  R$ {listing.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <button 
                  onClick={handlePurchaseClick}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-3 transition-all active:scale-95 shadow-xl shadow-violet-600/20"
                >
                  <ShoppingCart size={20} />
                  <span>Comprar Agora</span>
                </button>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-3 text-xs text-slate-400">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Transação com Seguro Garantido</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-slate-400">
                    <ShieldCheck size={16} className="text-blue-400" />
                    <span>Dinheiro retido até a entrega</span>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE: SELECTING PAYMENT */}
            {stage === 'selecting' && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Pagamento</h3>
                  <button onClick={() => setStage('view')} className="text-xs text-slate-400 hover:text-white">Cancelar</button>
                </div>
                <div className="space-y-4">
                  <button onClick={() => setStage('pix')} className="w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl border border-slate-700 hover:border-violet-500 flex items-center justify-between transition-all group">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><QrCode size={24} /></div>
                      <div className="text-left"><div className="font-bold text-sm">PIX</div><div className="text-[10px] text-slate-400">Aprovação instantânea</div></div>
                    </div>
                    <ChevronRight size={18} className="text-slate-600 group-hover:text-violet-400" />
                  </button>
                  <button onClick={() => setStage('card')} className="w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl border border-slate-700 hover:border-violet-500 flex items-center justify-between transition-all group">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><CreditCard size={24} /></div>
                      <div className="text-left"><div className="font-bold text-sm">Cartão de Crédito</div><div className="text-[10px] text-slate-400">Até 12x no cartão</div></div>
                    </div>
                    <ChevronRight size={18} className="text-slate-600 group-hover:text-violet-400" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE: PIX */}
            {stage === 'pix' && (
              <div className="p-8 text-center">
                <h3 className="font-bold text-lg mb-6 text-white">Pagar com PIX</h3>
                <div className="bg-white p-4 rounded-2xl inline-block mb-6 shadow-xl">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GameTradeElitePayment" alt="PIX QR" className="w-40 h-40" />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between mb-8">
                  <code className="text-[10px] text-slate-400 truncate mr-2">gametrade-pix-key-928374928374</code>
                  <button className="p-2 text-violet-400 hover:text-white"><Copy size={16}/></button>
                </div>
                <button onClick={confirmPayment} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-600/20">Já realizei o pagamento</button>
              </div>
            )}

            {/* STAGE: CARD */}
            {stage === 'card' && (
              <div className="p-8">
                <h3 className="font-bold text-lg mb-6">Cartão de Crédito</h3>
                <div className="space-y-4 mb-6">
                  <input type="text" placeholder="Número do Cartão" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/AA" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500" />
                    <input type="text" placeholder="CVV" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500" />
                  </div>
                </div>
                <button onClick={confirmPayment} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-violet-600/20">Finalizar Pagamento</button>
              </div>
            )}

            {/* STAGE: PROCESSING */}
            {stage === 'processing' && (
              <div className="p-8 h-[400px] flex flex-col items-center justify-center text-center">
                <Loader2 size={48} className="text-violet-500 animate-spin mb-6" />
                <h3 className="font-bold text-xl mb-2">Validando...</h3>
                <p className="text-sm text-slate-400">Verificando transação segura.</p>
              </div>
            )}

            {/* STAGE: SUCCESS / CHAT / SUPPORT OPTION */}
            {(stage === 'success' || stage === 'dispute' || stage === 'dispute_confirmed') && (
              <div className="p-0 flex flex-col h-[600px]">
                <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <MessageSquare className="text-violet-500" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{listing.sellerName}</h3>
                      <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Online</span>
                    </div>
                  </div>
                  {stage === 'success' && (
                    <button 
                      onClick={() => setStage('dispute')}
                      className="text-[10px] flex items-center space-x-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/20 px-2 py-1 rounded-md transition-all font-bold uppercase tracking-tighter"
                    >
                      <LifeBuoy size={12} />
                      <span>Ajuda / Disputa</span>
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* DISPUTE UI OVERLAY */}
                  {stage === 'dispute' && (
                    <div className="bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl border border-amber-500/30 mb-4 animate-in fade-in zoom-in duration-300">
                      <div className="flex items-center space-x-2 text-amber-500 mb-3">
                        <ShieldAlert size={20} />
                        <h4 className="font-bold text-sm">Abrir Mediação</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 mb-4">Se o vendedor não enviou os dados ou parou de responder, nossa equipe irá intervir.</p>
                      <textarea 
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs mb-4 text-white focus:outline-none focus:border-amber-500"
                        placeholder="Relate o problema brevemente..."
                        rows={3}
                        value={disputeReason}
                        onChange={(e) => setDisputeReason(e.target.value)}
                      ></textarea>
                      <div className="flex gap-2">
                        <button onClick={handleOpenDispute} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-lg text-xs transition-all">Acionar Suporte</button>
                        <button onClick={() => setStage('success')} className="px-4 text-xs text-slate-500 font-bold">Cancelar</button>
                      </div>
                    </div>
                  )}

                  {stage === 'dispute_confirmed' && (
                    <div className="bg-blue-600/10 p-4 rounded-xl border border-blue-500/20 flex items-start space-x-3 mb-4 animate-in slide-in-from-top duration-500">
                      <ShieldCheck className="text-blue-400 mt-1" size={18} />
                      <div>
                        <h4 className="text-xs font-bold text-blue-400">Mediação em curso</h4>
                        <p className="text-[10px] text-slate-400 mt-1">Nossa equipe está analisando este chat. O vendedor não poderá sacar o dinheiro até a resolução.</p>
                      </div>
                    </div>
                  )}

                  {messages.length === 0 && stage !== 'dispute' && (
                    <div className="text-center py-10 opacity-50">
                      <p className="text-xs">Inicie a conversa para receber seus dados.</p>
                    </div>
                  )}
                  
                  {messages.map((m, idx) => (
                    <div key={idx} className={`flex flex-col ${m.sender === 'Você' ? 'items-end' : (m.sender === 'SISTEMA' ? 'items-center' : 'items-start')}`}>
                      {m.sender !== 'SISTEMA' && <span className="text-[9px] text-slate-500 mb-1">{m.sender}</span>}
                      <div className={`px-4 py-2 rounded-2xl max-w-[85%] text-xs ${
                        m.sender === 'Você' ? 'bg-violet-600 text-white rounded-tr-none' : 
                        (m.sender === 'SISTEMA' ? 'bg-amber-900/30 text-amber-400 border border-amber-500/20 rounded-xl text-[10px] font-bold py-1' : 'bg-slate-800 text-slate-200 rounded-tl-none')
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-slate-900/50 border-t border-slate-800">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Fale com o vendedor..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-violet-500"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-violet-500 hover:text-violet-400">
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
