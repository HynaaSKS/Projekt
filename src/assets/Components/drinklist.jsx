import { useState } from "react";

function DrinkList({ drinks, removeDrink, editDrink }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editVolume, setEditVolume] = useState("");
  const [editAlcohol, setEditAlcohol] = useState("");
  
  if (!drinks || drinks.length === 0) return null;
 
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditVolume(drinks[index].volume.toString());
    setEditAlcohol(drinks[index].alcohol.toString());
  };
  
  const saveEdit = (index) => {
    if (editDrink && editVolume && editAlcohol) {
      editDrink(index, {
        ...drinks[index],
        volume: Number(editVolume),
        alcohol: Number(editAlcohol)
      });
      setEditingIndex(null);
      setEditVolume("");
      setEditAlcohol("");
    }
  };
  
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditVolume("");
    setEditAlcohol("");
  };
 
  return (
    <div className="drink-grid">
      {drinks.map((drink, index) => (
        <div className="drink-card" key={index}>
          <div className="drink-card-left">
            <div className="drink-image">
              {drink.image ? (
                <img 
                  src={`/src/obrazky/${drink.image}`}
                  alt={drink.name}
                  className="drink-img"
                />
              ) : (
                <div className="drink-icon">{drink.name ? drink.name.split(' ')[0] : '🥤'}</div>
              )}
            </div>
          </div>
 
          <div className="drink-card-body">
            {editingIndex === index ? (
              <div className="drink-edit-form">
                <div className="edit-field">
                  <label>Objem (ml):</label>
                  <input
                    type="number"
                    value={editVolume}
                    onChange={(e) => setEditVolume(e.target.value)}
                    placeholder="ml"
                    className="edit-input"
                    autoFocus
                  />
                </div>
                <div className="edit-field">
                  <label>Alkohol (%):</label>
                  <input
                    type="number"
                    value={editAlcohol}
                    onChange={(e) => setEditAlcohol(e.target.value)}
                    placeholder="%"
                    className="edit-input"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="drink-title">{drink.name || `${drink.volume} ml`}</div>
                <div className="drink-meta">{drink.volume} ml · {drink.alcohol} %</div>
              </>
            )}
          </div>
 
          <div className="drink-card-actions">
            {editingIndex === index ? (
              <>
                <button className="save-btn" onClick={() => saveEdit(index)} aria-label={`Uložit ${index}`} title="Uložit">
                  ✓
                </button>
                <button className="cancel-btn" onClick={cancelEdit} aria-label={`Zrušit ${index}`} title="Zrušit">
                  ✕
                </button>
              </>
            ) : (
              <>
                {editDrink && (
                  <button className="edit-btn" onClick={() => startEditing(index)} aria-label={`Upravit ${index}`} title="Upravit">
                    ✎
                  </button>
                )}
                {removeDrink && (
                  <button className="remove-btn" onClick={() => removeDrink(index)} aria-label={`Odstranit ${index}`} title="Odstranit">
                    ✕
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
 
export default DrinkList;
