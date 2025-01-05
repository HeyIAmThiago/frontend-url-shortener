// 510.8px
import imgHome from "./assets/img-home.jpg";
import menuIco from "./assets/menu-ico.svg";
import Menu from "./Menu";
import "./Estatisticas.css";
import { Link } from "react-router-dom";
import React from "react";

function Estatisticas() {
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [shortUrl, setShortUrl] = React.useState("");
  const [data, setData] = React.useState({});
  const [notExists, setNotExists] = React.useState(false);

  const handleClickMenu = () => {
    setVisibleMenu(true);
  };

  const handleGerar = () => {
    fetch(`https://api-encurtador-de-link.onrender.com/${shortUrl}`)
      .then((results) => results.json())
      .then((data) => {
        if (data.message !== "URL não cadastrada") {
          setData(data);
        } else {
          setNotExists(true);
        }
        console.log(data);
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

        <div className="mainForm formGerarEdit">
          <input
            type="text"
            className="original-url url-statistics"
            placeholder="Insira o código de encurtamento"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
          />
          <button
            className="generate-url"
            onClick={handleGerar}
            style={{ marginTop: "15px" }}
          >
            gerar
          </button>
          <div className="info">
            <p className="message-success-edit ">URl: {data && data.url}</p>
            <p className="message-success-edit">
              Criação: {data && data.createdat}
            </p>

            <p className="message-success-edit">
              Num. Acessos: {data && data.accesscount}
            </p>
            {notExists && (
              <p className="message-success-edit message-error-stats">
                Shortcode não existe!: {data && data.accesscount}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estatisticas;
