import React from "react";
import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";

export default function NewProject() {
  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar serviços</p>
      <ProjectForm btnText="Criar projeto" />
    </div>
  );
}
