import { useState } from "react";
import { MessageSection } from "./message-section";
import { MemoriesSection } from "./memories-section";
import { PlaylistSection } from "./playlist-section";
import { ShayariSection } from "./shayari-section";
import { ForgivenessNote } from "./forgiveness-note";
import { FavoritesSection } from "./favorites-section";
import { MidnightTheme } from "./midnight-theme";
import { CustomPoem } from "./custom-poem";

interface TabContentProps {
  onBack: () => void;
}

export function TabContent({ onBack }: TabContentProps) {
  const [activeTab, setActiveTab] = useState<
    "message" | "memories" | "playlist" | "shayari" | "forgiveness" | "favorites" | "midnight" | "poems"
  >("message");
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs Navigation */}
      <div className="flex justify-center flex-wrap mb-8 border-b border-lavender/30">
        <button
          onClick={() => setActiveTab("message")}
          className={`tab-btn font-quicksand font-semibold text-lg py-3 px-3 focus:outline-none ${
            activeTab === "message"
              ? "text-coral border-b-2 border-coral"
              : "text-gray-400 hover:text-coral border-b-2 border-transparent"
          }`}
        >
          <i className="fas fa-heart mr-1"></i>Message
        </button>
        <button
          onClick={() => setActiveTab("shayari")}
          className={`tab-btn font-quicksand font-semibold text-lg py-3 px-3 focus:outline-none ${
            activeTab === "shayari"
              ? "text-coral border-b-2 border-coral"
              : "text-gray-400 hover:text-coral border-b-2 border-transparent"
          }`}
        >
          <i className="fas fa-feather-alt mr-1"></i>Shayari
        </button>
        <button
          onClick={() => setActiveTab("forgiveness")}
          className={`tab-btn font-quicksand font-semibold text-lg py-3 px-3 focus:outline-none ${
            activeTab === "forgiveness"
              ? "text-coral border-b-2 border-coral"
              : "text-gray-400 hover:text-coral border-b-2 border-transparent"
          }`}
        >
          <i className="fas fa-heart-broken mr-1"></i>Forgiveness
        </button>
        <button
          onClick={() => setActiveTab("poems")}
          className={`tab-btn font-quicksand font-semibold text-lg py-3 px-3 focus:outline-none ${
            activeTab === "poems"
              ? "text-coral border-b-2 border-coral"
              : "text-gray-400 hover:text-coral border-b-2 border-transparent"
          }`}
        >
          <i className="fas fa-pen-fancy mr-1"></i>Poems
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          className={`tab-btn font-quicksand font-semibold text-lg py-3 px-3 focus:outline-none ${
            activeTab === "favorites"
              ? "text-coral border-b-2 border-coral"
              : "text-gray-400 hover:text-coral border-b-2 border-transparent"
          }`}
        >
          <i className="fas fa-star mr-1"></i>Favorites
        </button>
        <button
          onClick={() => setActiveTab("midnight")}
          className={`tab-btn font-quicksand font-semibold text-lg py-3 px-3 focus:outline-none ${
            activeTab === "midnight"
              ? "text-coral border-b-2 border-coral"
              : "text-gray-400 hover:text-coral border-b-2 border-transparent"
          }`}
        >
          <i className="fas fa-moon mr-1"></i>Night Sky
        </button>
        <button
          onClick={() => setActiveTab("memories")}
          className={`tab-btn font-quicksand font-semibold text-lg py-3 px-3 focus:outline-none ${
            activeTab === "memories"
              ? "text-coral border-b-2 border-coral"
              : "text-gray-400 hover:text-coral border-b-2 border-transparent"
          }`}
        >
          <i className="fas fa-images mr-1"></i>Memories
        </button>
        <button
          onClick={() => setActiveTab("playlist")}
          className={`tab-btn font-quicksand font-semibold text-lg py-3 px-3 focus:outline-none ${
            activeTab === "playlist"
              ? "text-coral border-b-2 border-coral"
              : "text-gray-400 hover:text-coral border-b-2 border-transparent"
          }`}
        >
          <i className="fas fa-music mr-1"></i>Playlist
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "message" && <MessageSection />}
        {activeTab === "memories" && <MemoriesSection />}
        {activeTab === "playlist" && <PlaylistSection />}
        {activeTab === "shayari" && <ShayariSection />}
        {activeTab === "forgiveness" && <ForgivenessNote />}
        {activeTab === "favorites" && <FavoritesSection />}
        {activeTab === "midnight" && <MidnightTheme />}
        {activeTab === "poems" && <CustomPoem />}
      </div>
      
      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <div className="flex flex-wrap justify-center mb-3 gap-2">
          <span>☕</span>
          <span>🌹</span>
          <span>⬛</span>
          <span>🌙</span>
          <span>☁️</span>
          <span>💖</span>
        </div>
        
        <p>Made with <span className="text-coral">♥</span> specially for Zobiya</p>
        <p className="font-urdu text-lg mt-2" style={{ direction: 'rtl' }}>
          آپ کی دوستی میرے لیے بہت قیمتی ہے
        </p>
        <p className="text-xs italic text-gray-400 mb-3">(Your friendship is very precious to me)</p>
        <div className="mt-2">
          <button
            onClick={onBack}
            className="text-lavender hover:text-coral transition-colors font-quicksand"
          >
            <i className="fas fa-arrow-left mr-1"></i> Back to Card
          </button>
        </div>
      </footer>
    </div>
  );
}
