import imgHome from "./assets/img-home.jpg";
import menuIco from "./assets/menu-ico.svg";
import Menu from "./Menu";
import "./Editar.css";
import { json, Link } from "react-router-dom";
import React from "react";

function Editar() {
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [encurtador, setEncurtador] = React.useState("");
  const [novoEncurtador, setNovoEncurtador] = React.useState("");
  const [notFound, setNotFound] = React.useState(false);
  const [sucesso, setSucesso] = React.useState(false);

  const handleClickMenu = () => {
    setVisibleMenu(true);
  };

  const handleEditar = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const updatedat = `${yyyy}-${mm}-${dd}`;

    const body = {
      shortcode: encurtador,
      url: url,
      newshortcode: novoEncurtador,
      updatedat: updatedat,
    };

    fetch("https://api-encurtador-de-link.onrender.com/url", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Erro") {
          setNotFound(true);
          setSucesso(false);
        } else {
          setSucesso(true);
          setNotFound(false);
        }
      });
  };

  return (
    <div className="mainHero">
      <span className="mainMenu" onClick={handleClickMenu}>
        <img src={menuIco} alt="Menu" className="menuIco" />{" "}
      </span>

      {visibleMenu && (
        <Menu visibleMenu={visibleMenu} setVisibleMenu={setVisibleMenu} />
      )}

      <div className="mainInfo">
        <img src={imgHome} alt="Logo" className="main-logo" />

        <div className="mainForm editForm">
          <input
            type="text"
            className="original-url"
            placeholder="URL original "
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="mainForm editForm">
          <input
            type="text"
            className="original-url"
            value={encurtador}
            onChange={(e) => setEncurtador(e.target.value)}
            placeholder="Código de Encurtamento"
          />
        </div>

        <div className="mainForm formGerarEdit">
          <input
            type="text"
            className="original-url novo-encurtador-url"
            placeholder="Novo Código Encurtador"
            value={novoEncurtador}
            onChange={(e) => setNovoEncurtador(e.target.value)}
          />
          <button className="generate-url" onClick={handleEditar}>
            editar
          </button>
          {sucesso && (
            <p className="message-success-edit">
              URL de encurtação alterada com sucesso!
            </p>
          )}
          {notFound && (
            <p className="error-message" style={{ color: "#D5455C" }}>
              URL ou Shortcode inválido(s)!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Editar;
