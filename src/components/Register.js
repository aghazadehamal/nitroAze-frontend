import React, { useState } from 'react'

const Register = () => {
    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

const handleUsername = (e) =>{
setUsername(e.target.value)
}

const handleEmail = (e) =>{
setEmail(e.target.value)
}

const handlePassword = (e) =>{
setPassword(e.target.value)
}



const handleClick = () => {
    fetch('https://shop-backend-le06.onrender.com/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
  {  username: username,
    email:email,
    password:password
  }

  ),
})
  .then((response) => response.json())
  .then((data) => {
    
    console.log('Success:', data);
  })
  .catch((error) => {

    console.error('Error:', error);
  });
}

  return (
    <div>
        <input onChange={handleUsername}/>
         <input onChange={handleEmail}/>
          <input onChange={handlePassword}/>
          <button onClick={handleClick}>Submit</button>
      
    </div>
  )
}

export default Register
