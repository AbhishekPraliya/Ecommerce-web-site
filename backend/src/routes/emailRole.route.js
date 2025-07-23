import express from "express";
import {
  getEmailRoles,
  insertEmailRole,
  deleteEmailRole
} from "../controllers/EmailRole.controller.js";

const router = express.Router();

router.get("/get", getEmailRoles);
router.post("/insert", insertEmailRole);
router.delete("/:email", deleteEmailRole);

export default router;
