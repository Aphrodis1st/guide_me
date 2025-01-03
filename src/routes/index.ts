import express from "express";
import authRoutes from "./auth.routes";
import roleRoute from "./role.routes";
import categoryRoute from "./category.routes";
import productRoutes from "./product.routes";

const router = express.Router();

router.use("/", roleRoute);
router.use("/users", authRoutes);
router.use("/categories", categoryRoute);
router.use("/products", productRoutes);

export default router;
