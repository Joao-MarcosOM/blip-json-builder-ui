
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, Copy, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setJsonResponse(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setJsonResponse(null);
    }
  };

  const startTimer = () => {
    // Reset processing time and progress
    setProcessingTime(0);
    setProgressValue(0);
    
    // Clear any existing timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Start a new timer
    timerRef.current = setInterval(() => {
      setProcessingTime(prev => {
        const newTime = prev + 1;
        // Gradually increase progress based on time
        setProgressValue(Math.min(newTime * 5, 95)); // Caps at 95% until complete
        return newTime;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setProgressValue(100); // Complete the progress bar
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Nenhuma imagem selecionada",
        description: "Por favor, selecione uma imagem para enviar.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setJsonResponse(null);
    startTimer();

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('purpose', 'assistants');

      const response = await fetch('http://127.0.0.1:8080/builderJson/generateBuilder', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();
      stopTimer();
      setJsonResponse(JSON.stringify(data, null, 2));
      
      toast({
        title: "Sucesso!",
        description: "JSON gerado com sucesso.",
      });
    } catch (error) {
      stopTimer();
      console.error('Error:', error);
      toast({
        title: "Erro ao processar a imagem",
        description: error instanceof Error ? error.message : "Ocorreu um erro desconhecido",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-blip-primary/20">
        <CardHeader className="bg-blip-primary/10 rounded-t-lg">
          <CardTitle className="text-blip-tertiary">Gerador de JSON Builder</CardTitle>
          <CardDescription>Faça upload de uma imagem para gerar o JSON Builder</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${selectedFile ? 'border-blip-primary bg-blip-primary/5' : 'border-gray-300 hover:border-blip-primary/50'}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Upload className="mx-auto h-12 w-12 text-blip-secondary mb-4" />
            {selectedFile ? (
              <div>
                <p className="text-sm font-medium mb-1">Imagem selecionada:</p>
                <p className="text-sm text-gray-600 break-all">{selectedFile.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
                <div className="mt-4">
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Preview" 
                    className="max-h-32 mx-auto object-contain rounded" 
                  />
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium">Arraste uma imagem ou clique para selecionar</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG ou GIF (max. 10MB)</p>
              </div>
            )}
          </div>

          {isLoading && (
            <div className="mt-6 animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-blip-tertiary">
                  Gerando JSON... {processingTime}s
                </h3>
              </div>
              <Progress value={progressValue} className="h-2 bg-gray-200" />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Processando a imagem e gerando o JSON Builder
              </p>
            </div>
          )}

          {jsonResponse && (
            <div className="mt-6 animate-fade-in">
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
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs">
                {jsonResponse}
              </pre>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedFile(null);
              setJsonResponse(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            disabled={isLoading || (!selectedFile && !jsonResponse)}
          >
            Limpar
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || isLoading}
            className="bg-blip-primary hover:bg-blip-secondary"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              'Gerar JSON'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImageUploader;
