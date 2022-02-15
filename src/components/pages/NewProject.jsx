import { useNavigate } from "react-router-dom";
import React from "react";
import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";
import axios from "axios";
import { usePost } from "../hooks/usePost";

export default function NewProject() {
  const createPost = usePost("/projects");

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
    </div>
  );
}
