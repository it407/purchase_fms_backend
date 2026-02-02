import express from "express";
import {
  getAllWeighmentVerification,
  updateWeighmentVerification,
} from "./controller.js";

import { uploadIssuePoAttachment } from "../../middleware/upload.js";


const router = express.Router();

router.get("/", getAllWeighmentVerification);
router.put(
  "/",
  uploadIssuePoAttachment.single("attachment"),
  updateWeighmentVerification
);

export default router;
