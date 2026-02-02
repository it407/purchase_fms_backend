import express from "express";
import {
  getAllGateEntry,
  updateGateEntry,
} from "./controller.js";

import { uploadIssuePoAttachment } from "../../middleware/upload.js";

const router = express.Router();

router.get("/", getAllGateEntry);
router.put(
  "/",
  uploadIssuePoAttachment.single("attachment"),
  updateGateEntry
);


export default router;
