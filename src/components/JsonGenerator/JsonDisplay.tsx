
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface JsonDisplayProps {
  jsonResponse: string;
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ jsonResponse }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    if (jsonResponse) {
      navigator.clipboard.writeText(jsonResponse);
      setCopied(true);
      toast({
        title: "Copiado!",
        description: "JSON copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-blip-tertiary">Resposta JSON</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopyToClipboard}
          className="text-xs"
        >
          {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
          {copied ? "Copiado!" : "Copiar"}
        </Button>
      </div>
      <div className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs max-h-96 overflow-y-auto">
        <pre>{jsonResponse}</pre>
      </div>
    </div>
  );
};

export default JsonDisplay;
