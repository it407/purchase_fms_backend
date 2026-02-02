import express from "express";
import {
  getAllSubmitBill,
  updateSubmitBill,
} from "./controller.js";

const router = express.Router();

router.get("/", getAllSubmitBill);
router.put("/", updateSubmitBill);

export default router;
