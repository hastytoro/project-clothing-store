import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
  // console.log("reading categories reducer state.");
  return state.categories;
};

const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    // console.log("categories selector 1 fired.");
    return categoriesSlice.categories;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    // console.log("categories selector 2 fired.");
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
