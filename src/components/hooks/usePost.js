import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3004",
});
export function usePost(url) {
  const navigate = useNavigate();

  const createPost = (project) => {
    //Inicializa
    project.cost = 0;
    project.services = [];

    //Requisição POST
    api
      .post(url, project)
      .then((res) => {
        navigate("/projects", {
          state: { message: "Projeto criado com sucesso!" },
        });
        console.log(res);
      })
      //Retorna erro
      .catch((error) => {
        console.log(error + "Erro ao criar projeto");
      });
  };

  return createPost;
}
