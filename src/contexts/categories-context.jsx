import { createContext, useState, useEffect } from "react";

import {
  // addCollectionAndDocuments,
  getCollectionAndDocuments,
} from "../utils/firebase";

// import productData from "../data/shop-data.json";
// import SHOP_DATA from "../data/shop-data";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  /* useEffect(() => {
    addCollectionAndDocuments("categories", SHOP_DATA);
   }, []); */
  useEffect(() => {
    const getCollectionMapping = async () => {
      const categoryMap = await getCollectionAndDocuments("categories");
      setCategoriesMap(categoryMap);
    };
    getCollectionMapping();
  }, []);
  const value = { categoriesMap };
  return (
    <>
      <CategoriesContext.Provider value={value}>
        {children}
      </CategoriesContext.Provider>
    </>
  );
};
