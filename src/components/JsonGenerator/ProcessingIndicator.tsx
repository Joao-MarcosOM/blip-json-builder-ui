
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProcessingIndicatorProps {
  processingTime: number;
  progressValue: number;
}

const ProcessingIndicator: React.FC<ProcessingIndicatorProps> = ({ 
  processingTime, 
  progressValue 
}) => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-blip-tertiary">
          Gerando JSON... {processingTime}s
        </h3>
        <span className="text-xs text-gray-500">{Math.round(progressValue)}%</span>
      </div>
      <Progress value={progressValue} className="h-2 bg-gray-200" />
      <p className="text-xs text-gray-500 mt-2 text-center">
        Processando a imagem e gerando o JSON Builder
      </p>
    </div>
  );
};

export default ProcessingIndicator;
