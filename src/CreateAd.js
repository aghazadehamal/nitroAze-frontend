import React, { useState } from 'react';

const CreateAd = () => {
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [il, setIl] = useState("");
  const [yurus, setYurus] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // 👈 Fayl (şəkil) üçün

  const token = localStorage.getItem("token");

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("marka", marka);
    formData.append("model", model);
    formData.append("il", il);
    formData.append("yürüş", yurus);
    formData.append("price", price);
    formData.append("description", description);
    if (image) {
      formData.append("image", image); // 👈 şəkil faylını əlavə edirik
    }

    fetch("https://shop-backend-le06.onrender.com/api/cars", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // 👈 JSON yox, FormData olduğuna görə Content-Type lazım deyil
      },
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
    <div style={{ padding: "1rem" }}>
      <h2>🚗 Yeni Avtomobil Elanı Yarat</h2>
      <input placeholder="Marka" value={marka} onChange={(e) => setMarka(e.target.value)} />
      <input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
      <input placeholder="İl" value={il} onChange={(e) => setIl(e.target.value)} />
      <input placeholder="Yürüş" value={yurus} onChange={(e) => setYurus(e.target.value)} />
      <input placeholder="Qiymət" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Açıqlama" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

      <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        Elanı Yarat
      </button>
    </div>
  );
};

export default CreateAd;
