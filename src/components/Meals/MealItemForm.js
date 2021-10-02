import React, { useState, useRef } from "react";
import Input from "../UI/Input";
import styles from "./MealItemForm.module.css";

function MealItemForm(props) {
  const [amountValidation, setAmountValidation] = useState(true);
  const amountInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    if (
      enteredAmount.trim().lenght === 0 ||
      +enteredAmount < 1 ||
      +enteredAmount > 5
    ) {
      return;
    }
    props.onAddToCart(+enteredAmount);
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label={"Amount"}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountValidation && <p>Please entered a valid amount (1-5)</p>}
    </form>
  );
}

export default MealItemForm;
