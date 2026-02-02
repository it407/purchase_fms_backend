
import express from "express";
import { createUser, getUsers, deleteUser } from "./controller.js";

const router = express.Router();

/* MATCH FRONTEND URLs */
router.post("/", createUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);

export default router;
