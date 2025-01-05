import React from "react";
import "./Menu.css";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Menu = ({ position, visibleMenu, setVisibleMenu }) => {
  console.log(visibleMenu);
  const navigate = useNavigate();

  const handleBoxShadowClick = (event) => {
    setVisibleMenu((before) => !before);
    // console.log("hey");
  };
  const handleClickItemMenu = (event) => {};

  return (
    <>
      <div className="box-shadow" onClick={handleBoxShadowClick}></div>
      <div className="boxMenu">
        <ul className="menuList">
          <Link to="/url/editar">
            <li onClick={handleClickItemMenu}>editar url</li>
          </Link>
          <Link to="/url/estatisticas">
            <li>estatísticas</li>
          </Link>
          <Link to="/url/deletar">
            <li>deletar url</li>
          </Link>
          <Link to="/url/home">
            <li className="">gerar url</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Menu;
