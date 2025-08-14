import CryptoJS from 'crypto-js';
import { EncryptionResult, DecryptionResult, AllpasoftSignature } from '@/types/encryption';

const ALLPASOFT_SIGNATURE: AllpasoftSignature = {
  company: 'Allpasoft',
  version: '1.0.0',
  timestamp: Date.now(),
  signature: 'Made with 💚 by Allpasoft - Secure File Encryption'
};

export const generateSecureKey = (): string => {
  console.log('[Key] Generando clave segura');
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let result = '';
  const length = 24;
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  console.log('[Key] Clave generada de longitud', result.length);
  return result;
};

// Validar fortaleza de la clave
export const validateKeyStrength = (key: string): { 
  isValid: boolean; 
  score: number; 
  feedback: string[] 
} => {
  const feedback: string[] = [];
  let score = 0;
  
  if (key.length >= 12) score += 25;
  else feedback.push('La clave debe tener al menos 12 caracteres');
  
  if (/[a-z]/.test(key)) score += 15;
  else feedback.push('Incluye letras minúsculas');
  
  if (/[A-Z]/.test(key)) score += 15;
  else feedback.push('Incluye letras mayúsculas');
  
  if (/[0-9]/.test(key)) score += 15;
  else feedback.push('Incluye números');
  
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(key)) score += 30;
  else feedback.push('Incluye caracteres especiales');
  
  return {
    isValid: score >= 70,
    score,
    feedback: feedback.length === 0 ? ['¡Clave muy segura!'] : feedback
  };
};

// Encriptar archivo
export const encryptFile = async (
  file: File, 
  userKey: string
): Promise<EncryptionResult> => {
  console.log('[Encrypt] Inicio de proceso de encriptación', {
    file: { name: file.name, size: file.size, type: file.type },
    userKeyLength: userKey?.length
  });
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const fileData = event.target?.result as ArrayBuffer;
        console.log('[Encrypt] Archivo leído como ArrayBuffer', { byteLength: (fileData as ArrayBuffer).byteLength });
        const wordArray = CryptoJS.lib.WordArray.create(fileData);
        console.log('[Encrypt] Convertido a WordArray');
        
        // Crear el salt usando la clave del entorno y datos del archivo
        const saltSource = (process.env.NEXT_PUBLIC_ENCRYPTION_SALT || 'NO_SALT_DEFINED') + 
          file.name + 
          file.size + 
          Date.now();
        const salt = CryptoJS.SHA256(
          saltSource
        ).toString();
        console.log('[Encrypt] Salt generado (SHA256 hex length):', salt.length);
        
        // Crear la clave derivada
        const key = CryptoJS.PBKDF2(userKey, salt, {
          keySize: 256/32,
          iterations: 10000
        });
        console.log('[Encrypt] Clave derivada (PBKDF2) creada');
        
        // Generar IV aleatorio
        const iv = CryptoJS.lib.WordArray.random(128/8);
        console.log('[Encrypt] IV generado');
        
        // Encriptar los datos
        const encrypted = CryptoJS.AES.encrypt(wordArray, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        console.log('[Encrypt] Datos encriptados (ciphertext length):', encrypted.ciphertext.sigBytes);
        
        // Crear el paquete final con metadatos y firma de Allpasoft
        const encryptedPackage = {
          data: encrypted.toString(),
          salt: salt,
          iv: iv.toString(),
          originalName: file.name,
          originalSize: file.size,
          timestamp: Date.now(),
          mimeType: file.type,
          signature: ALLPASOFT_SIGNATURE
        };
        console.log('[Encrypt] Paquete encriptado preparado con metadatos', {
          originalName: encryptedPackage.originalName,
          originalSize: encryptedPackage.originalSize,
          mimeType: encryptedPackage.mimeType,
          timestamp: encryptedPackage.timestamp,
          signature: encryptedPackage.signature
        });
        
        const encryptedString = CryptoJS.enc.Base64.stringify(
          CryptoJS.enc.Utf8.parse(JSON.stringify(encryptedPackage))
        );
        console.log('[Encrypt] Paquete serializado a Base64 (length):', encryptedString.length);
        
        resolve({
          encryptedData: encryptedString,
          filename: `${file.name}.encrypted`,
          originalName: file.name,
          timestamp: Date.now(),
          fileSize: encryptedString.length
        });
        console.log('[Encrypt] Proceso completado y resultado resuelto');
        
      } catch (error) {
        console.error('[Encrypt] Error durante la encriptación', error);
        reject(new Error(`Error al encriptar: ${error instanceof Error ? error.message : 'Error desconocido'}`));
      }
    };
    
    reader.onerror = () => {
      console.error('[Encrypt] Error al leer el archivo');
      reject(new Error('Error al leer el archivo'));
    };
    reader.readAsArrayBuffer(file);
  });
};

// Desencriptar archivo
export const decryptFile = async (
  file: File, 
  userKey: string
): Promise<DecryptionResult> => {
  console.log('[Decrypt] Inicio de proceso de desencriptación', {
    file: { name: file.name, size: file.size, type: file.type },
    userKeyLength: userKey?.length
  });
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const encryptedData = event.target?.result as string;
        console.log('[Decrypt] Archivo leído como texto (length):', encryptedData?.length);
        
        // Decodificar el paquete encriptado
        const packageData = JSON.parse(
          CryptoJS.enc.Utf8.stringify(
            CryptoJS.enc.Base64.parse(encryptedData)
          )
        );
        console.log('[Decrypt] Paquete decodificado desde Base64 con metadatos', {
          originalName: packageData?.originalName,
          originalSize: packageData?.originalSize,
          mimeType: packageData?.mimeType,
          timestamp: packageData?.timestamp
        });
        
        // Verificar la firma de Allpasoft
        if (!packageData.signature || packageData.signature.company !== 'Allpasoft') {
          console.warn('[Decrypt] Firma inválida o ausente en el paquete');
          throw new Error('Archivo no válido o no creado por Allpasoft');
        }
        console.log('[Decrypt] Firma válida de Allpasoft verificada');
        
        // Recrear la clave derivada
        const key = CryptoJS.PBKDF2(userKey, packageData.salt, {
          keySize: 256/32,
          iterations: 10000
        });
        console.log('[Decrypt] Clave derivada (PBKDF2) recreada');
        
        // Desencriptar
        const decrypted = CryptoJS.AES.decrypt(packageData.data, key, {
          iv: CryptoJS.enc.Hex.parse(packageData.iv),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        console.log('[Decrypt] Datos desencriptados (sigBytes):', decrypted.sigBytes);
        
        // Convertir a ArrayBuffer
        const decryptedBytes = new Uint8Array(decrypted.sigBytes);
        for (let i = 0; i < decrypted.sigBytes; i++) {
          decryptedBytes[i] = (decrypted.words[Math.floor(i / 4)] >>> (24 - (i % 4) * 8)) & 0xff;
        }
        console.log('[Decrypt] Bytes restaurados, longitud:', decryptedBytes.byteLength);
        
        resolve({
          decryptedData: decryptedBytes.buffer,
          originalName: packageData.originalName,
          timestamp: packageData.timestamp,
          fileSize: packageData.originalSize
        });
        console.log('[Decrypt] Proceso completado y resultado resuelto');
        
      } catch (error) {
        console.error('[Decrypt] Error durante la desencriptación', error);
        reject(new Error(`Error al desencriptar: ${error instanceof Error ? error.message : 'Clave incorrecta o archivo dañado'}`));
      }
    };
    
    reader.onerror = () => {
      console.error('[Decrypt] Error al leer el archivo');
      reject(new Error('Error al leer el archivo'));
    };
    reader.readAsText(file);
  });
};

// Descargar archivo
export const downloadFile = (data: ArrayBuffer | string, filename: string, mimeType: string = 'application/octet-stream') => {
  console.log('[Download] Preparando descarga', {
    filename,
    mimeType,
    dataType: data instanceof ArrayBuffer ? 'ArrayBuffer' : 'string'
  });
  let blob: Blob;
  
  if (data instanceof ArrayBuffer) {
    blob = new Blob([data], { type: mimeType });
  } else {
    blob = new Blob([data], { type: 'text/plain' });
  }
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  console.log('[Download] Descarga disparada y URL revocada');
};
