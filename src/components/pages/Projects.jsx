import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import styles from "./Projects.module.css";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";
// import { useFetch } from "../hooks/useFetch";
// import { useRemove } from "../hooks/useRemove";

const api = axios.create({
  baseURL: "http://localhost:3004",
});

export default function Projects() {
  const [removeLoading, setRemoveLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectMessage, setProjectMessage] = useState("");

  useEffect(() => {
    api
      .get("/projects")
      //Requisição GET
      .then((response) => {
        const dados = response.data;
        setProjects(dados);
        console.log(dados);
      })
      //Retorna erro
      .catch((err) => {
        setError(err);
      }) //Loading svg
      .finally(() => {
        setRemoveLoading(true);
      });
  }, []);

  const removeProject = (id) => {
    api
      .delete(`/projects/${id}`)
      .then((res) => {
        const dados = res.data;
        console.log(dados);
      })
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
        setProjectMessage("Projeto removido com sucesso!");
      })
      .catch((err) => {
        setError(err);
        console.log(error);
      });
  };

  // const removeProject = (id) => {
  //   fetch(`http://localhost:3004/projects/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setProjects(projects.filter((project) => project.id !== id));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  // const { data: projects, removeLoading } = useFetch("/projects");

  // const { removeProject } = useRemove("/projects");

  console.log("Projetos carregados com sucesso: ", projects);

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar novo projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <Message type="info" msg="Nenhum projeto encontrado" />
        )}
      </Container>
    </div>
  );
}
