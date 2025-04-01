
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-4 text-center text-sm text-gray-500">
      <div className="container">
        <p>© {new Date().getFullYear()} Blip JSON Builder. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
