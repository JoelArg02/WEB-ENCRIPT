export interface EncryptionResult {
  encryptedData: string;
  filename: string;
  originalName: string;
  timestamp: number;
  fileSize: number;
}

export interface DecryptionResult {
  decryptedData: ArrayBuffer;
  originalName: string;
  timestamp: number;
  fileSize: number;
}

export interface FileProcessingState {
  isProcessing: boolean;
  progress: number;
  message: string;
  type: 'idle' | 'encrypting' | 'decrypting' | 'success' | 'error';
}

export interface AllpasoftSignature {
  company: string;
  version: string;
  timestamp: number;
  signature: string;
}
