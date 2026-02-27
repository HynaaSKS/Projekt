function DrinkList({ drinks }) {
  return (
    <div>
      <h3>Vypité drinky</h3>
      <ul>
        {drinks.map((drink, index) => (
          <li key={index}>
            {drink.volume} ml - {drink.alcohol} %
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DrinkList;