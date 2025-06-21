import React, { useEffect, useState, useCallback } from "react";

import styles from './MyCars.module.css';
import { Link } from "react-router-dom"; 

const MyCars = () => {


     const [cars, setCars] = useState([]);
   
      const token = localStorage.getItem("token");
    
      const getCars = useCallback(async () => {
  try {
    const res = await fetch("https://shop-backend-le06.onrender.com/api/cars/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCars(data);
  } catch (err) {
    console.error("Xəta baş verdi:", err);
  }
}, [token]);
 
    
      const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Bu elanı silmək istədiyinizə əminsiniz?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`https://shop-backend-le06.onrender.com/api/cars/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) {
      alert("✅ Elan silindi");
      getCars();
    } else {
      alert(data.message || "❌ Silmə alınmadı");
    }
  } catch (err) {
    console.error("Silmə xətası:", err);
  }
};

    
      useEffect(() => {
        getCars();
      }, [getCars]);
    
    



  return (
    <div className={styles.container}>
    <h2>🚗 Mənim Elanlarım</h2>

    
    <div className={styles.cardGrid}>
      {cars.map((car) => (
        <div key={car.id} className={styles.card}>
          <h3>{car.marka} {car.model} ({car.il})</h3>
          <p>Yürüş: {car.yurus}</p>
          <p>Qiymət: {car.price} AZN</p>
          
          <p>{car.description}</p>
          <p>Əlaqə: {car.phone} </p>
          {car.image_url && (
          <img src={car.image_url} alt={`${car.marka} şəkli`} />

          )}
         <div className={styles.actions}>
  <button onClick={() => handleDelete(car.id)}>❌ Sil</button>
  <Link to={`/edit/${car.id}`}>
    <button>✏️ Redaktə Et</button>
  </Link>

 
</div>

        </div>
      ))}
    </div>
  </div>
  )
}

export default MyCars
