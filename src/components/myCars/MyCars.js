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
        try {
          const res = await fetch(`https://shop-backend-le06.onrender.com/api/cars/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (res.ok) {
            alert("Elan silindi");
            getCars();
          } else {
            alert(data.message || "Silmə alınmadı");
          }
        } catch (err) {
          console.error("Silmə xətası:", err);
        }
      };
    
      useEffect(() => {
        getCars();
      }, [getCars]);
    
      // 🧠 Filter və sort logic
    //   const filteredCars = cars
    //     .filter((car) =>
    //       `${car.marka} ${car.model} ${car.description}`
    //         .toLowerCase()
    //         .includes(searchTerm.toLowerCase())
    //     )
    //     .filter((car) => {
    //       const price = parseFloat(car.price);
    //       return (
    //         (!minPrice || price >= parseFloat(minPrice)) &&
    //         (!maxPrice || price <= parseFloat(maxPrice))
    //       );
    //     });
    
    //   const sortedCars = [...filteredCars].sort((a, b) => {
    //     if (sortType === "priceLow") return a.price - b.price;
    //     if (sortType === "priceHigh") return b.price - a.price;
    //     if (sortType === "latest")
    //       return new Date(b.created_at) - new Date(a.created_at);
    //     return 0;
    //   });



  return (
    <div className={styles.container}>
    <h2>🚗 Mənim Elanlarım</h2>

    {/* 🔍 Axtarış və Filter */}
    {/* <div className={styles.filters}>
      <input
        type="text"
        placeholder="Marka, model, təsvir..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min qiymət"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max qiymət"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="latest">Ən yenilər</option>
        <option value="priceLow">Qiymət: Aşağıdan yuxarı</option>
        <option value="priceHigh">Qiymət: Yuxarıdan aşağı</option>
      </select>
    </div> */}

    {/* 🧾 Elanlar siyahısı */}
    <div className={styles.cardGrid}>
      {cars.map((car) => (
        <div key={car.id} className={styles.card}>
          <h3>{car.marka} {car.model} ({car.il})</h3>
          <p>Yürüş: {car.yurus}</p>
          <p>Qiymət: {car.price} AZN</p>
          <p>{car.description}</p>
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
