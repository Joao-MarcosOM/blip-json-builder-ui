
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blip-tertiary mb-2">Conversor de Imagem para JSON Builder</h1>
            <p className="text-gray-600">
              Faça o upload de uma imagem para gerar automaticamente um JSON Builder compatível com a plataforma Blip.
            </p>
          </div>
          
          <ImageUploader />
          
          <div className="mt-8 p-4 bg-blip-light/20 rounded-lg text-sm text-gray-600">
            <h3 className="font-medium text-blip-secondary mb-2">Como usar:</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>Arraste e solte uma imagem ou clique para selecionar um arquivo</li>
              <li>Clique no botão "Gerar JSON" para processar a imagem</li>
              <li>Aguarde o processamento da imagem</li>
              <li>Copie o JSON resultante para usar na plataforma Blip</li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
