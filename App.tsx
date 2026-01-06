
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import SellAccount from './pages/SellAccount';
import Dashboard from './pages/Dashboard';
import ListingDetail from './pages/ListingDetail';
import Rules from './pages/Rules';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/sell" element={<SellAccount />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/rules" element={<Rules />} />
          </Routes>
        </main>
        
        <footer className="border-t border-slate-800 bg-slate-900/50 py-12 px-4 md:px-8 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black">G</span>
                </div>
                <span className="gaming-font text-xl font-bold tracking-tighter text-white">
                  GAME<span className="text-violet-500">TRADE</span>
                </span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6">
                O marketplace definitivo para entusiastas de games. 
                Segurança em primeiro lugar, suporte 24/7 e taxas transparentes.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 hover:border-violet-500 transition-colors cursor-pointer flex items-center justify-center">
                  <div className="w-5 h-5 bg-slate-600 rounded-sm"></div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 hover:border-violet-500 transition-colors cursor-pointer flex items-center justify-center">
                   <div className="w-5 h-5 bg-slate-600 rounded-sm"></div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 hover:border-violet-500 transition-colors cursor-pointer flex items-center justify-center">
                   <div className="w-5 h-5 bg-slate-600 rounded-sm"></div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Plataforma</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="hover:text-violet-400 cursor-pointer transition-colors">Como Funciona</li>
                <li className="hover:text-violet-400 cursor-pointer transition-colors">Segurança e Trust</li>
                <Link to="/rules" className="block hover:text-violet-400 transition-colors">Regras do Mercado</Link>
                <Link to="/sell" className="block hover:text-violet-400 transition-colors">Anunciar Grátis</Link>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Suporte</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="hover:text-violet-400 cursor-pointer transition-colors">Central de Ajuda</li>
                <Link to="/rules" className="block hover:text-violet-400 transition-colors">Termos de Uso</Link>
                <li className="hover:text-violet-400 cursor-pointer transition-colors">Privacidade</li>
                <li className="hover:text-violet-400 cursor-pointer transition-colors">Contato</li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>© 2023 GameTrade Elite. Todos os direitos reservados.</p>
            <p className="mt-4 md:mt-0 italic">Comissionamento fixo de apenas 5% sobre o valor final de venda.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
