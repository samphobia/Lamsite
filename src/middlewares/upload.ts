// middleware/upload.ts
import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

export default upload;
