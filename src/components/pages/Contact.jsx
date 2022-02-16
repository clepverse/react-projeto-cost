import React from "react";
import SubmitButton from "../form/SubmitButton";
import styles from "./Contact.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <div className={styles.contact_container}>
      <h1>Contato</h1>
      <h2>Aldo Barbosa</h2>
      <a
        className={styles.contact_link}
        href="https://mail.google.com/mail/u/0/?fs=1&to=aldobarbosa.dev@gmail.com&tf=cm"
        target="_blank"
      >
        GMAIL
      </a>

      <ul className={styles.social_list}>
        <li>
          <a href="https://github.com/metaclep" target="_blank">
            <FaGithub />
          </a>
        </li>

        <li>
          <a
            href="https://www.linkedin.com/in/aldo-barbosa-055604230/"
            target="_blank"
          >
            <FaLinkedin />
          </a>
        </li>
      </ul>
    </div>
  );
}
