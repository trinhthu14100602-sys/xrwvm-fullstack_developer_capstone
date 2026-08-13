import React, { useState } from 'react';
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const register = async (e) => {
    e.preventDefault();
    let register_url = window.location.origin + "/djangoapp/register";
    
    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    } else if (json.error) {
      alert(json.error);
    }
  };

  return (
    <div className="register_container">
      <div className="header">
        <span className="text">Sign Up</span>
      </div>
      <form onSubmit={register}>
        <div className="inputs">
          <div className="input">
            <input type="text" name="username" placeholder="Username" onChange={(e) => setUserName(e.target.value)} required/>
          </div>
          <div className="input">
            <input type="text" name="first_name" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required/>
          </div>
          <div className="input">
            <input type="text" name="last_name" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required/>
          </div>
          <div className="input">
            <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className="input">
            <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
          </div>
        </div>
        <div className="submit_container">
          <button className="submit" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
