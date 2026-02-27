import { useState } from "react";
import DrinkForm from "./drinkForm";
import DrinkList from "./drinklist";
import { predefinedDrinks } from "../data";

function Calculator() {
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [drinks, setDrinks] = useState([]);
  const [result, setResult] = useState(null);

  const addDrink = (drink) => {
    setDrinks([...drinks, drink]);
  };

  const addPredefinedDrink = (drink) => {
    setDrinks([...drinks, drink]);
  };

  const calculateBAC = () => {
    const r = gender === "male" ? 0.7 : 0.6;

    let totalAlcoholGrams = 0;

    drinks.forEach((drink) => {
      const pureAlcohol = drink.volume * (drink.alcohol / 100);
      const grams = pureAlcohol * 0.8;
      totalAlcoholGrams += grams;
    });

    const bac = totalAlcoholGrams / (weight * r);
    setResult(bac.toFixed(2));
  };

  return (
    <div>
      <h2>Kalkulačka</h2>

      <input
        type="number"
        placeholder="Hmotnost (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <select onChange={(e) => setGender(e.target.value)}>
        <option value="male">Muž</option>
        <option value="female">Žena</option>
      </select>

      <h3>Předdefinované drinky</h3>
      {predefinedDrinks.map((drink, index) => (
        <button key={index} onClick={() => addPredefinedDrink(drink)}>
          {drink.name}
        </button>
      ))}

      <DrinkForm addDrink={addDrink} />
      <DrinkList drinks={drinks} />

      <button onClick={calculateBAC}>Spočítat</button>

      {result && <h3>Odhadované BAC: {result} ‰</h3>}
    </div>
  );
}

export default Calculator;