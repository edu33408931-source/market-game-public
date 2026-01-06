
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Tag, User, TrendingUp, CreditCard } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800 px-4 md:px-8 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2 group">
        <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:rotate-12 transition-transform">
          <TrendingUp className="text-white w-6 h-6" />
        </div>
        <span className="gaming-font text-2xl font-bold tracking-tighter text-white">
          GAME<span className="text-violet-500">TRADE</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <Link 
          to="/" 
          className={`flex items-center space-x-2 font-medium transition-colors ${isActive('/') ? 'text-violet-400' : 'text-slate-400 hover:text-white'}`}
        >
          <ShoppingCart size={18} />
          <span>Mercado</span>
        </Link>
        <Link 
          to="/sell" 
          className={`flex items-center space-x-2 font-medium transition-colors ${isActive('/sell') ? 'text-violet-400' : 'text-slate-400 hover:text-white'}`}
        >
          <Tag size={18} />
          <span>Vender</span>
        </Link>
        <Link 
          to="/dashboard" 
          className={`flex items-center space-x-2 font-medium transition-colors ${isActive('/dashboard') ? 'text-violet-400' : 'text-slate-400 hover:text-white'}`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex flex-col items-end mr-2 text-xs">
          <span className="text-slate-400">Disponível</span>
          <div className="flex items-center space-x-1">
             <span className="text-green-400 font-bold">R$ 1.250,00</span>
             <CreditCard size={12} className="text-slate-600" />
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 hover:bg-slate-700 hover:border-violet-500 transition-all">
          <User className="text-slate-300 w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
