

import React from 'react';
import { ViewState, Branding } from '../types';
import { GraduationCap, Menu, X, Heart, Calendar, ShoppingBag, PenTool, Users, DollarSign } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  branding: Branding;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, branding }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems: { id: ViewState; label: string; icon: React.ReactNode; special?: boolean }[] = [
    { id: 'home', label: 'Home', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
    { id: 'directory', label: 'Alumni Directory', icon: <Users className="w-4 h-4" /> },
    { id: 'membership', label: 'Join Us', icon: <Heart className="w-4 h-4" /> },
    { id: 'shop', label: 'Shop', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'donate', label: 'Donate', icon: <DollarSign className="w-4 h-4" />, special: true },
    { id: 'admin', label: 'Admin Tools', icon: <PenTool className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-school-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer group" onClick={() => setView('home')}>
            {/* Logo Container */}
            <div className="bg-white p-1 rounded-lg mr-3 shadow-md group-hover:shadow-lg transition-all duration-300">
              <img 
                src={branding.logo} 
                alt={`${branding.name} Crest`} 
                className="h-12 w-12 object-contain" 
              />
            </div>
            
            <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl tracking-wider leading-none text-white">{branding.name}</span>
                <span className="text-[10px] text-school-gold font-medium tracking-widest uppercase opacity-90">{branding.fullName}</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    item.special 
                        ? 'bg-school-gold text-school-900 hover:bg-yellow-400'
                        : currentView === item.id
                            ? 'bg-school-800 text-school-gold'
                            : 'hover:bg-school-800 hover:text-white'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-school-800 inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-school-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-school-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    item.special
                    ? 'bg-school-gold text-school-900'
                    : currentView === item.id
                        ? 'bg-school-900 text-school-gold'
                        : 'text-gray-300 hover:bg-school-700 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
