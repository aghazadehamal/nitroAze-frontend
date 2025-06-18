import React, { useState } from 'react';
import styles from './Register.module.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    fetch('https://shop-backend-le06.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert("✅ Qeydiyyat uğurludur");
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Qeydiyyat zamanı xəta baş verdi");
      });
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="İstifadəçi adı"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Şifrə"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className={styles.button} onClick={handleClick}>
        Qeydiyyat
      </button>
    </div>
  );
};

export default Register;
