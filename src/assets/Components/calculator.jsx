import { useState, useEffect } from "react";
import DrinkForm from "./drinkForm";
import DrinkList from "./drinklist";
import { predefinedDrinks } from "../data";
 
function Calculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [drinks, setDrinks] = useState([]);
  const [result, setResult] = useState(null);
  const [timeToZero, setTimeToZero] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
 
  const addDrink = (drink) => setDrinks([...drinks, drink]);
  const addPredefinedDrink = (drink) => {
    setDrinks([...drinks, drink]);
    setShowOfferModal(false);
  };
  const removeDrink = (index) => {
    setDrinks(drinks.filter((_, i) => i !== index));
  };
  const editDrink = (index, updatedDrink) => {
    const newDrinks = [...drinks];
    newDrinks[index] = updatedDrink;
    setDrinks(newDrinks);
  };
 
  const calculateBAC = () => {
    if (!weight || !height) {
      alert("Zadejte prosím hmotnost i výšku!");
      return;
    }
 
    const r = gender === "male" ? 0.7 : 0.6;
    const eliminationRate = gender === "male" ? 0.15 : 0.13;
 
    let totalAlcoholGrams = 0;
    drinks.forEach((drink) => {
      const pureAlcohol = drink.volume * (drink.alcohol / 100);
      const grams = pureAlcohol * 0.8;
      totalAlcoholGrams += grams;
    });
 
    const bac = totalAlcoholGrams / (weight * r);
    setResult(bac.toFixed(2));
 
    const hours = bac / eliminationRate;
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    setTimeToZero(`${h} h ${m} min`);
 
    setShowModal(true); // otevře modal
  };
 
  const resetCalculator = () => {
    setWeight("");
    setHeight("");
    setGender("male");
    setDrinks([]);
    setResult(null);
    setTimeToZero(null);
    setShowModal(false);
  };
 
  // New: close on Escape and prevent background scroll while modal open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
 
    if (showModal) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
 
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showModal]);
 
  return (
    <div className="calculator-page">
      <div className="calculator-wrapper">
        <div className="calculator-section input-section">
          <h2>Tvůj profil</h2>
         
          <div className="input-row">
            <div className="input-group">
              <label>Hmotnost (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
              />
            </div>
 
            <div className="input-group">
              <label>Výška (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="180"
              />
            </div>
 
            <div className="input-group">
              <label>Pohlaví</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Muž</option>
                <option value="female">Žena</option>
              </select>
            </div>
          </div>
        </div>
 
        <div className="calculator-section drinks-section">
          <h2>Moje drinky</h2>
         
          <div className="drinks-actions">
            <button
              className="offer-toggle-btn"
              onClick={() => setShowOfferModal(true)}
            >
              ➕ Přidat z nabídky
            </button>
          </div>
 
          <div className="custom-drink-form">
            <h3>Vlastní drink</h3>
            <DrinkForm addDrink={addDrink} />
          </div>
 
          {drinks && drinks.length > 0 && (
            <div className="drinks-added">
              <h3>Přidané drinky ({drinks.length})</h3>
              <DrinkList drinks={drinks} removeDrink={removeDrink} editDrink={editDrink} />
            </div>
          )}
        </div>
 
        <div className="calculator-section result-section">
          <button
            className="calculate-btn"
            onClick={calculateBAC}
          >
            🧮 Spočítat BAC
          </button>
          <button
            className="reset-btn"
            onClick={resetCalculator}
          >
            🔄 Reset
          </button>
        </div>
      </div>
 
      {showOfferModal && (
        <div className="modal-overlay" onClick={() => setShowOfferModal(false)}>
          <div className="modal offer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Vyberte si drink</h3>
              <button className="modal-close" onClick={() => setShowOfferModal(false)} aria-label="Zavřít">✕</button>
            </div>
            <div id="predefined-offer" className="drink-offer-grid" aria-label="Předdefinované drinky">
              {predefinedDrinks.map((drink, index) => (
                <div
                  className="offer-small-card"
                  key={index}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    addPredefinedDrink(drink);
                    setShowOfferModal(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addPredefinedDrink(drink);
                      setShowOfferModal(false);
                    }
                  }}
                  aria-label={`Přidat ${drink.name}`}
                >
                  <div className="offer-card-image">
                    {drink.image ? (
                      <img 
                        src={`/src/obrazky/${drink.image}`}
                        alt={drink.name}
                        className="offer-card-img"
                      />
                    ) : (
                      <div className="offer-card-emoji">{drink.name.split(' ')[0]}</div>
                    )}
                  </div>
                  <div className="offer-small-body">
                    <div className="offer-small-name" title={drink.name}>{drink.name}</div>
                    <div className="offer-small-meta">{drink.volume} ml • {drink.alcohol} %</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
 
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Výsledek</h3>
            <p>Odhadované BAC: {result} ‰</p>
            <p>Odhadovaný čas do 0 ‰: {timeToZero}</p>
            <button onClick={() => setShowModal(false)}>Zavřít</button>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default Calculator;
