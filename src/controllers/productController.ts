import { Request, Response } from "express";
import { sequelizeConnection } from "../database/config/db.config";
import Product_model from "../database/models/Product";

const Product = Product_model(sequelizeConnection);
import { deleteCloudinaryFile, uploadMultiple } from "../helpers/upload";
import { Info } from "../types/upload";
import { JwtPayload } from "jsonwebtoken";

export interface ExpandedRequest extends Request {
	user?: JwtPayload;
}

const createProduct = async (req: Request, res: Response) => {
	const user = (req as ExpandedRequest).user;
	const artistId = user?.userId;

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
		const product = await Product.create({
			name,
			title,
			description,
			images: uploadedImages.images,
			artistId,
			categoryId,
		});

		return res.status(201).json(product);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteProduct = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const product = await Product.findByPk(id);
		if (!product) {
			return res.status(404).json({ message: "Product not found!" });
		}

		for (const imageUrl of product.images) {
			await deleteCloudinaryFile(imageUrl);
		}

		await product.destroy();
		return res.status(200).json({ message: "Product deleted successfully!" });
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

const updateProduct = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, title, description, artistId, categoryId } = req.body;

	try {
		const product = await Product.findByPk(id);
		if (!product) {
			return res.status(404).json({ message: "Product not found!" });
		}

		let updatedImages = product.images;
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

		await product.update({
			name: name ?? product.name,
			title: title ?? product.title,
			description: description ?? product.description,
			images: updatedImages,
			artistId: artistId ?? product.artistId,
			categoryId: categoryId ?? product.categoryId,
		});

		return res.status(200).json(product);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

const getProductById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const product = await Product.findByPk(id);
		if (!product) {
			return res.status(404).json({ message: "Product not found!" });
		}
		return res.status(200).json(product);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

const getAllProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.findAll();
		return res.status(200).json(products);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

export default {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
