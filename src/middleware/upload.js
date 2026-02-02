import multer from "multer";
import path from "path";
import fs from "fs";

import { writeLog } from "../utils/logger.js";

// ensure directory exists
const uploadDir = "uploads/issue_po";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `issue_po_${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF or Image allowed"), false);
  }
};


export const uploadIssuePoAttachment = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});



export const uploadLogger = (req, res, next) => {
  writeLog("file_upload.log", {
    fileReceived: !!req.file,
    file: req.file || null
  });
  next();
};