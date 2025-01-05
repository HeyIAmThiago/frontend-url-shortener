import imgHome from "./assets/img-home.jpg";
import menuIco from "./assets/menu-ico.svg";
import Menu from "./Menu";
import "./App.css";
import { Link } from "react-router-dom";
import React from "react";
import copy from "./assets/copy.svg";

function App() {
  const handleClickHero = () => {};
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [generatedSuccessful, setGeneratedSuccessful] = React.useState(false);

  const [data, setData] = React.useState({});

  const [url, setUrl] = React.useState("");

  const handleClickMenu = () => {
    setVisibleMenu(true);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://encurtador-de-url-do-thaiago.netlify.app/${data.shortcode}`
    );
  };

  const handleGerar = () => {
    const randomUrl = Math.random().toString(36).substring(2, 7);
    7;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const createdAt = `${yyyy}-${mm}-${dd}`;
    // console.log(formattedDate);

    const postBody = {
      url: url,
      shortcode: randomUrl,
      createdat: createdAt,
      updatedat: createdAt,
    };

    fetch("https://api-encurtador-de-link.onrender.com/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.shortcode) {
          setGeneratedSuccessful(true);
          setData(data);
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
          <div className="generate-box">
            <input
              type="text"
              className="original-url"
              placeholder="URL para encurtar"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setGeneratedSuccessful(false);
              }}
              required={true}
            />

            {generatedSuccessful ? (
              <button className="copy-url" onClick={handleCopy}>
                <img src={copy} className="copy-ico" />
              </button>
            ) : (
              <button
                className="generate-url"
                onClick={handleGerar}
                disabled={url === ""}
              >
                gerar
              </button>
            )}
          </div>

          {generatedSuccessful && (
            <p className="message-url-generated" style={{ color: "#45d5be" }}>
              URL gerada com sucesso!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
