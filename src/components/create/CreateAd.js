import React, { useState } from 'react';
import styles from './CreateAd.module.css';

const CreateAd = () => {
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [il, setIl] = useState("");
  const [yurus, setYurus] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("marka", marka);
    formData.append("model", model);
    formData.append("il", il);
    formData.append("yurus", yurus);
    formData.append("price", price);
    formData.append("description", description);
    if (image) formData.append("image", image);

    fetch("https://shop-backend-le06.onrender.com/api/cars", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("✅ Elan uğurla yaradıldı!");
        console.log("Yeni elan:", data);
      })
      .catch((err) => {
        console.error("Elan əlavə edilərkən xəta:", err);
        alert("❌ Xəta baş verdi");
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🚗 Yeni Avtomobil Elanı</h2>
      <input className={styles.input} placeholder="Marka" value={marka} onChange={(e) => setMarka(e.target.value)} />
      <input className={styles.input} placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
      <input className={styles.input} placeholder="İl" value={il} onChange={(e) => setIl(e.target.value)} />
      <input className={styles.input} placeholder="Yurus" value={yurus} onChange={(e) => setYurus(e.target.value)} />
      <input className={styles.input} placeholder="Qiymət" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input className={styles.input} placeholder="Açıqlama" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className={styles.input} type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

      <button className={styles.button} onClick={handleSubmit}>
        Elanı Yarat
      </button>
    </div>
  );
};

export default CreateAd;
