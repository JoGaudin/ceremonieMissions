"use client"

import React, { useState } from 'react';
import {
  Users,
  Target,
  ShieldAlert,
  ChevronRight,
  Home,
  Flame,
  Wine,
  Shirt,
  Brain,
  Swords,
  Lock,
  Clock,
  Languages,
  Footprints,
  Music,
  VenusAndMars,
  Cat,
  CheckCircle2Icon,
  Waves
} from 'lucide-react';

// Définition des interfaces pour le typage
interface Mission {
  id: number;
  text: string;
  icon: React.ReactNode;
  difficulty: string;
  successRate: string;
  done: boolean;
}

interface User {
  id: string;
  name: string;
  role: string;
  status: string;
  xp: number;
  avatar: string;
  missions: Mission[];
}

const INITIAL_USERS_DATA: User[] = [
  {
    id: 'laurine',
    name: 'Laurine',
    role: 'Loveuse en série',
    status: 'En cours',
    xp: 1200,
    avatar: 'LR',
    missions: [
      { id: 1, text: 'Ne pas pécho de mecs', icon: <Flame className="text-orange-500" />, difficulty: 'Légendaire', successRate: '70%', done: false },
      { id: 10, text: 'Se souvenir de la soirée', icon: <Brain className="text-orange-500" />, difficulty: 'Cognitive', successRate: '50%', done: false },
      { id: 17, text: 'Vomir dans les jaricones de la terrasse', icon: <Waves className='text-orange-500" />, difficulty: 'Sécurité', successRate: '10%', done: false},
      { id: 20, text: 'Ne pas perdre son permis', icon: <Waves className='text-orange-500' />, difficulty: 'Impossible', successRate: 'Pas prévu', done: false }
    ]
  },
  {
    id: 'sanchez',
    name: 'Sanchez',
    role: 'Danseur',
    status: 'Vigilant',
    xp: 850,
    avatar: 'SZ',
    missions: [
      { id: 2, text: 'Ne pas boire plus d\'un verre de champagne', icon: <Wine className="text-yellow-400" />, difficulty: 'Difficile', successRate: '0%', done: false },
      { id: 11, text: 'Danser sur "Y QUE FUE"', icon: <Music className="text-yellow-400" />, difficulty: 'Media', successRate: '100%', done: false }
    ]
  },
  {
    id: 'mathieu',
    name: 'Mathieu',
    role: 'Arbitre',
    status: 'My fault',
    xp: 900,
    avatar: 'MT',
    missions: [
      { id: 3, text: 'Ne pas déchirer sa chemise', icon: <Shirt className="text-blue-400" />, difficulty: 'Modéré', successRate: '80%', done: false },
      { id: 4, text: 'Réussir à parler', icon: <Target className="text-green-400" />, difficulty: 'Épique', successRate: '100%', done: false }
    ]
  },
  {
    id: 'luka',
    name: 'Luka',
    role: 'Philosophe',
    status: 'Focus',
    xp: 1100,
    avatar: 'LK',
    missions: [
      { id: 5, text: 'Ne pas gamberger', icon: <Brain className="text-purple-400" />, difficulty: 'Impossible', successRate: '30%', done: false },
      { id: 14, text: 'Finir torse nu avec Tigrou', icon: <Cat className="text-purple-400" />, difficulty: 'Légendaire', successRate: '90%', done: false },
      { id: 18, text: 'Vomir dans les jardinières de la terrasse', icon: <Waves className="text-purple-400" />, difficulty: 'Sécurité', successRate: '10%', done: false }
    ]
  },
  {
    id: 'johan',
    name: 'Johan',
    role: 'Codeur',
    status: 'Calme',
    xp: 1500,
    avatar: 'JH',
    missions: [
      { id: 6, text: 'Ne pas se battre', icon: <Swords className="text-red-500" />, difficulty: 'Légendaire', successRate: '99%', done: false },
      { id: 13, text: 'Ne pas ken dans les toilettes', icon: <VenusAndMars className="text-red-500" />, difficulty: 'Impossible', successRate: '0,01%', done: false }
    ]
  },
  {
    id: 'diane',
    name: 'Diane',
    role: 'Reine',
    status: 'Protégée',
    xp: 2000,
    avatar: 'DN',
    missions: [
      { id: 7, text: 'Ne pas se faire toucher les fesses excepté Johan', icon: <Lock className="text-pink-400" />, difficulty: 'Haute Sécurité', successRate: '100%', done: false },
      { id: 12, text: 'Réussir à marcher avec ses talons en fin de soirée', icon: <Footprints className="text-pink-400" />, difficulty: 'Endurance', successRate: '80%', done: false }
    ]
  },
  {
    id: 'abram',
    name: 'Abram',
    role: 'Speedrunner',
    status: 'En route',
    xp: 700,
    avatar: 'AB',
    missions: [
      { id: 8, text: 'Arriver avant 23h', icon: <Clock className="text-cyan-400" />, difficulty: 'Contre-la-montre', successRate: '0%', done: false },
      { id: 15, text: 'Lancer les Corons', icon: <Music className="text-cyan-400" />, difficulty: 'Brassard', successRate: '55%', done: false }
    ]
  },
  {
    id: 'emma',
    name: 'Emma',
    role: 'La Sudiste',
    status: 'Bronzette',
    xp: 100,
    avatar: 'EM',
    missions: [
      { id: 9, text: 'Parler qu\'avec l\'accent du sud après 22h', icon: <Languages className="text-cyan-400" />, difficulty: 'Gaté', successRate: '80%', done: false },
      { id: 16, text: 'Se mettre une murge avec les darons', icon: <Wine className="text-cyan-400" />, difficulty: 'Légendaire', successRate: '100%', done: false }
    ]
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'profile'>('home');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS_DATA);
  const selectedUser = users.find(u => u.id === selectedUserId) || null;

  const navigateToUser = (user: User) => {
    setSelectedUserId(user.id);
    setCurrentPage('profile');
  };

  const navigateHome = () => {
    setCurrentPage('home');
    setSelectedUserId(null);
  };

  const handleValidateMission = (userId: string, missionId: number) => {
    setUsers(currentUsers =>
      currentUsers.map(user => {
        if (user.id !== userId) return user;

        return {
          ...user,
          missions: user.missions.map(mission =>
            mission.id === missionId ? { ...mission, done: true } : mission
          )
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#121214]/80 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={navigateHome}
          >
            <div className="p-2 bg-blue-600 rounded-lg group-hover:rotate-12 transition-transform">
              <Target size={20} className="text-white" />
            </div>
            <h1 className="font-bold tracking-tighter text-xl">Ceremonie<span className="text-blue-500">Mission</span></h1>
          </div>
          <div className="flex gap-4">
            <button onClick={navigateHome} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <Home size={22} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold border border-white/20">
              YOU
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto p-4 pb-24">
        {currentPage === 'home' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Objectifs de la Soirée</h2>
                <p className="text-slate-400 text-sm">7 Joueurs en ligne • 8 Missions actives</p>
              </div>
              <div className="absolute top-[-20%] right-[-10%] opacity-10 rotate-12">
                <Target size={150} />
              </div>
            </div>

            {/* User List */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">Membres de l'escouade</h3>
              {INITIAL_USERS_DATA.map((user) => (
                <div
                  key={user.id}
                  onClick={() => navigateToUser(user)}
                  className="bg-[#121214] border border-white/5 p-4 rounded-xl flex items-center justify-between hover:border-blue-500/50 hover:bg-[#18181b] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-blue-400 border border-white/10">
                        {user.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0a0a0c] rounded-full shadow-lg"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{user.name}</h4>
                      <p className="text-xs text-slate-500">{user.role} • {user.missions.filter(mission => mission.done).length}/{user.missions.length} Quête(s)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-slate-400">
                      XP {user.xp}
                    </span>
                    <ChevronRight size={18} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Profile Page */
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <button
              onClick={navigateHome}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-2"
            >
              <ChevronRight className="rotate-180" size={16} /> Retour au Menu
            </button>

            {/* Profile Header */}
            <div className="bg-[#121214] border border-white/10 rounded-2xl overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-700"></div>
              <div className="px-6 pb-6 relative">
                <div className="w-20 h-20 bg-slate-800 border-4 border-[#121214] rounded-2xl flex items-center justify-center font-bold text-2xl text-white absolute -top-10 shadow-2xl">
                  {selectedUser?.avatar}
                </div>
                <div className="pt-12 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black">{selectedUser?.name}</h2>
                    <p className="text-blue-400 font-medium">{selectedUser?.role}</p>
                  </div>
                  <div className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {selectedUser?.status}
                  </div>
                </div>
                <div className="mt-4 flex gap-6 border-t border-white/5 pt-4">
                  <div>
                    <p className="text-[10px] uppercase text-slate-500 font-bold">Niveau</p>
                    <p className="font-mono text-lg">{(selectedUser?.xp! / 100).toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-500 font-bold">Points de Vie</p>
                    <div className="w-24 h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className="bg-green-500 h-full w-[85%] shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Missions Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-100">
                <Target size={18} className="text-blue-500" />
                <h3 className="font-bold">Journal des Quêtes</h3>
              </div>

              {selectedUser?.missions.map((mission) => (
                <div
                  key={mission.id}
                  className={`p-5 rounded-r-xl group transition-all duration-300 border-y border-r ${mission.done
                      ? "bg-[#121214]/50 border-l-4 border-l-green-500 border-white/5 opacity-80"
                      : "bg-[#121214] border-l-4 border-l-blue-500 border-white/5"
                    }`}
                >
                  <div className="flex gap-4">
                    <div className={`mt-1 p-3 rounded-lg flex items-center justify-center transition-colors ${mission.done ? "bg-green-500/10 text-green-500" : "bg-white/5"
                      }`}>
                      {mission.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-500">
                          Objectif Principal
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border italic ${mission.done
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}>
                          {mission.done ? "COMPLÉTÉ" : mission.difficulty}
                        </span>
                      </div>

                      <p className={`text-lg font-semibold leading-tight transition-colors ${mission.done ? "text-slate-400 line-through decoration-green-500/50" : "group-hover:text-blue-400"
                        }`}>
                        {mission.text}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <ShieldAlert size={12} />
                          <span>Taux de réussite : {mission.successRate}</span>
                        </div>

                        {!mission.done ? (
                          <button
                            onClick={() => handleValidateMission(selectedUser.id, mission.id)}
                            className="text-[10px] font-bold text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
                          >
                            VALIDER
                          </button>
                        ) : (
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-green-500 flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded">
                              <CheckCircle2Icon size={12} /> MISSION RÉUSSIE
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 w-full bg-[#0a0a0c] border-t border-white/5 p-4 z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Server: Soirée_v1.0.4
          </div>
          <div className="text-[10px] font-mono text-slate-500 uppercase">
            Quest Progress: {((users.filter(user => user.missions.every(mission => mission.done)).length) / (users.length)) * 100}%
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;