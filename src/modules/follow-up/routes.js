import express from "express";
import {
  getAllFollowUp,
  updateFollowUp,
} from "./controller.js";

const router = express.Router();

router.get("/", getAllFollowUp);
router.put("/", updateFollowUp);

export default router;
