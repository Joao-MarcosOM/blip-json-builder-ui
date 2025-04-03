import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface JsonDisplayProps {
  jsonResponse: any;
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ jsonResponse }) => {
  const [copied, setCopied] = useState(false);
  const [formattedJson, setFormattedJson] = useState<string>("");

  useEffect(() => {
    try {
      if (jsonResponse) {
        if (typeof jsonResponse === 'string') {
          try {
            const parsed = JSON.parse(jsonResponse);
            setFormattedJson(JSON.stringify(parsed, null, 2));
          } catch {
            setFormattedJson(jsonResponse);
          }
        } else {
          setFormattedJson(JSON.stringify(jsonResponse, null, 2));
        }
      }
    } catch (e) {
      console.error('Erro ao formatar JSON:', e);
      setFormattedJson(String(jsonResponse));
    }
  }, [jsonResponse]);

  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const success = document.execCommand('copy');
      return success;
    } catch (err) {
      console.error('Erro no fallback de cópia:', err);
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!formattedJson) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(formattedJson);
      } else {
        const fallbackSuccess = fallbackCopyToClipboard(formattedJson);
        if (!fallbackSuccess) throw new Error('Falha no fallback de cópia');
      }

      setCopied(true);
      toast({
        title: "Copiado!",
        description: "JSON copiado para a área de transferência.",
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar JSON:', err);
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o JSON para a área de transferência.",
        variant: "destructive"
      });
    }
  };

  if (!formattedJson) return null;

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
        <pre className="whitespace-pre-wrap break-words">{formattedJson}</pre>
      </div>
    </div>
  );
};

export default JsonDisplay;
