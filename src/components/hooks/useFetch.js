import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3004",
});

export function useFetch(url) {
  const [removeLoading, setRemoveLoading] = useState(false);
  const [error, setError] = useState(null);
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
      .catch((err) => {
        setError(err);
      }) //Loading svg
      .finally(() => {
        setRemoveLoading(true);
      });
  }, []);

  return { data, removeLoading, error };
}
