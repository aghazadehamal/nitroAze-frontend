import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  


  const handleClick = () => {
    fetch('https://shop-backend-le06.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        if (data.token) {
          localStorage.setItem("token", data.token);
          alert("✅ Giriş uğurludur");
          navigate("/");
        } else {
          alert(data.message || "Giriş alınmadı");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Giriş zamanı xəta baş verdi");
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.heading}>🔐 Giriş Et</h2>

        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className={styles.passwordWrapper}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="Şifrə"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
            title="Şifrəni göstər/gizlət"
          >
            {showPassword ? "🔒" : "👁️"}
          </span>
        </div>

        <button className={styles.button} onClick={handleClick}>
          Daxil Ol
        </button>

        <p className={styles.footerText}>
          Hesabınız yoxdur? <Link to="/register">Qeydiyyatdan keçin</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
