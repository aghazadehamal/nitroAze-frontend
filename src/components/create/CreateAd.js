import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateAd.module.css';

const CreateAd = () => {
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [il, setIl] = useState("");
  const [yurus, setYurus] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("marka", marka);
    formData.append("model", model);
    formData.append("il", il);
    formData.append("yurus", yurus);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("phone", phone);

    images.forEach((img) => {
      formData.append("images", img);
    });

    fetch("http://localhost:4000/api/cars", {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
  body: formData,
})
  .then(async (res) => {
    const text = await res.text(); // ✨ JSON olmasa belə oxuya bilək deyə
    try {
      const data = JSON.parse(text);
      if (res.ok) {
        alert("✅ Elan uğurla yaradıldı!");
        navigate("/");
      } else {
        console.error("❌ Server xətası:", data);
        alert(data.message || "Server xətası baş verdi");
      }
    } catch (err) {
      console.error("❌ JSON parse xətası:", text);
      alert("Serverdə gözlənilməyən xəta baş verdi.");
    }
  })
  .catch((err) => {
    console.error("Elan əlavə edilərkən xəta:", err);
    alert("❌ Xəta baş verdi");
  });

  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🚗 Yeni Avtomobil Elanı</h2>

      <input className={styles.input} placeholder="Marka" value={marka} onChange={(e) => setMarka(e.target.value)} />
      <input className={styles.input} placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
      <input className={styles.input} placeholder="İl" value={il} onChange={(e) => setIl(e.target.value)} />
      <input className={styles.input} placeholder="Yürüş" value={yurus} onChange={(e) => setYurus(e.target.value)} />
      <input className={styles.input} placeholder="Qiymət" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input className={styles.input} placeholder="Açıqlama" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className={styles.input} placeholder="Əlaqə nömrəsi" value={phone} onChange={(e) => setPhone(e.target.value)} />

      <input
        className={styles.input}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />

      {imagePreviews.length > 0 && (
        <div className={styles.previewWrapper}>
          <p>📷 Seçilmiş şəkillər:</p>
          <div className={styles.previewGrid}>
            {imagePreviews.map((src, idx) => (
              <img key={idx} src={src} alt={`Şəkil ${idx + 1}`} className={styles.previewImage} />
            ))}
          </div>
        </div>
      )}

      <button className={styles.button} onClick={handleSubmit}>
        Elanı Yarat
      </button>
    </div>
  );
};

export default CreateAd;
