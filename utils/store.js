import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

let initialSate = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    cartItems: [],
    shippingAddress: Cookies.get('fullName')
      ? {
          fullName: Cookies.get('fullName'),
          address: Cookies.get('address'),
          city: Cookies.get('city'),
          postalCode: Cookies.get('postalCode'),
          country: Cookies.get('country'),
        }
      : {},
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
  },
  userInfo: Cookies.get('userName')
    ? {
        name: Cookies.get('userName'),
        email: Cookies.get('userEmail'),
        isAdmin: Cookies.get('userIsAdmin'),
        token: Cookies.get('token'),
        _id: Cookies.get('_id'),
      }
    : null,
};

function reducer(state = initialSate, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };

    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };

    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      if (existItem) {
        const index = state.cart.cartItems.indexOf(existItem);
        existItem.quantity = newItem.quantity;
        state.cart.cartItems[index] = existItem;
      } else {
        state.cart.cartItems.push(newItem);
      }

      return state;
    }

    case 'CART_REMOVE_ITEM':
      const newItem = action.payload;
      const index = state.cart.cartItems.indexOf(newItem);
      state.cart.cartItems.splice(index, 1);

    case 'SAVE_SHIPPING':
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case 'SAVE_PAYMENT_METHODE':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialSate);
  const value = { state, dispatch };
  return <Store.Provider value={value}> {props.children}</Store.Provider>;
}
