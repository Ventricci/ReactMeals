import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";

function Cart(props) {
  const ctx = useContext(CartContext);

  function removeItemHandler(id) {
    ctx.removeItem(id);
  }

  function addItemHandler(item) {
    ctx.addItem({ ...item, amount: 1 });
  }

  return (
    <Modal onClose={props.onClose}>
      <ul className={styles["cart-items"]}>
        {ctx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={removeItemHandler.bind(null, item.id)}
            onAdd={addItemHandler.bind(null, item)}
          />
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <spa>${ctx.totalAmount.toFixed(2)}</spa>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {ctx.items.length > 0 && (
          <button className={styles["button"]}>Order</button>
        )}
      </div>
    </Modal>
  );
}

export default Cart;
