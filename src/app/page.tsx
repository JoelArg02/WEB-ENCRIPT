'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Unlock, Download, FileCheck, Sparkles, Heart } from 'lucide-react';
import FileDropZone from '@/components/FileDropZone';
import KeyGenerator from '@/components/KeyGenerator';
import ProcessingStatus from '@/components/ProcessingStatus';
import { encryptFile, decryptFile, downloadFile } from '@/utils/encryption';
import { FileProcessingState } from '@/types/encryption';

export default function Home() {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userKey, setUserKey] = useState('');
  const [processingState, setProcessingState] = useState<FileProcessingState>({
    isProcessing: false,
    progress: 0,
    message: '',
    type: 'idle'
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setProcessingState({
      isProcessing: false,
      progress: 0,
      message: '',
      type: 'idle'
    });
  };

  const handleEncrypt = async () => {
    if (!selectedFile || !userKey) {
      setProcessingState({
        isProcessing: false,
        progress: 0,
        message: 'Selecciona un archivo e ingresa una clave',
        type: 'error'
      });
      return;
    }

    setProcessingState({
      isProcessing: true,
      progress: 10,
      message: 'Iniciando encriptación...',
      type: 'encrypting'
    });

    try {
      setProcessingState(prev => ({ ...prev, progress: 30, message: 'Procesando archivo...' }));
      
      const result = await encryptFile(selectedFile, userKey);
      
      setProcessingState(prev => ({ ...prev, progress: 80, message: 'Generando archivo encriptado...' }));
      
      // Descargar el archivo encriptado
      downloadFile(result.encryptedData, result.filename, 'text/plain');
      
      setProcessingState({
        isProcessing: false,
        progress: 100,
        message: '¡Archivo encriptado exitosamente!',
        type: 'success'
      });

      // Limpiar después de 3 segundos
      setTimeout(() => {
        setSelectedFile(null);
        setProcessingState({
          isProcessing: false,
          progress: 0,
          message: '',
          type: 'idle'
        });
      }, 3000);

    } catch (error) {
      setProcessingState({
        isProcessing: false,
        progress: 0,
        message: error instanceof Error ? error.message : 'Error durante la encriptación',
        type: 'error'
      });
    }
  };

  const handleDecrypt = async () => {
    if (!selectedFile || !userKey) {
      setProcessingState({
        isProcessing: false,
        progress: 0,
        message: 'Selecciona un archivo encriptado e ingresa la clave',
        type: 'error'
      });
      return;
    }

    setProcessingState({
      isProcessing: true,
      progress: 10,
      message: 'Iniciando desencriptación...',
      type: 'decrypting'
    });

    try {
      setProcessingState(prev => ({ ...prev, progress: 30, message: 'Verificando archivo...' }));
      
      const result = await decryptFile(selectedFile, userKey);
      
      setProcessingState(prev => ({ ...prev, progress: 80, message: 'Restaurando archivo original...' }));
      
      // Descargar el archivo desencriptado
      downloadFile(result.decryptedData, result.originalName);
      
      setProcessingState({
        isProcessing: false,
        progress: 100,
        message: '¡Archivo desencriptado exitosamente!',
        type: 'success'
      });

      // Limpiar después de 3 segundos
      setTimeout(() => {
        setSelectedFile(null);
        setProcessingState({
          isProcessing: false,
          progress: 0,
          message: '',
          type: 'idle'
        });
      }, 3000);

    } catch (error) {
      setProcessingState({
        isProcessing: false,
        progress: 0,
        message: error instanceof Error ? error.message : 'Error durante la desencriptación',
        type: 'error'
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <Shield className="w-10 h-10 text-white" />
              <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">SecureFile</h1>
              <p className="text-white/70 text-sm">by Allpasoft</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 text-white/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>por Allpasoft</span>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-morphism p-8 shadow-2xl"
          >
            {/* Title and Description */}
            <div className="text-center mb-8">
              <motion.h2 
                className="text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Encriptación Segura de Archivos
              </motion.h2>
              <motion.p 
                className="text-white/80 text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Protege tus archivos con encriptación de nivel militar. 
                Tecnología avanzada para mantener tu información segura.
              </motion.p>
            </div>

            {/* Mode Selector */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => setMode('encrypt')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                      mode === 'encrypt'
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                    Encriptar
                  </button>
                  <button
                    onClick={() => setMode('decrypt')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                      mode === 'decrypt'
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Unlock className="w-5 h-5" />
                    Desencriptar
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* File Upload Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {mode === 'encrypt' ? 'Seleccionar archivo a encriptar' : 'Seleccionar archivo encriptado'}
                  </h3>
                  <FileDropZone
                    onFileSelect={handleFileSelect}
                    accept={mode === 'encrypt' ? '*/*' : '.encrypted'}
                    maxSize={mode === 'encrypt' ? 100 : 200}
                  />
                </div>

                {/* Selected File Info */}
                <AnimatePresence>
                  {selectedFile && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                    >
                      <div className="flex items-center gap-3">
                        <FileCheck className="w-8 h-8 text-green-400" />
                        <div>
                          <p className="text-white font-medium">{selectedFile.name}</p>
                          <p className="text-white/60 text-sm">
                            {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Archivo desconocido'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Processing Status */}
                <ProcessingStatus state={processingState} />
              </motion.div>

              {/* Key Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {mode === 'encrypt' ? 'Crear clave de encriptación' : 'Ingresar clave de desencriptación'}
                  </h3>
                  <KeyGenerator
                    value={userKey}
                    onChange={setUserKey}
                    placeholder={mode === 'encrypt' ? "Ingresa tu clave secreta" : "Ingresa la clave para desencriptar"}
                  />
                </div>

                {/* Action Button */}
                <motion.button
                  onClick={mode === 'encrypt' ? handleEncrypt : handleDecrypt}
                  disabled={!selectedFile || !userKey || processingState.isProcessing}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg ${
                    mode === 'encrypt'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
                      : 'bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    {mode === 'encrypt' ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                    {processingState.isProcessing ? (
                      'Procesando...'
                    ) : (
                      mode === 'encrypt' ? 'Encriptar y Descargar' : 'Desencriptar y Descargar'
                    )}
                    <Download className="w-5 h-5" />
                  </div>
                </motion.button>
              </motion.div>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Seguridad Militar",
                  description: "Encriptación AES-256 con salt y PBKDF2"
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Fácil de Usar",
                  description: "Interfaz intuitiva y proceso simplificado"
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Made by Allpasoft",
                  description: "Desarrollado con amor y tecnología avanzada"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-white mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="p-6 text-center text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-sm">
            © 2024 Allpasoft. Todos los derechos reservados. 
            <span className="mx-2">•</span>
            SecureFile v1.0.0
            <span className="mx-2">•</span>
            Encriptación segura para todos
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
