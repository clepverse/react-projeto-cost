import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <a href="https://www.facebook.com/aldo.clep1" target="_blank">
            <FaFacebook />
          </a>
        </li>
        <li>
          <FaInstagram />
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
      <p className={styles.copy_right}>
        <span>Costs</span> &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
