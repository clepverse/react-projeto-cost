import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3004",
});

export function useFetch(url) {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get(url)
      //Requisição GET
      .then((response) => {
        const dados = response.data;
        setData(dados);
      })
      //Retorna erro
      .catch((error) => {
        console.log(error + "Erro ao carregar dados");
      });
  }, []);

  return { data };
}
