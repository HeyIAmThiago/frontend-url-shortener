import React from "react";
import { useParams } from "react-router-dom";

const Direcionador = () => {
  const [notFound, setNotFound] = React.useState(false);
  const { url } = useParams();
  console.log(url);

  fetch(`https://api-encurtador-de-link.onrender.com/${url}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      if (data.message === "URL não cadastrada") {
        setNotFound(true);
      } else {
        fetch(`https://api-encurtador-de-link.onrender.com/url/${url}`, {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accesscount: 1,
          }),
        });

        const urlToGo = data.url;

        window.location.replace(urlToGo);
      }
    });

  return <div>{notFound && "URL não encontrada!"}</div>;
};

export default Direcionador;
