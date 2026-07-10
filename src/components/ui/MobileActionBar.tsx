'use client';

import { Phone, Send, Home } from 'lucide-react';

export function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-dark border-t border-white/10 backdrop-blur-2xl safe-area-bottom">
      <div className="grid grid-cols-3 gap-1 p-2">
        <a
          href="tel:+79824880283"
          className="flex flex-col items-center gap-1 py-2.5 text-milk/70 hover:text-gold transition-colors"
        >
          <Phone size={20} />
          <span className="text-[10px] tracking-wider uppercase">Позвонить</span>
        </a>
        <a
          href="https://t.me/artipark"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 text-milk/70 hover:text-gold transition-colors"
        >
          <Send size={20} />
          <span className="text-[10px] tracking-wider uppercase">Telegram</span>
        </a>
        <a
          href="#apartments"
          className="flex flex-col items-center gap-1 py-2.5 text-gold"
        >
          <Home size={20} />
          <span className="text-[10px] tracking-wider uppercase font-medium">Квартиру</span>
        </a>
      </div>
    </div>
  );
}
