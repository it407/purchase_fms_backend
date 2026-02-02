import express from "express";
import {
  getAllQC,
  updateQC,
} from "./controller.js";

const router = express.Router();

router.get("/", getAllQC);
router.put("/", updateQC);

export default router;
