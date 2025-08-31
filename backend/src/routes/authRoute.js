import express from "express";
import { login, logout, signup, checkAuth, loginWithGoogle} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/google", loginWithGoogle);

router.get("/check",protectRoute,checkAuth)

export default router;
