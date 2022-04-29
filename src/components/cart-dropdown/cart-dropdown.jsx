import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button, {
  BaseButton,
  GoogleButton,
  InvertedButton,
} from "../button/button";

import CartItem from "../cart-item/cart-item";

import { selectCartItems } from "../../store/cart/cart.selector.js";

import styled from "styled-components";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/checkout");

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={handleNavigate}>GO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

const CartDropdownContainer = styled.div`
  position: absolute;
  width: 340px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BaseButton}, ${GoogleButton}, ${InvertedButton} {
    margin-top: auto;
  }
`;

const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export default CartDropdown;
