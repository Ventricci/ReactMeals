import { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
  const ctx = useContext(CartContext);
  const [btnHighlight, setBtnHighligh] = useState(false);

  const cartItems = ctx.items.reduce((key, item) => {
    return key + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnHighlight ? styles.bump : ""}`;

  useEffect(() => {
    if (ctx.items.length === 0) {
      return;
    }

    setBtnHighligh(true);

    const timer = setTimeout(() => {
      setBtnHighligh(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [ctx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{cartItems}</span>
      <span></span>
    </button>
  );
}

export default HeaderCartButton;
