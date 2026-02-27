import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./assets/Components/navbar";
import Home from "./assets/Components/home";
import Calculator from "./assets/Components/calculator";

function NotFound() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404 — Stránka nenalezena</h2>
      <p>Ověřte URL nebo se vraťte na <a href="/">domovskou stránku</a>.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;