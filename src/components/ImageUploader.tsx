
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Import new components
import FileUploadArea from './JsonGenerator/FileUploadArea';
import JsonDisplay from './JsonGenerator/JsonDisplay';
import ProcessingIndicator from './JsonGenerator/ProcessingIndicator';
import { useProcessingTimer } from '@/hooks/useProcessingTimer';
import { generateJsonBuilder } from '@/services/jsonBuilderService';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { processingTime, progressValue, startTimer, stopTimer } = useProcessingTimer();

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setJsonResponse(null);
    setError(null);
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
    setError(null);
    startTimer();

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('purpose', 'assistants');

      const data = await generateJsonBuilder(formData);
      
      stopTimer();
      setJsonResponse(JSON.stringify(data, null, 2));
      
      toast({
        title: "Sucesso!",
        description: "JSON gerado com sucesso.",
      });
    } catch (error) {
      stopTimer();
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
      setError(errorMessage);
      toast({
        title: "Erro ao processar a imagem",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setJsonResponse(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-blip-primary/20">
        <CardHeader className="bg-blip-primary/10 rounded-t-lg">
          <CardTitle className="text-blip-tertiary">Gerador de JSON Builder</CardTitle>
          <CardDescription>Faça upload de uma imagem para gerar o JSON Builder</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <FileUploadArea 
            selectedFile={selectedFile} 
            onFileChange={handleFileChange} 
          />

          {isLoading && (
            <div className="mt-6">
              <ProcessingIndicator 
                processingTime={processingTime} 
                progressValue={progressValue} 
              />
            </div>
          )}

          {error && !isLoading && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Erro de conexão</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                  <p className="text-xs text-red-600 mt-2">
                    Certifique-se de que o servidor está rodando na porta 8080 e tente novamente.
                  </p>
                </div>
              </div>
            </div>
          )}

          {jsonResponse && (
            <div className="mt-6">
              <JsonDisplay jsonResponse={jsonResponse} />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          <Button 
            variant="outline" 
            onClick={handleClear}
            disabled={isLoading || (!selectedFile && !jsonResponse && !error)}
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
