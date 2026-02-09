import path from 'path';

// Projenin çalıştığı ana dizini bulur ve 'temp' klasörünü işaret eder
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
