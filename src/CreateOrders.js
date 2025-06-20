import React, { useState } from 'react'

const CreateOrders = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");


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
    fetch('http://localhost:4000/api/products', {
  method: 'POST',
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

export default CreateOrders
