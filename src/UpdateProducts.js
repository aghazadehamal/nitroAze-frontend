import React, { useState } from 'react'
import { useParams } from "react-router";

const UpdateProducts = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const {id} = useParams();



    const handleName = (e) => {
setName(e.target.value);
    }

    const handleDescription = (e) => {
setPrice(e.target.value);
    }

    const handlePrice = (e) => {
setDescription(e.target.value);
    }

    const handleStock = (e) => {
setStock(e.target.value);
    }

    const handleClick = () => {
    fetch(`https://shop-backend-le06.onrender.com/api/products/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
  { 
    name:name,
    price:price,
    description:description,
    stock:stock
  }

  ),
})
  .then((response) => response.json())
  .then((data) => {
    
    console.log('Success:', data);
    const token = data.token;
    console.log(token);
    localStorage.setItem(token, "token")
    
  })
  .catch((error) => {

    console.error('Error:', error);
  });
}


  return (
    <div>
        <input onChange={handleName}/>
        <input onChange={handleDescription}/>
         <input onChange={handlePrice}/>
          <input onChange={handleStock}/>
          <button onClick={handleClick}>Send</button>
      
    </div>
  )
}

export default UpdateProducts
