import CATEGORIES_ACTION_TYPES from "./categories.type";
import { createAction } from "../../utils/reducer";

export const setCategories = (categoriesArray) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
