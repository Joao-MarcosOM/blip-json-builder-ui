
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Check, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface JsonDisplayProps {
  jsonResponse: any; // Accept any type of response
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ jsonResponse }) => {
  const [copied, setCopied] = useState(false);
  const [formattedJson, setFormattedJson] = useState<string>("");

  useEffect(() => {
    // Format the JSON for display
    try {
      if (jsonResponse) {
        // Format based on the type of response
        if (typeof jsonResponse === 'string') {
          try {
            // If it's a valid JSON string, parse and format it
            const parsed = JSON.parse(jsonResponse);
            setFormattedJson(JSON.stringify(parsed, null, 2));
          } catch (e) {
            // If parsing fails, use the raw string
            setFormattedJson(jsonResponse);
          }
        } else {
          // If it's already an object/array, stringify it
          setFormattedJson(JSON.stringify(jsonResponse, null, 2));
        }
      }
    } catch (e) {
      console.error('Error formatting JSON:', e);
      // Fallback to string representation if formatting fails
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
      
      <div className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs max-h-96 overflow-y-auto">
        <pre className="whitespace-pre-wrap break-words">{formattedJson}</pre>
      </div>
    </div>
  );
};

export default JsonDisplay;
