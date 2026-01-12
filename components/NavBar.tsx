
import React from 'react';

interface NavBarProps {
  onHome: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onHome }) => {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50 rounded-b-3xl">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <button 
          onClick={onHome}
          className="text-2xl font-bold text-orange-500 flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <span>🎨</span>
          <span>KidsEnglish</span>
        </button>
        <div className="flex gap-4">
          <span className="text-yellow-500 font-bold hidden sm:inline">Hello, Little Explorer! 🌟</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
