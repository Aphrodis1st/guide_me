import basicInfo from "./basicInfo";
import { categories } from "./category";
import { places } from "./place";
import { roles } from "./role";
import { users } from "./user";

export default {
  ...basicInfo,
  paths: {
    ...users,
    ...roles,
    ...categories,
    ...places,
  },
};
