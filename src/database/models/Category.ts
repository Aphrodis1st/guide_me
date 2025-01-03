import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import database_models from "../config/db.config";
import { Product } from "./Product";

interface CategoryAttributes {
	id?: string;
	categoryName: string;
}

export class Category
	extends Model<CategoryAttributes>
	implements CategoryAttributes
{
	public id!: string;
	public categoryName!: string;

	public static associate(models: { Product: typeof Product }) {
		this.hasMany(models.Product, {
			foreignKey: "categoryId",
			as: "products",
		});
	}
}

const category_model = (sequelize: Sequelize) => {
	Category.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			categoryName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "Categories",
			modelName: "Category",
		}
	);
	return Category;
};

export default category_model;
