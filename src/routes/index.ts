import express from "express";
import authRoutes from "./auth.routes";
import roleRoute from "./role.routes";
import categoryRoute from "./category.routes";
import productRoutes from "./place.routes";

const router = express.Router();

router.use("/", roleRoute);
router.use("/users", authRoutes);
router.use("/categories", categoryRoute);
router.use("/places", productRoutes);

export default router;
