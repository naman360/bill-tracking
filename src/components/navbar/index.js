import React from "react";
import Image from "react-bootstrap/Image";
import logoLink from "../../assets/images/brightLogo.png";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={`${styles.navbar}`}>
      <Image src={logoLink} width="180" alt="Bright-Money" />
    </div>
  );
};

export default Navbar;
