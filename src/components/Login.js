import React, { useState } from 'react'

const Login = () => {
   
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");



const handleEmail = (e) =>{
setEmail(e.target.value)
}

const handlePassword = (e) =>{
setPassword(e.target.value)
}



const handleClick = () => {
    fetch('hhttps://shop-backend-le06.onrender.com/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
  { 
    email:email,
    password:password
  }

  ),
})
  .then((response) => response.json())
  .then((data) => {
    
    console.log('Success:', data);
    const token = data.token;
    console.log(token);
    localStorage.setItem("token",token )
    
  })
  .catch((error) => {

    console.error('Error:', error);
  });
}

  return (
    <div>
        
         <input onChange={handleEmail}/>
          <input onChange={handlePassword}/>
          <button onClick={handleClick}>Submit</button>
      
    </div>
  )
}

export default Login
