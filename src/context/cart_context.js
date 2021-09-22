import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getCartItems = ()=>{
  let cart = localStorage.getItem('cart');

  if(cart){
    return JSON.parse(localStorage.getItem("cart"));
  }
  return [];
}

const initialState = {
  cart: getCartItems(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 543,
  addToCart:()=>{},
  removeItem:()=>{},
  toggleAmount:()=>{},
  clearCart:()=>{},
};

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add item to cart
  const addToCart = (id, color, amount, product)=>{
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  }
  
  // remove item from cart
  const removeItem =(id)=>{
    dispatch({type: REMOVE_CART_ITEM, payload:id})
  }

  // toggle cart
  const toggleAmount = (id, value) => {
    dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload:{id, value}});
  }

  // clear cart
  const clearCart = () => {
    dispatch({type: CLEAR_CART})
  }
  
  // save cart state in localstorage
  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(state.cart));
    dispatch({type:COUNT_CART_TOTALS});
  }, [state.cart])

  return (
    <CartContext.Provider value={{...state, addToCart, removeItem, toggleAmount, clearCart}}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
