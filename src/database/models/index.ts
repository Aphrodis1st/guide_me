import { Sequelize } from "sequelize";
import user_model from "./User";
import Role_model from "./Role";
import product_model from "./Product";
import category_model from "./Category";

const Models = (sequelize: Sequelize) => {
	const User = user_model(sequelize);
	const Role = Role_model(sequelize);
	const Product = product_model(sequelize);
	const Category = category_model(sequelize);
	return { User, Role, Category, Product };
};

export default Models;
