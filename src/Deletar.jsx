import imgHome from "./assets/img-home.jpg";
import menuIco from "./assets/menu-ico.svg";
import Menu from "./Menu";
import "./Deletar.css";
import { Link } from "react-router-dom";
import React from "react";

function Deletar() {
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const handleClickMenu = () => {
    setVisibleMenu(true);
  };

  const handleDeletar = () => {
    fetch(`https://api-encurtador-de-link.onrender.com/url/${url}`, {
      method: "DELETE",
      body: {},
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "URL não existe!") {
          setMessage(false);
          setError(true);
        } else {
          setMessage(true);
          setError(false);
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

        <div className="mainForm">
          <input
            type="text"
            className="original-url deletar-url-box"
            placeholder="Digite o código da URL para deletar"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />

          <button
            className="deletar-url"
            onClick={handleDeletar}
            style={{ marginTop: "15px" }}
          >
            DELETAR
          </button>

          <p className="message-delete">
            {message && (
              <p style={{ color: "#45d5be" }}>
                URL de encurtação deletada com sucesso
              </p>
            )}
            {error && (
              <p style={{ color: "#D5455C" }}>URL de encurtação não existe!</p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Deletar;
