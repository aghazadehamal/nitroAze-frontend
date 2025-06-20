import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

const ViewProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState("")

     const getProducts = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/products/${id}`);

      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error("Xəta baş verdi:", err);
    }
  };

  useEffect(() => {
    getProducts();
  })
   
  return (


    <div>
      <p>{product.name}</p>
    </div>
  )
}

export default ViewProduct
