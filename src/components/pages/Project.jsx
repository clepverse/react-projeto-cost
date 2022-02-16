import React, { useState, useEffect } from "react";
import { parse, v4 as uuidv4 } from "uuid";
import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import Message from "../layout/Message";
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

const api = axios.create({
  baseURL: "http://localhost:3004",
});

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  useEffect(() => {
    api
      .get(`/projects/${id}`)
      .then((res) => {
        setProject(res.data);
        setServices(res.data.services);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setRemoveLoading(true);
      });
  }, [id]);

  const editPost = (project) => {
    setMessage("");
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto");
      setType("error");
      return false;
    }

    api
      .patch(`/projects/${id}`, project)
      .then((res) => {
        setProject(res.data);
        setMessage("Projeto atualizado com sucesso");
        setType("success");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setShowProjectForm(false);
      });
  };

  const createService = (project) => {
    setMessage("");
    // last service
    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    // maximum value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço!");
      setType("error");
      project.services.pop();
      return false;
    }

    // add service cost to project total cost
    project.cost = newCost;

    // update project
    api
      .patch(`/projects/${id}`, project)
      .then((res) => {
        setProject(res.data);
        setMessage("Serviço adicionado com sucesso");
        setType("success");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setShowServiceForm(false);
      });
  };

  const removeService = () => {};

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };

  const toggleServiceForm = () => {
    setShowServiceForm(!showServiceForm);
  };

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria: </span>
                    {project.category.name}
                  </p>
                  <p>
                    <span>Total de orçamento: </span>R$ {project.budget}
                  </p>
                  <p>
                    <span>Total utilizado: </span>R$ {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
