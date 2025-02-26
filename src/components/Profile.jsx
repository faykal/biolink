
import React from "react";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const Profile = () => {
  return (
    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-gray-200/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 shadow-lg">
      <div className="text-center">
        <div className="inline-block relative">
          <img
            src="/logo.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-white/20 bg-gray-600 transition-transform hover:scale-105"
            onError={(e) => {
              e.target.innerText = 'NA';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-lg font-bold mt-2">Faykal <RiVerifiedBadgeFill className="inline text-blue-500" /></h1>
        
          
        <p className="text-gray-400 text-xs">Dreamer, Thinker, Doer.</p>
        <div className="flex justify-center gap-2 mt-3">
          <span className="bg-white/5 px-3 py-1 rounded-full text-xs hover:bg-white/10 transition-all hover:scale-105 ring-1 ring-yellow-500">💻 Ngoding</span>
          <span className="bg-white/5 px-3 py-1 rounded-full text-xs hover:bg-white/10 transition-all hover:scale-105 ring-1 ring-yellow-500">Turu</span>
          <span className="bg-white/5 px-3 py-1 rounded-full text-xs hover:bg-white/10 transition-all hover:scale-105 ring-1 ring-yellow-500">Anime</span>
          <span className="bg-white/5 px-3 py-1 rounded-full text-xs hover:bg-white/10 transition-all hover:scale-105 ring-1 ring-yellow-500">Game</span>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xl text-gray-400">
          <a href="https://instagram.com/fikrifaykal" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            <FaInstagram className="h-5 w-5 text-pink-600" />
          </a>
          <a href="https://www.tiktok.com/@faykalmlbb?_t=8qHhC1W8Ucy&_r=1" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            <FaTiktok className="h-5 w-5 text-white-600" />
          </a>
          <a href="https://wa.me/6285234754939" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            <FaWhatsapp className="h-5 w-5 text-green-600" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
