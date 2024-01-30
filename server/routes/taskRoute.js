import { Router } from "express";
import { taskController } from "../controllers/taskController";
import auth from "../middleware/auth";

const router = Router();

router.post("/collection/:collectionId/task", auth, taskController.createTask);
router.get(
  "/collection/:collectionId/task/:taskId",
  auth,
  taskController.getTask
);
router.delete(
  "/collection/:collectionId/task/:taskId",
  auth,
  taskController.deleteTask
);
router.put(
  "/collection/:collectionId/task/:taskId",
  auth,
  taskController.updateTask
);
router.get("/collection/:collectionId/tasks", auth, taskController.getTasks);

export { router as taskRoute };
