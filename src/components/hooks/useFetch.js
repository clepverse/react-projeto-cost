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
      //Solicita dados
      .then((response) => {
        const categoriesDados = response.data;
        setData(categoriesDados);
        console.log("Dados carregados com sucesso" + categoriesDados);
      })
      //Retorna erro
      .catch((error) => {
        console.log(error + "Erro ao carregar categorias");
      });
  }, []);

  return { data };
}
