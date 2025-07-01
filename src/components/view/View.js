import React, { useEffect, useState, useCallback } from "react";
import styles from './View.module.css';
import { useParams } from 'react-router-dom';

const View = () => {

     const [cars, setCars] = useState([]);

       
          const token = localStorage.getItem("token");
          const {id} = useParams(); 
        
         const getCars = useCallback(async () => {
  try {
    const res = await fetch(`https://shop-backend-le06.onrender.com/api/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCars(data);
  } catch (err) {
    console.error("Xəta baş verdi:", err);
  }
}, [token, id]); 


     useEffect(() => {
            getCars();
          }, [getCars]);


  return (
   <div className={styles.cardGrid}>
     
        <div key={cars.id} className={styles.card}>
          <h3>{cars.marka} {cars.model} ({cars.il})</h3>
          <p>Yürüş: {cars.yurus}</p>
          <p>Qiymət: {cars.price} AZN</p>
          <p>{cars.description}</p>
          <p>Əlaqə: {cars.phone} </p>
          {cars.image_urls && cars.image_urls.length > 0 && (
  <img src={`https://shop-backend-le06.onrender.com/${cars.image_urls[0]}`} alt={`${cars.marka} şəkli`} />
)}
        

        </div>
     
    </div>
  )
}

export default View
