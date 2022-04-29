import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CATEGORIES_ACTION_TYPES from "../../store/categories/categories.types";
import { getCollectionAndDocuments } from "../../utils/firebase";

import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCollectionAndDocuments("categories");
      dispatch({
        type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
        payload: categoriesArray,
      });
    };
    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
