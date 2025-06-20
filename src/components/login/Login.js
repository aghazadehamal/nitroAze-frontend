import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        localStorage.setItem("token", token);
        alert("✅ Giriş uğurludur");
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Giriş zamanı xəta baş verdi");
      });
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        onChange={handleEmail}
        value={email}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Şifrə"
        onChange={handlePassword}
        value={password}
      />
      <button className={styles.button} onClick={handleClick}>
        Giriş Et
      </button>
    </div>
  );
};

export default Login;
