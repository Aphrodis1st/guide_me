import basicInfo from "./basicInfo";
import { categories } from "./category";
import { products } from "./product";
import { roles } from "./role";
import { users } from "./user";

export default {
	...basicInfo,
	paths: {
		...users,
		...roles,
		...categories,
		...products,
	},
};
