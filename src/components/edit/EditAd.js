import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from './EditAd.module.css';

const EditAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
    const [imagePreview, setImagePreview] = useState(null);

 const [formData, setFormData] = useState({
  marka: "",
  model: "",
  il: "",
  yurus: "",
  price: "",
  description: "",
  phone: "",       
  image_url: ""
});


  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/cars/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error("Elan yüklənmə xətası:", err);
      }
    };
    fetchAd();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  if (file) {
   setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); 
  }
  };

  const handleUpdate = async () => {
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    const res = await fetch(`http://localhost:4000/api/cars/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formDataToSend,
    });

    const result = await res.json();
    if (res.ok) {
      alert("✅ Elan yeniləndi");
      navigate("/");
    } else {
      alert(result.message || "Yeniləmə alınmadı");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🔧 Elanı Redaktə Et</h2>

     {Object.entries(formData).map(([key, value]) => (
  key !== "image_url" && (
    <input
      key={key}
      name={key}
      value={value || ""}
      placeholder={key === "phone" ? "Əlaqə nömrəsi" : key}
      onChange={handleChange}
      className={styles.input}
    />
  )
))}


     {!imagePreview && formData.image_url && (
  <div className={styles.imagePreview}>
    <img src={formData.image_url} alt="Cari şəkil" className={styles.previewImage} />
  </div>
)}




      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={styles.input}
      />

    


 {imagePreview && (
  <div className={styles.previewWrapper}>
    <p>📷 Seçilmiş şəkil:</p>
    <img src={imagePreview} alt="Seçilmiş şəkil" className={styles.previewImage} />
  </div>
)}

      <button onClick={handleUpdate} className={styles.button}>Yenilə</button>
    </div>
  );
};

export default EditAd;
