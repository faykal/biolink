import React from "react";
import { FaSpotify } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const links = [
  { title: "Personal Website", description: "About me.", url: "me.faykalbotz.my.id", icon: "🌐" },
  { title: "Personal Store", description: "About store me.", url: "https://autoresbot.com/tmp_files/330b3e41-89c5-4857-956b-ad3771efc4d2.jpeg", icon: "🛒" },
  { title: "Faykal BOT", description: "Make things easier for you through faykal bot.", url: "https://wa.me/62882005354232?text=.allmenu", icon: "🪐" },
  { title: "Faykal Channel", description: "Information about bots.", url: "https://whatsapp.com/channel/0029Vax4ADpI1rcZh3aveq1e", icon: "🕊️" },
  { title: "Brat Generator", description: "Create beautiful spaced text images with custom colors.", url: "https://brat.faykalbotz.my.id", icon: "👾" },
  { title: "Donate", description: "Donate as you wish.", url: "https://pay.faykalbotz.my.id", icon: "💰" }
];

const Links = () => {
  return (
    <div className="w-full max-w-md mt-6 space-y-3">
      {links.map((link, index) => (
        <a 
          key={index}
          href={link.url}
          className={`flex items-center justify-between p-3 bg-gray-100/80 dark:bg-white/5 backdrop-blur-lg hover:bg-gray-200/80 dark:hover:bg-white/10 ${link.isSpotify ? 'rounded-full' : 'rounded-lg'} transition-all duration-300 cursor-pointer group hover:translate-x-1 border border-gray-200/50 dark:border-white/10 shadow-lg`}
        >
          {link.isSpotify ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10">
                  <img src={link.albumArt} alt="Album Art" className="rounded-full" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">{link.songTitle}</h3>
                  <p className="text-xs text-gray-400">{link.artist}</p>
                </div>
              </div>
              
              <FaSpotify className="text-green-500 text-xl" />
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3">
                <span className="text-lg">{link.icon}</span>
                <div>
                  <h3 className="text-sm font-medium">{link.title}</h3>
                  <p className="text-xs text-gray-400">{link.description}</p>
                </div>
              </div>
              <HiArrowRight className="text-gray-400 text-sm" />
            </>
          )}
        </a>
      ))}
    </div>
  );
};

export default Links;
