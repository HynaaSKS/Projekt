function Home() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <h1 className="hero-title">🍺 Alkohol Kalkulačka</h1>
        <p className="hero-subtitle">Zjisti si přesně, kolik máš alkoholu v krvi</p>
      </div>
 
      <div className="home-grid">
        <div className="home-card">
          <div className="card-icon">📊</div>
          <h3>Přesný výpočet</h3>
          <p>Vědecky podložený algoritmus pro výpočet BAC</p>
        </div>
        <div className="home-card">
          <div className="card-icon">🍹</div>
          <h3>Různé drinky</h3>
          <p>Předdefinovaná databáze 20+ populárních nápojů</p>
        </div>
        <div className="home-card">
          <div className="card-icon">⏱️</div>
          <h3>Čas do nuly</h3>
          <p>Odhadni si, kdy se ti alkohol vyčistí z krvi</p>
        </div>
      </div>
 
      <div className="home-cta">
        <p>Připraven? Jdi na Kalkulačku a začni počítat!</p>
      </div>
    </div>
  );
}
 
export default Home;
