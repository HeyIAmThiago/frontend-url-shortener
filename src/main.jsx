import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Menu.jsx";
import Deletar from "./Deletar.jsx";
import Editar from "./Editar.jsx";
import Estatisticas from "./Estatisticas.jsx";
import Direcionador from "./Direcionador.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:url" element={<Direcionador />} />
      <Route path="url/home" element={<App />} />
      <Route path="url/editar" element={<Editar />} />
      <Route path="url/deletar" element={<Deletar />} />
      <Route path="url/estatisticas" element={<Estatisticas />} />
    </Routes>
  </BrowserRouter>
);
