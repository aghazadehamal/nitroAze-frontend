import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">🚗 AvtoElan</Link>
      </div>
      <div className={styles.links}>
        <Link to="/add">+ Elan Yerləşdir</Link>
        <Link to="/myads">Elanlarım</Link>
        <Link to="/login">Daxil ol</Link>
      </div>
    </nav>
  );
};

export default Navbar;
