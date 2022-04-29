import { useDispatch, useSelector } from "react-redux";

import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";

import styled from "styled-components";

const CartIcon = () => {
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const handleToggle = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={handleToggle}>
      <ShoppingIcon />
      <span className="item-count">{cartCount}</span>
    </CartIconContainer>
  );
};

const CartIconContainer = styled.div`
  margin-top: -6px;
  position: relative;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .item-count {
    position: absolute;
    font-size: 10px;
    font-weight: bold;
    bottom: 12px;
  }
`;

const ShoppingIcon = styled(ShoppingSvg)`
  width: 24px;
  height: 24px;
`;

export default CartIcon;
