
import express from "express";
import {
  createIndent,
  getAllIndents,
  updateIndentItem,
} from "./indent.controller.js";

const router = express.Router();

router.post("/", createIndent);
router.get("/", getAllIndents);
router.put("/:id", updateIndentItem);

export default router;
