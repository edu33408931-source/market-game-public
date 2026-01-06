
import React from 'react';
import { Link } from 'react-router-dom';
import { AccountListing } from '../types';
import { ShieldCheck, Layers, Award, Clock } from 'lucide-react';

interface Props {
  listing: AccountListing;
}

const AccountCard: React.FC<Props> = ({ listing }) => {
  // Simple time ago calculation
  const getTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Agora mesmo';
    if (hours < 24) return `${hours}h atrás`;
    return `${Math.floor(hours / 24)}d atrás`;
  };

  return (
    <div className="group relative glass-panel rounded-xl overflow-hidden hover:border-violet-500/40 transition-all duration-300 flex flex-col h-full bg-slate-900/40">
      {/* Smaller Image Area */}
      <div className="h-36 overflow-hidden relative">
        <img 
          src={listing.imageUrl} 
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        
        <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/5 flex items-center space-x-1">
          <Award className="text-violet-400 w-2.5 h-2.5" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-white/90">{listing.game}</span>
        </div>

        <div className="absolute bottom-2 right-2 bg-violet-600 px-2 py-1 rounded-md font-bold text-sm shadow-lg text-white">
          R$ {listing.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center space-x-1 text-[9px] text-violet-400 font-bold uppercase mb-1">
          <Clock size={10} />
          <span>{getTimeAgo(listing.createdAt)}</span>
        </div>
        
        <h3 className="font-bold text-sm mb-3 line-clamp-1 text-slate-100 group-hover:text-violet-400 transition-colors">
          {listing.title}
        </h3>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
            <ShieldCheck size={12} className="text-slate-500" />
            <span className="truncate max-w-[60px]">{listing.rank}</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
            <Layers size={12} className="text-slate-500" />
            <span>{listing.skinsCount} Itens</span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-slate-800/50 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <div className="w-5 h-5 rounded-full bg-slate-800 overflow-hidden ring-1 ring-slate-700">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${listing.sellerName}`} alt="avatar" />
            </div>
            <span className="text-[10px] text-slate-500 font-medium">{listing.sellerName}</span>
          </div>
          <Link 
            to={`/listing/${listing.id}`}
            className="text-[10px] font-bold text-violet-500 hover:text-violet-400 transition-colors flex items-center"
          >
            DETALHES
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
