import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    marka: "",
    model: "",
    il: "",
    yürüş: "",
    price: "",
    description: "",
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
    setImageFile(e.target.files[0]);
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    <div style={{ padding: "1rem" }}>
      <h2>🔧 Elanı Redaktə Et</h2>

      {Object.entries(formData).map(([key, value]) => (
        key !== "image_url" && (
          <input
            key={key}
            name={key}
            value={value || ""}
            placeholder={key}
            onChange={handleChange}
            style={{ display: "block", marginBottom: "0.5rem" }}
          />
        )
      ))}

      {/* Mövcud şəkil göstərilir */}
      {formData.image_url && (
        <div style={{ marginBottom: "0.5rem" }}>
          <img
            src={`http://localhost:4000${formData.image_url}`}
            alt="Cari şəkil"
            width="200"
          />
        </div>
      )}

      {/* Yeni şəkil seçmək üçün input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "1rem" }}
      />

      <button onClick={handleUpdate}>Yenilə</button>
    </div>
  );
};

export default EditAd;
