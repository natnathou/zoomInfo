import multer from 'multer';
import { Request } from 'express';
import path from 'path';

let storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, path.join(__dirname, '..', '/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
});

export default upload;
