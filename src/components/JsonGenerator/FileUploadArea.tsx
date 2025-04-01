
import React, { useRef } from 'react';
import { Upload } from "lucide-react";

interface FileUploadAreaProps {
  selectedFile: File | null;
  onFileChange: (file: File) => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ selectedFile, onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
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
  );
};

export default FileUploadArea;
