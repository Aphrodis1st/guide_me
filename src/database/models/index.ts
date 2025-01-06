import { Sequelize } from "sequelize";
import user_model from "./User";
import Role_model from "./Role";
import place_model from "./Place";
import category_model from "./Category";

const Models = (sequelize: Sequelize) => {
  const User = user_model(sequelize);
  const Role = Role_model(sequelize);
  const Place = place_model(sequelize);
  const Category = category_model(sequelize);
  return { User, Role, Category, Place };
};

export default Models;
