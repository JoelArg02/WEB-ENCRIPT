'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Eye, EyeOff, Copy, Check, Shield, AlertTriangle, Key } from 'lucide-react';
import { generateSecureKey, validateKeyStrength } from '@/utils/encryption';

interface KeyGeneratorProps {
  value: string;
  onChange: (key: string) => void;
  placeholder?: string;
}

export default function KeyGenerator({ value, onChange, placeholder = "Ingresa tu clave secreta" }: KeyGeneratorProps) {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [keyStrength, setKeyStrength] = useState({ isValid: false, score: 0, feedback: [] as string[] });

  useEffect(() => {
    if (value) {
      setKeyStrength(validateKeyStrength(value));
    } else {
      setKeyStrength({ isValid: false, score: 0, feedback: [] });
    }
  }, [value]);

  const generateKey = () => {
    const newKey = generateSecureKey();
    onChange(newKey);
    // Animación suave al generar
    setShowKey(true);
    setTimeout(() => setShowKey(false), 3000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  const getStrengthColor = () => {
    if (keyStrength.score >= 85) return 'text-green-600';
    if (keyStrength.score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStrengthBgColor = () => {
    if (keyStrength.score >= 85) return 'bg-green-500';
    if (keyStrength.score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStrengthText = () => {
    if (keyStrength.score >= 85) return 'Muy Segura';
    if (keyStrength.score >= 70) return 'Segura';
    if (keyStrength.score >= 50) return 'Media';
    return 'Débil';
  };

  return (
    <div className="space-y-4">
      {/* Input de clave */}
      <div className="relative">
        <div className="flex items-center">
          <Key className="absolute left-3 w-5 h-5 text-gray-400 z-10" />
          <input
            type={showKey ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 text-black pr-24 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <motion.button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </motion.button>
            {value && (
              <motion.button
                type="button"
                onClick={copyToClipboard}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </motion.button>
            )}
          </div>
        </div>

        {/* Indicador de fortaleza */}
        <AnimatePresence>
          {value && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {keyStrength.isValid ? (
                    <Shield className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${getStrengthColor()}`}>
                    {getStrengthText()}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{keyStrength.score}/100</span>
              </div>
              
              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${getStrengthBgColor()}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${keyStrength.score}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Feedback */}
              {keyStrength.feedback.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 p-3 bg-gray-50 rounded-lg"
                >
                  <ul className="text-xs space-y-1">
                    {keyStrength.feedback.map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={keyStrength.isValid ? 'text-green-600' : 'text-gray-600'}
                      >
                        • {tip}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Botón para generar clave */}
      <motion.button
        type="button"
        onClick={generateKey}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <RefreshCw className="w-5 h-5" />
        <span>Generar clave segura</span>
      </motion.button>

      {/* Información adicional */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4 bg-blue-50 rounded-lg border border-blue-200"
      >
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              Consejos de seguridad
            </h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Usa al menos 12 caracteres</li>
              <li>• Combina mayúsculas, minúsculas, números y símbolos</li>
              <li>• No uses información personal</li>
              <li>• Guarda tu clave en un lugar seguro</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Notificación de copiado */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            ¡Clave copiada al portapapeles!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
