import { useState } from "react";
 
function DrinkForm({ addDrink }) {
  const [volume, setVolume] = useState("");
  const [alcohol, setAlcohol] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (!volume || !alcohol) return;
 
    addDrink({
      volume: Number(volume),
      alcohol: Number(alcohol),
    });
 
    setVolume("");
    setAlcohol("");
  };
 
  return (
    <form onSubmit={handleSubmit}>
      <h3>Přidat drink</h3>
 
      <input
        type="number"
        placeholder="Objem (ml)"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
      />
 
      <input
        type="number"
        placeholder="Alkohol (%)"
        value={alcohol}
        onChange={(e) => setAlcohol(e.target.value)}
      />
 
      <button type="submit">Přidat</button>
    </form>
  );
}
 
export default DrinkForm;
