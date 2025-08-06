'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File } from 'lucide-react';

interface FileDropZoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // en MB
  className?: string;
}

export default function FileDropZone({ 
  onFileSelect, 
  accept = '*/*', 
  maxSize = 100,
  className = ''
}: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev - 1);
    if (dragCounter <= 1) {
      setIsDragOver(false);
    }
  }, [dragCounter]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragCounter(0);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.size > maxSize * 1024 * 1024) {
        alert(`El archivo es demasiado grande. Tamaño máximo: ${maxSize}MB`);
        return;
      }
      onFileSelect(file);
    }
  }, [maxSize, onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > maxSize * 1024 * 1024) {
        alert(`El archivo es demasiado grande. Tamaño máximo: ${maxSize}MB`);
        return;
      }
      onFileSelect(file);
    }
  }, [maxSize, onFileSelect]);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`
          relative overflow-hidden rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          }
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence>
          {isDragOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 bg-blue-500/10 flex items-center justify-center rounded-2xl"
            >
              <div className="text-blue-600">
                <Upload className="w-16 h-16 mx-auto mb-4 animate-bounce" />
                <p className="text-lg font-semibold">¡Suelta el archivo aquí!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="space-y-4">
          <motion.div
            animate={{ 
              y: isDragOver ? -10 : 0,
              opacity: isDragOver ? 0.3 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Upload className="w-12 h-12 mx-auto text-gray-400" />
          </motion.div>
          
          <div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Arrastra y suelta tu archivo aquí
            </p>
            <p className="text-sm text-gray-500 mb-4">
              o haz clic para seleccionar un archivo
            </p>
            <p className="text-xs text-gray-400">
              Tamaño máximo: {maxSize}MB
            </p>
          </div>

          <motion.button
            type="button"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Seleccionar archivo
          </motion.button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-purple-100 rounded-full opacity-50 blur-lg"></div>
      </motion.div>
    </div>
  );
}
