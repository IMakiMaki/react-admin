import React from "react";
import styles from "./index.module.scss";
import logoImg from "@/assets/logo-text.png";

function Logo() {
  return (
    <div className={styles.logoWrapper}>
      <img src={logoImg} alt="logo" />
    </div>
  );
}

export default Logo;
