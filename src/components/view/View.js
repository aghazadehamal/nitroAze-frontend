import React, { useEffect, useState, useCallback } from "react";
import styles from './View.module.css';
import { useParams } from 'react-router-dom';

const View = () => {

     const [cars, setCars] = useState([]);

       
          const token = localStorage.getItem("token");
          const {id} = useParams(); 
        
         const getCars = useCallback(async () => {
  try {
    const res = await fetch(`http://localhost:4000/api/cars/${id}`, {
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
          {cars.image_url && (
          <img src={cars.image_url} alt={`${cars.marka} şəkli`} />

          )}
        

        </div>
     
    </div>
  )
}

export default View
