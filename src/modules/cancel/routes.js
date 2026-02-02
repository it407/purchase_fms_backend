import express from "express";
import { createCancel, getAllCancels } from "./controller.js";

const router = express.Router();

router.post("/:indentId", createCancel);
router.get("/", getAllCancels);

export default router;
