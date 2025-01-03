import express from "express";
import athenticate from "../middlewares/authMiddleware";
import productController from "../controllers/productController";
import fileUpload from "../middlewares/multers";

const router = express.Router();

router.post(
	"",
	athenticate.authenticateUser,
	// athenticate.isAdmin,
	fileUpload.array("images"),
	productController.createProduct
);

router.get(
	"/",
	// athenticate.authenticateUser,
	// athenticate.isAdmin,
	productController.getAllProducts
);

router.get(
	"/:id",
	// athenticate.authenticateUser,
	productController.getProductById
);

router.patch(
	"/:id",
	athenticate.authenticateUser,
	fileUpload.array("images", 3),
	productController.updateProduct
);

router.delete(
	"/:id",
	athenticate.authenticateUser,
	// athenticate.isAdmin,
	productController.deleteProduct
);

export default router;
