import { Router } from "express";
import loginController from "../controllers/auth/loginController";
import registerController from "../controllers/auth/registerController";
import refreshController from "../controllers/auth/refreshController";
import userController from "../controllers/userController";
import auth from "../middleware/auth";
const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/user", auth, userController.getUser);
router.post("/refresh", refreshController);

export default router;
