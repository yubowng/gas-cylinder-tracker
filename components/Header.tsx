
import React from 'react';
import { PlusIcon } from './icons';

interface HeaderProps {
  onAddTypeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTypeClick }) => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-sky-400">
          Gas Cylinder Tracker
        </h1>
        <button
          onClick={onAddTypeClick}
          className="flex items-center gap-2 bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Add Type</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
