// /src/Context/Cart/CartReducer.jsx

//Import the Action types
import {
    REMOVE_ITEM,
    ADD_TO_CART,
    CHANGE_QUANTITY,
    CHECKOUT,
    CLEAR,
  } from "./CartTypes.js";
  
  const Storage = (cartItems) => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.length > 0 ? cartItems : [])
    );
  };
  // Export function to calculate the total price of the cart and the total quantity of the cart
  export const sumItems = (cartItems) => {
    Storage(cartItems);
    const itemCount = cartItems.reduce(
      (total, product) => total + product.quantity,
      0
    );
    let total = cartItems
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
    return { itemCount, total };
  };
  
  // The reducer is listening for an action, which is the type that we defined in the CartTypes.js file
  const CartReducer = (state, action) => {
    // The switch statement is checking the type of action that is being passed in
    switch (action.type) {
      // If the action type is ADD_TO_CART, we want to add the item to the cartItems array

      case ADD_TO_CART:
        const [product, quantity] = action.payload;
        console.log(product);
        if (!state.cartItems.find((item) => item._id === product._id)) {
          state.cartItems.push({
            ...product,
            quantity: quantity,
          });
        }

        return {
          ...state,
          ...sumItems(state.cartItems),
          cartItems: [...state.cartItems],
        };
  
      // If the action type is REMOVE_ITEM, we want to remove the item from the cartItems array
      case REMOVE_ITEM:
        console.log(action.payload);
        return {
          ...state,
          ...sumItems(
            state.cartItems.filter((item) => item._id !== action.payload._id)
          ),
          cartItems: [
            ...state.cartItems.filter((item) => item._id !== action.payload._id),
          ],
        };
  
      // If the action type is INCREASE, we want to increase the quantity of the particular item in the cartItems array
      case CHANGE_QUANTITY:
        
        state.cartItems[
          state.cartItems.findIndex((item) => item.id === action.payload[0].id)
        ].quantity = action.payload[1];
        return {
          ...state,
          ...sumItems(state.cartItems),
          cartItems: [...state.cartItems],
        };
  
      // If the action type is CHECKOUT, we want to clear the cartItems array and set the checkout to true
      case CHECKOUT:
        return {
          cartItems: [],
          checkout: true,
          ...sumItems([]),
        };
  
      //If the action type is CLEAR, we want to clear the cartItems array
      case CLEAR:
        return {
          cartItems: [],
          ...sumItems([]),
        };
  
      //Return the state if the action type is not found
      default:
        return state;
    }
  };
  
  export default CartReducer;
  