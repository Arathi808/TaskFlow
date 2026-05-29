const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");

// CRUD
router.post("/", protect, taskController.createTask);
router.get("/", protect, taskController.getTasks);
router.put("/:id", protect, taskController.updateTask);
router.delete("/:id", protect, taskController.deleteTask);

// STATUS UPDATE (NEW PROFESSIONAL FEATURE)
router.patch("/:id/status", protect, taskController.updateStatus);

module.exports = router;