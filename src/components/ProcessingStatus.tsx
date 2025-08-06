'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2, Shield } from 'lucide-react';
import { FileProcessingState } from '@/types/encryption';

interface ProcessingStatusProps {
  state: FileProcessingState;
}

export default function ProcessingStatus({ state }: ProcessingStatusProps) {
  if (state.type === 'idle') return null;

  const getIcon = () => {
    switch (state.type) {
      case 'encrypting':
      case 'decrypting':
        return <Loader2 className="w-6 h-6 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Shield className="w-6 h-6 text-blue-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (state.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-lg border ${getBackgroundColor()} backdrop-blur-sm`}
    >
      <div className="flex items-center gap-3">
        {getIcon()}
        <div className="flex-1">
          <p className="font-medium text-gray-900">{state.message}</p>
          {state.isProcessing && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${state.progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{state.progress}% completado</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
