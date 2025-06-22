import React, { useEffect, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Decode token once
  const decoded = useMemo(() => jwtDecode(token), [token]);
  const userId = useMemo(() => decoded.userId, [decoded]);

  // ✅ getCars funksiyası yuxarıda təyin olunur
  const getCars = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://shop-backend-le06.onrender.com/api/cars", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCars(data);
    } catch (err) {
      console.error("Xəta baş verdi:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ilk renderdə bir dəfə cars-ları yüklə
  useEffect(() => {
    getCars();
  }, [token]); // token dəyişsə, yenidən çağır

  // Silmə funksiyası
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
        getCars(); // yenidən siyahını yüklə
      } else {
        alert(data.message || "❌ Silmə alınmadı");
      }
    } catch (err) {
      console.error("Silmə xətası:", err);
    }
  };

  // Filtr və sort
  const filteredCars = cars
    .filter((car) =>
      `${car.marka} ${car.model} ${car.description}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((car) => {
      const price = parseFloat(car.price);
      return (
        (!minPrice || price >= parseFloat(minPrice)) &&
        (!maxPrice || price <= parseFloat(maxPrice))
      );
    });

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortType === "priceLow") return a.price - b.price;
    if (sortType === "priceHigh") return b.price - a.price;
    if (sortType === "latest") return new Date(b.created_at) - new Date(a.created_at);
    return 0;
  });

  return (
    <div className={styles.container}>
      <h2>🚗 Bütün Avtomobil Elanları</h2>

      <div className={styles.filters}>
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
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="latest">Ən yenilər</option>
          <option value="priceLow">Qiymət: Aşağıdan yuxarı</option>
          <option value="priceHigh">Qiymət: Yuxarıdan aşağı</option>
        </select>
      </div>

      <div className={styles.cardGrid}>
        {loading ? (
          [...Array(15)].map((_, index) => (
            <div key={index} className={styles.skeletonCard}>
              <div className={styles.skeletonImage}></div>
              <div className={styles.skeletonLine}></div>
              <div className={styles.skeletonLine}></div>
              <div className={styles.skeletonLine}></div>
            </div>
          ))
        ) : (
          sortedCars.map((car) => (
            <div key={car.id} className={styles.card}>
              <h3>
                {car.marka} {car.model} ({car.il})
              </h3>
              <p>Yürüş: {car.yurus}</p>
              <p>Qiymət: {car.price} AZN</p>
              <p>{car.description}</p>
              <p>Əlaqə: {car.phone}</p>
              {car.image_url && <img src={car.image_url} alt={`${car.marka} şəkli`} />}

              <div className={styles.actions}>
                {car.user_id === userId && (
                  <>
                    <button onClick={() => handleDelete(car.id)}>❌ Sil</button>
                    <Link to={`/edit/${car.id}`}>
                      <button>✏️ Redaktə Et</button>
                    </Link>
                  </>
                )}
                <Link to={`/view/${car.id}`}>
                  <button>👁️ Detallı bax</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
