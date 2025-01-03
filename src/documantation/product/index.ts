import { responses } from "../responses";

const createProduct = {
	tags: ["Products"],
	security: [
		{
			bearerAuth: [],
		},
	],
	summary: "Creating product",
	requestBody: {
		required: true,
		content: {
			"multipart/form-data": {
				schema: {
					type: "object",
					properties: {
						name: {
							type: "string",
							description: "Product name",
							required: true,
							example: "Paint",
						},
						title: {
							type: "string",
							description: "Title product name",
							required: true,
							example: "Paint",
						},
						description: {
							type: "string",
							description: "Description of the project",
							required: true,
							example: "Paint",
						},
						images: {
							type: "array",
							items: {
								minItems: 4,
								type: "file",
							},
						},
						categoryId: {
							type: "string",
							description: "Product category",
							required: true,
							format: "uuid",
						},
					},
				},
			},
		},
	},
	consumes: ["application/json"],
	responses,
};

const read_products = {
	all: {
		tags: ["Products"],
		security: [
			{
				bearerAuth: [],
			},
		],
		summary: "List of all the products",
		description: "Get all of the products",
		responses,
	},
	single: {
		tags: ["Products"],
		security: [
			{
				bearerAuth: [],
			},
		],
		summary: "Get a single product",
		description: "Get a single product",
		parameters: [
			{
				in: "path",
				name: "id",
				required: true,
				schema: {
					type: "string",
					format: "uuid",
				},
			},
		],
		responses,
	},
};

const update_product = {
	tags: ["Products"],
	security: [
		{
			bearerAuth: [],
		},
	],
	summary: "Updating a product",
	parameters: [
		{
			in: "path",
			name: "id",
			required: true,
			schema: {
				type: "string",
				format: "uuid",
			},
		},
	],
	requestBody: {
		required: true,
		content: {
			"multipart/form-data": {
				schema: {
					type: "object",
					properties: {
						name: {
							type: "string",
							description: "Product name",
							required: true,
							example: "Paint",
						},
						title: {
							type: "string",
							description: "Title product name",
							required: true,
							example: "Paint",
						},
						description: {
							type: "string",
							description: "Description of the project",
							required: true,
							example: "Paint",
						},
						images: {
							type: "array",
							items: {
								minItems: 4,
								type: "file",
							},
						},
						categoryId: {
							type: "string",
							description: "Product category",
							required: true,
							format: "uuid",
						},
					},
				},
			},
		},
	},
	responses,
};

const delete_product = {
	tags: ["Products"],
	security: [
		{
			bearerAuth: [],
		},
	],
	summary: "Deleting a product",
	parameters: [
		{
			in: "path",
			name: "ID",
			required: true,
			schema: {
				type: "string",
				format: "uuid",
			},
		},
	],
	responses,
};

export const products = {
	"/api/v1/products": {
		post: createProduct,
	},
	"/api/v1/products/": {
		get: read_products["all"],
	},
	"/api/v1/products/{id}": {
		get: read_products["single"],
	},
	"/api/v1/products/{id}/": {
		patch: update_product,
	},
	"/api/v1/products/{ID}": {
		delete: delete_product,
	},
};
