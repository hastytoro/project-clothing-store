import { useContext } from "react";
import { CartContext } from "../../contexts/cart-context";

import Button, { BUTTON_TYPES } from "../button/button";

import styled from "styled-components";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => addItemToCart(product);
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </Footer>
      <Button buttonType={BUTTON_TYPES.invert} onClick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

const ProductCardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  align-items: center;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 90%;
    margin-bottom: 5px;
    object-fit: cover;
    border-radius: 2px;
  }

  button {
    position: absolute;
    width: 80%;
    opacity: 0.7;
    top: 60%;
    display: none;
  }

  &:hover {
    img {
      opacity: 0.8;
    }
    button {
      opacity: 0.85;
      display: block;
    }
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;

  .name {
    width: 90%;
    margin-bottom: 15px;
  }
  .price {
    width: 10%;
  }
`;

export default ProductCard;
