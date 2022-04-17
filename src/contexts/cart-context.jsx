import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if cart items contains product to add
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found then increase quantity
  if (existingCartItem)
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  // return new array with modified cart items and new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  // find if cart items contains product to add
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  // check if quantity is equal to 1 and if true then remove item from cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
  // return new array with modified cart items and new cart item
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, productsToClear) => {
  // We filter all items not the same that clears the actual item from the cart
  return cartItems.filter((cartItem) => cartItem.id !== productsToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemToCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
    setCartCount(newCartCount);
  }, [cartCount, cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (acc, cur) => acc + cur.quantity * cur.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const removeItemToCart = (productToRemove) =>
    setCartItems(removeCartItem(cartItems, productToRemove));

  const clearItemToCart = (productToClear) =>
    setCartItems(clearCartItem(cartItems, productToClear));

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemToCart,
    cartItems,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
