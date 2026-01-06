
import React, { useState, useMemo } from 'react';
import AccountCard from '../components/AccountCard';
import { GameType, AccountListing } from '../types';
import { 
  Search, 
  LayoutGrid, 
  Gamepad2, 
  Swords, 
  Shield, 
  Wand2, 
  Target, 
  Gamepad, 
  Disc, 
  Zap, 
  Box, 
  Smartphone, 
  Pickaxe,
  Clock
} from 'lucide-react';

const GAME_ICONS: Record<string, any> = {
  [GameType.VALORANT]: Target,
  [GameType.LEAGUE_OF_LEGENDS]: Swords,
  [GameType.FORTNITE]: Gamepad2,
  [GameType.CS2]: Shield,
  [GameType.GENSHIN_IMPACT]: Wand2,
  [GameType.WORLD_OF_WARCRAFT]: LayoutGrid,
  [GameType.XBOX_ACCOUNTS]: Gamepad,
  [GameType.PLAYSTATION_ACCOUNTS]: Disc,
  [GameType.GAME_PASS]: Zap,
  [GameType.ROBLOX]: Box,
  [GameType.MOBILE_GAMES]: Smartphone,
  [GameType.MINECRAFT]: Pickaxe,
};

// Mock data with varied timestamps to test sorting
const MOCK_LISTINGS: AccountListing[] = [
  { id: '10', game: GameType.MOBILE_GAMES, title: 'FREE FIRE - CALÇA ANGELICAL + PASSES ANTIGOS', description: 'Conta gemada com itens super raros do início do game.', price: 600, sellerFee: 60, sellerReceives: 540, rank: 'Mestre', skinsCount: 120, level: 75, sellerName: 'FFPro', createdAt: new Date(Date.now()).toISOString(), imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800', status: 'active' },
  { id: '1', game: GameType.VALORANT, title: 'CONTA ASCENDENTE 3 - FULL ACESSO + SKINS RARA', description: 'Conta focada em competitividade...', price: 450, sellerFee: 45, sellerReceives: 405, rank: 'Ascendente 3', skinsCount: 24, level: 112, sellerName: 'ViperMain', createdAt: new Date(Date.now() - 3600000).toISOString(), imageUrl: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f2?auto=format&fit=crop&q=80&w=800', status: 'active' },
  { id: '7', game: GameType.GAME_PASS, title: 'XBOX GAME PASS ULTIMATE - 12 MESES (GIFT)', description: 'Assinatura completa de 1 ano. Resgate imediato na sua conta ou conta nova.', price: 180, sellerFee: 18, sellerReceives: 162, rank: 'Ultimate', skinsCount: 0, level: 0, sellerName: 'StoreMaster', createdAt: new Date(Date.now() - 7200000).toISOString(), imageUrl: 'https://images.unsplash.com/photo-1621333100572-21830749a93c?auto=format&fit=crop&q=80&w=800', status: 'active' },
  { id: '8', game: GameType.XBOX_ACCOUNTS, title: 'CONTA XBOX COM 150+ JOGOS ADQUIRIDOS', description: 'Inclui Elden Ring, GTA V, FIFA 24 e muitos outros.', price: 1200, sellerFee: 120, sellerReceives: 1080, rank: 'Veteran', skinsCount: 500, level: 150, sellerName: 'ConsoleKing', createdAt: new Date(Date.now() - 86400000).toISOString(), imageUrl: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&q=80&w=800', status: 'active' },
  { id: '9', game: GameType.ROBLOX, title: 'CONTA ROBLOX 2016 - ITENS LIMITADOS RARE', description: 'Muitos robux gastos e itens que não voltam mais na loja.', price: 350, sellerFee: 35, sellerReceives: 315, rank: 'Rich', skinsCount: 85, level: 0, sellerName: 'BloxSeller', createdAt: new Date(Date.now() - 172800000).toISOString(), imageUrl: 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=800', status: 'active' },
  { id: '3', game: GameType.FORTNITE, title: 'OG SKULL TROOPER + BLACK KNIGHT - CONTA RARA', description: 'Raridade total. Só para colecionadores...', price: 2500, sellerFee: 250, sellerReceives: 2250, rank: 'Platina', skinsCount: 150, level: 80, sellerName: 'EpicGamer', createdAt: new Date(Date.now() - 259200000).toISOString(), imageUrl: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?auto=format&fit=crop&q=80&w=800', status: 'active' },
];

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState<string>('All');

  // Memoized sorting and filtering to prioritize new listings
  const filteredAndSortedListings = useMemo(() => {
    return MOCK_LISTINGS
      .filter(l => {
        const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              l.game.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGame = selectedGame === 'All' || l.game === selectedGame;
        return matchesSearch && matchesGame;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [searchTerm, selectedGame]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Mini Hero */}
      <section className="mb-10 relative overflow-hidden rounded-2xl p-6 md:p-10 glass-panel border-violet-500/20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="relative z-10">
          <h1 className="gaming-font text-3xl md:text-5xl font-black mb-2 leading-tight">
            NOVIDADES <span className="text-violet-500 neon-text">DAILY</span>.
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl">
            As contas mais recentes do mercado, atualizadas em tempo real. Priorizamos os novos anúncios para você nunca perder uma oportunidade.
          </p>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Categories Sidebar - More Compact */}
        <aside className="w-full lg:w-64 shrink-0 space-y-4">
          <div className="glass-panel p-2 rounded-2xl border-slate-800">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest my-3 px-4">Filtrar por Jogo</h3>
            <div className="space-y-0.5 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
              <button 
                onClick={() => setSelectedGame('All')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all text-sm ${selectedGame === 'All' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <LayoutGrid size={16} />
                <span className="font-medium">Tudo</span>
              </button>
              {Object.values(GameType).map((game) => {
                const Icon = GAME_ICONS[game] || Gamepad2;
                return (
                  <button 
                    key={game}
                    onClick={() => setSelectedGame(game)}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all text-sm ${selectedGame === game ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                  >
                    <Icon size={16} />
                    <span className="font-medium truncate text-left">{game}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="O que você procura hoje? Pesquise por títulos ou jogos..."
              className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-violet-500 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 mb-4 text-xs text-slate-500">
            <Clock size={14} className="text-violet-500" />
            <span>Mostrando os anúncios mais recentes primeiro</span>
          </div>

          {/* Densier Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredAndSortedListings.length > 0 ? (
              filteredAndSortedListings.map(listing => (
                <AccountCard key={listing.id} listing={listing} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center glass-panel rounded-2xl border-dashed border-slate-700">
                <p className="text-slate-500 text-sm">Nenhum anúncio novo encontrado para os filtros selecionados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
