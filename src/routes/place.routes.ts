import express from "express";
import athenticate from "../middlewares/authMiddleware";
import productController from "../controllers/placeController";
import fileUpload from "../middlewares/multers";

const router = express.Router();

router.post(
  "",
  athenticate.authenticateUser,
  athenticate.isProducer,
  fileUpload.array("images"),
  productController.createPlace
);

router.get(
  "/",
  // athenticate.authenticateUser,
  // athenticate.isAdmin,
  productController.getAllPlaces
);

router.get(
  "/:id",
  // athenticate.authenticateUser,
  productController.getPlaceById
);

router.patch(
  "/:id",
  athenticate.authenticateUser,
  athenticate.isProducer,
  fileUpload.array("images", 3),
  productController.updatePlace
);

router.delete(
  "/:id",
  athenticate.authenticateUser,
  athenticate.isProducer,
  productController.deletePlace
);

export default router;
