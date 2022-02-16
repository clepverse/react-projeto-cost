import React, { useState, useEffect } from "react";
import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../layout/Loading";
import Container from "../layout/Container";

const api = axios.create({
  baseURL: "http://localhost:3004",
});

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    api
      .get(`/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.log(err))
      .finally(() => {
        setRemoveLoading(true);
      });
  }, [id]);

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span>
                    {project.category.name}
                  </p>
                  <p>
                    <span>Total de orçamento:</span>R$
                    {project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span>R$
                    {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <p>form</p>
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
