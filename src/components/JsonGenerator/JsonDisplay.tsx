
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Check, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface JsonDisplayProps {
  jsonResponse: string;
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ jsonResponse }) => {
  const [copied, setCopied] = useState(false);
  const [formattedJson, setFormattedJson] = useState<string>(jsonResponse);

  useEffect(() => {
    // Format the JSON for display
    try {
      if (jsonResponse) {
        // Check if jsonResponse is already a string
        if (typeof jsonResponse === 'string') {
          try {
            // If it's valid JSON string, parse and format it nicely
            const parsed = JSON.parse(jsonResponse);
            setFormattedJson(JSON.stringify(parsed, null, 2));
          } catch (e) {
            // If it's not valid JSON, just use the raw string
            setFormattedJson(jsonResponse);
          }
        } else {
          // If jsonResponse is already an object, stringify it
          setFormattedJson(JSON.stringify(jsonResponse, null, 2));
        }
      }
    } catch (e) {
      console.error('Error formatting JSON:', e);
      setFormattedJson(String(jsonResponse));
    }
  }, [jsonResponse]);

  const handleCopyToClipboard = () => {
    if (formattedJson) {
      navigator.clipboard.writeText(formattedJson);
      setCopied(true);
      toast({
        title: "Copiado!",
        description: "JSON copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Ensure we have valid JSON
  let validJson = true;
  try {
    if (formattedJson && typeof formattedJson === 'string') {
      JSON.parse(formattedJson);
    }
  } catch (e) {
    validJson = false;
  }

  if (!formattedJson) {
    return null;
  }

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
      
      {!validJson && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md mb-2">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-sm text-yellow-700">
              A resposta não parece ser um JSON válido, mas ainda é possível copiá-la.
            </p>
          </div>
        </div>
      )}
      
      <div className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs max-h-96 overflow-y-auto">
        <pre className="whitespace-pre-wrap break-words">{formattedJson}</pre>
      </div>
    </div>
  );
};

export default JsonDisplay;
