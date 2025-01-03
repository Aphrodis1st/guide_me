import { Model, DataTypes, Sequelize, UUIDV4 } from "sequelize";
import database_models from "../config/db.config";
import { Category } from "./Category";

interface ProductAttributes {
	id?: string;
	name: string;
	title: string;
	description: string;
	images: string[];
	artistId: string;
	categoryId?: string;
}

export class Product
	extends Model<ProductAttributes>
	implements ProductAttributes
{
	public images!: string[];
	public id!: string;
	public categoryId!: string;

	public title!: string;
	public description!: string;
	public artistId!: string;
	public name!: string;

	public static associate(models: {
		User: typeof database_models.User;
		Category: typeof Category;
	}) {
		Product.belongsTo(models.User, { foreignKey: "artistId", as: "artist" });
		Product.belongsTo(models.Category, {
			foreignKey: "categoryId",
			as: "category",
		});
	}
}

const product_model = (sequelize: Sequelize) => {
	Product.init(
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			title: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			description: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			images: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: false,
			},
			artistId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			categoryId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: "Categories",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
		},
		{
			sequelize,
			modelName: "Product",
		}
	);
	return Product;
};

export default product_model;
