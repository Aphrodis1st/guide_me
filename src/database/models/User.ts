// User model
import { Model, DataTypes, Sequelize, UUIDV4 } from "sequelize";
import database_models from "../config/db.config";
import {
	UserCreationAttributes,
	UserModelAttributes,
} from "../../types/models";

interface UserAttributes {
	id?: string;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	role?: string;
	password: string;
	confirmPassword: string;
}

export class User extends Model<UserModelAttributes, UserCreationAttributes> {
	public id!: string;
	public firstName!: string;
	public lastName!: string;
	public userName!: string;
	public email!: string;
	public role!: string;
	public password!: string;
	public confirmPassword!: string;

	public static associate(models: {
		Product: typeof database_models.Product;
		Role: typeof database_models.Role;
	}) {
		this.hasOne(models.Product, {
			foreignKey: "artistId",
			as: "products",
		});
		this.belongsTo(models.Role, { as: "Role", foreignKey: "role" });
	}
}

const user_model = (sequelize: Sequelize) => {
	User.init(
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
			},
			firstName: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			lastName: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			userName: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			email: {
				allowNull: false,
				unique: true,
				type: DataTypes.STRING,
			},
			role: {
				allowNull: false,
				type: DataTypes.UUID,
				references: {
					model: "Roles",
					key: "id",
				},
			},
			password: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			confirmPassword: {
				allowNull: false,
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};

export default user_model;
