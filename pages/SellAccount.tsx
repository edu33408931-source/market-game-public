
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameType } from '../types';
import { generateDescription } from '../services/geminiService';
import { Sparkles, Info, DollarSign, Loader2 } from 'lucide-react';

const SellAccount: React.FC = () => {
  const navigate = useNavigate();
  const [loadingAI, setLoadingAI] = useState(false);
  const [formData, setFormData] = useState({
    game: GameType.VALORANT,
    title: '',
    rank: '',
    level: 0,
    skinsCount: 0,
    price: 0,
    description: ''
  });

  const handleAIHelp = async () => {
    if (!formData.rank && formData.game !== GameType.GAME_PASS) {
      alert("Por favor, informe o Rank antes de usar a IA.");
      return;
    }
    setLoadingAI(true);
    const desc = await generateDescription(
      formData.game, 
      formData.rank || 'N/A', 
      formData.level, 
      formData.skinsCount
    );
    setFormData(prev => ({ ...prev, description: desc }));
    setLoadingAI(false);
  };

  const commission = formData.price * 0.05; // Alterado para 5%
  const sellerReceives = formData.price * 0.95; // Alterado para 95%

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Anúncio enviado para análise! Em breve ele estará ativo no mercado.");
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="gaming-font text-4xl font-black mb-2">CRIAR <span className="text-violet-500">ANÚNCIO</span></h1>
        <p className="text-slate-400">Venda contas, consoles vinculados ou assinaturas de forma segura.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6 bg-slate-800/30 p-8 rounded-3xl border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Categoria/Jogo</label>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                value={formData.game}
                onChange={(e) => setFormData({...formData, game: e.target.value as GameType})}
              >
                {Object.values(GameType).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Rank / Status Principal</label>
              <input 
                type="text"
                placeholder="Ex: Diamante, 12 Meses, AR 60..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                value={formData.rank}
                onChange={(e) => setFormData({...formData, rank: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Título do Anúncio</label>
            <input 
              type="text"
              placeholder="Ex: Conta Xbox c/ Game Pass + 100 Jogos"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nível (Se aplicável)</label>
              <input 
                type="number"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: parseInt(e.target.value) || 0})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Qtd. Itens/Skins (Opcional)</label>
              <input 
                type="number"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                value={formData.skinsCount}
                onChange={(e) => setFormData({...formData, skinsCount: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-300">Descrição Detalhada</label>
              <button 
                type="button"
                onClick={handleAIHelp}
                disabled={loadingAI}
                className="flex items-center space-x-1 text-xs text-violet-400 hover:text-violet-300 font-bold uppercase transition-all"
              >
                {loadingAI ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                <span>Gerar com IA Gemini</span>
              </button>
            </div>
            <textarea 
              rows={6}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 text-sm"
              placeholder="Liste os principais jogos, itens raros ou tempo de assinatura restante..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            ></textarea>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-600/20 transition-all active:scale-[0.98]"
            >
              Publicar no Marketplace
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border-violet-500/20 sticky top-24">
            <h2 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <DollarSign className="text-green-400" size={20} />
              <span>Cálculo de Lucro</span>
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Preço Cobrado (R$)</label>
                <input 
                  type="number"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white focus:outline-none focus:border-violet-500"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                />
              </div>

              <div className="pt-4 space-y-3 border-t border-slate-700">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Taxa do Marketplace (5%)</span>
                  <span className="text-red-400 font-medium">- R$ {commission.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-slate-100">Seu Lucro Líquido:</span>
                  <span className="text-green-400 text-2xl neon-text">R$ {sellerReceives.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-violet-600/10 rounded-2xl border border-violet-500/20">
              <div className="flex items-start space-x-3">
                <Info size={18} className="text-violet-400 mt-1 shrink-0" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  A taxa de apenas 5% garante a segurança total da transação e o suporte especializado para suas vendas de elite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellAccount;
