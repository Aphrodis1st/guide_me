import { Request, Response } from "express";
import { sequelizeConnection } from "../database/config/db.config";
import Place_model from "../database/models/Place";

const Place = Place_model(sequelizeConnection);
import { deleteCloudinaryFile, uploadMultiple } from "../helpers/upload";
import { Info } from "../types/upload";
import { JwtPayload } from "jsonwebtoken";

export interface ExpandedRequest extends Request {
  user?: JwtPayload;
}

const createPlace = async (req: Request, res: Response) => {
  const user = (req as ExpandedRequest).user;
  const providerId = user?.userId;

  const { name, title, description, categoryId } = req.body;
  const files = req.files as Express.Multer.File[];

  if (!name || !title || !description) {
    return res.status(400).json({ message: "Required fields are missing!" });
  }

  const uploadedImages = await uploadMultiple(files, req);

  if ((req as Info<any>).info?.message) {
    return res.status(400).json({ message: (req as Info<any>).info.message });
  }

  try {
    const place = await Place.create({
      name,
      title,
      description,
      images: uploadedImages.images,
      providerId,
      categoryId,
    });

    return res.status(201).json(place);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePlace = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const place = await Place.findByPk(id);
    if (!place) {
      return res.status(404).json({ message: "Place not found!" });
    }

    for (const imageUrl of place.images) {
      await deleteCloudinaryFile(imageUrl);
    }

    await place.destroy();
    return res.status(200).json({ message: "Place deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePlace = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, title, description, providerId, categoryId } = req.body;

  try {
    const place = await Place.findByPk(id);
    if (!place) {
      return res.status(404).json({ message: "Place not found!" });
    }

    let updatedImages = place.images;
    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      const uploadedImages = await uploadMultiple(
        req.files as Express.Multer.File[],
        req
      );
      if (uploadedImages.message) {
        return res.status(400).json({ message: uploadedImages.message });
      }
      updatedImages = [...updatedImages, ...uploadedImages.images];
    }

    await place.update({
      name: name ?? place.name,
      title: title ?? place.title,
      description: description ?? place.description,
      images: updatedImages,
      providerId: providerId ?? place.providerId,
      categoryId: categoryId ?? place.categoryId,
    });

    return res.status(200).json(place);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const getPlaceById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const place = await Place.findByPk(id);
    if (!place) {
      return res.status(404).json({ message: "Place not found!" });
    }
    return res.status(200).json(place);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllPlaces = async (req: Request, res: Response) => {
  try {
    const products = await Place.findAll();
    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
};
