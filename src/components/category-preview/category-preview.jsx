import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card";

import styled from "styled-components";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <PreviewContainer>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </PreviewContainer>
    </CategoryPreviewContainer>
  );
};

const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  .title {
    display: block;
    font-size: 28px;
    font-weight: normal;
    margin-bottom: 25px;
    cursor: pointer;
  }
`;

const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  /* margin-bottom: 30px; */
`;

export default CategoryPreview;
