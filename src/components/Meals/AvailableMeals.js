import React from "react";
import styles from "./AvailableMeal.module.css";
import Card from "../UI/Card";
import MealItem from "./Mealtem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

function AvailableMeals() {
  return (
    <section className={styles.meals}>
      <ul>
        <Card>
          {DUMMY_MEALS.map((meal) => (
            <MealItem
              id={meal.id}
              key={meal.id}
              title={meal.name}
              price={meal.price}
              description={meal.description}
            />
          ))}
        </Card>
      </ul>
    </section>
  );
}

export default AvailableMeals;
