import express from "express";
import {
  getAllErpEntry,
  updateErpEntry,
} from "./controller.js";

const router = express.Router();

router.get("/", getAllErpEntry);
router.put("/", updateErpEntry);

export default router;
