import React from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, setCart }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const total_amount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (id, change) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCart(updatedCart);
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const submitOrder = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          total_amount
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Sifariş uğurla göndərildi!");
        setCart([]);
        navigate("/");
      } else {
        alert("❌ Xəta: " + data.message);
      }
    } catch (err) {
      console.error("Sifariş zamanı xəta:", err);
    }
  };

  return (
    <div>
      <h2>Səbət</h2>
      {cart.length === 0 ? (
        <p>Səbət boşdur</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            {item.name} - {item.price} AZN
            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
            <strong> {item.quantity} </strong>
            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            <button onClick={() => removeItem(item.id)}>❌ Sil</button>
          </div>
        ))
      )}

      <p>Toplam məbləğ: {total_amount.toFixed(2)} AZN</p>
      <button
        onClick={submitOrder}
        disabled={cart.length === 0}
      >
        Sifarişi təsdiqlə
      </button>

      <br />
      <button onClick={() => navigate("/")}>🔙 Məhsullara qayıt</button>
    </div>
  );
};

export default Checkout;
