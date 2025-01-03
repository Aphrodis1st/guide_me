import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error, value } = schema.validate(req.body, { abortEarly: false });

		if (error) {
			const errorMessages = error.details.map((detail) => detail.message);
			return res.status(400).json({ errors: errorMessages });
		}

		req.body = value;
		next();
	};
};