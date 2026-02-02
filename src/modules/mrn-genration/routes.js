import express from "express";
import {
  getAllMRN,
  updateMRN,
} from "./controller.js";

const router = express.Router();

router.get("/", getAllMRN);
router.put("/", updateMRN);

export default router;
