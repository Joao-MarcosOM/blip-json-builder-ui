
import React from 'react';
import { MessageSquareText } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-blip-primary text-white py-4 shadow-md">
      <div className="container flex items-center justify-center md:justify-start gap-2">
        <MessageSquareText size={28} />
        <h1 className="text-xl font-bold">Blip JSON Builder</h1>
      </div>
    </header>
  );
};

export default Header;
