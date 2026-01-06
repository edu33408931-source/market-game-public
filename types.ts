
export enum GameType {
  LEAGUE_OF_LEGENDS = 'League of Legends',
  VALORANT = 'Valorant',
  FORTNITE = 'Fortnite',
  CS2 = 'Counter-Strike 2',
  GENSHIN_IMPACT = 'Genshin Impact',
  WORLD_OF_WARCRAFT = 'World of Warcraft',
  XBOX_ACCOUNTS = 'Xbox Accounts',
  PLAYSTATION_ACCOUNTS = 'PlayStation Accounts',
  GAME_PASS = 'Game Pass (Assinaturas)',
  ROBLOX = 'Roblox',
  MOBILE_GAMES = 'Jogos Mobile (FF/ML)',
  MINECRAFT = 'Minecraft'
}

export interface AccountListing {
  id: string;
  game: GameType;
  title: string;
  description: string;
  price: number;
  sellerFee: number; // 10% fee
  sellerReceives: number; // 90% total
  rank: string;
  skinsCount: number;
  level: number;
  sellerName: string;
  createdAt: string;
  imageUrl: string;
  status: 'active' | 'sold';
}

export interface User {
  id: string;
  name: string;
  balance: number;
  role: 'buyer' | 'seller';
}
