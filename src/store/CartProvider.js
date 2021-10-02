import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const cartItemIndex = state.items.findIndex(
      (item) => item.id == action.item.id
    );
    let updatedItems;
    console.log(state.items[cartItemIndex]);
    if (state.items[cartItemIndex]) {
      const updatedItem = {
        ...state.items[cartItemIndex],
        amount: state.items[cartItemIndex].amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[cartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE_ITEM") {
    const cartItemIndex = state.items.findIndex(
      (item) => item.id == action.id
    );
    const removingItem = state.items[cartItemIndex];
    const updatedTotalAmount = state.totalAmount - removingItem.price;
    let updatedItems;
    if (removingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id != action.id);
    } else {
      const updatedItem = { ...removingItem, amount: removingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[cartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

function CartProvider(props) {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  function addItemHandler(item) {
    dispatchCart({ type: "ADD_ITEM", item: item });
  }

  function removeItemHandler(id) {
    dispatchCart({ type: "REMOVE_ITEM", id: id });
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
