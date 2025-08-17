import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"

const Register = () => {
// State variables for form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

// Redirect to home
  const gohome = ()=> {
    window.location.href = window.location.origin;
  }

// Handle form submission
  const register = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!userName || !password || !firstName || !lastName || !email) {
      alert("Please fill in all fields");
      return;
    }
    
    try {
      let register_url = window.location.origin+"/djangoapp/register";
      console.log("Registering user:", userName);

      // Send POST request to register endpoint
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
      console.log("Registration response:", json);
      
      if (json.status === "Authenticated") {
        // Save username in session and reload home
        alert("Registration successful! Welcome " + json.userName + "!");
        sessionStorage.setItem('username', json.userName);
        window.location.href = window.location.origin;
      }
      else if (json.error === "Already Registered") {
        alert("The user with username '" + userName + "' is already registered. Please choose a different username.");
      }
      else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
};

  return(
    <div className="register_container" style={{width: "50%"}}>
      <div className="header" style={{display: "flex",flexDirection: "row", justifyContent: "space-between"}}>
          <span className="text" style={{flexGrow:"1"}}>SignUp</span> 
          <div style={{display: "flex",flexDirection: "row", justifySelf: "end", alignSelf: "start" }}>
          <a href="/" onClick={()=>{gohome()}} style={{justifyContent: "space-between", alignItems:"flex-end"}}>
            <img style={{width:"1cm"}} src={close_icon} alt="X"/>
          </a>
          </div>
          <hr/>
        </div>
        <form onSubmit={register}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} className="img_icon" alt='Username'/>
            <input type="text" name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)} required/>
          </div>
          <div className="input">
            <img src={user_icon} className="img_icon" alt='First Name'/>
            <input type="text" name="first_name" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)} required/>
          </div>
          <div className="input">
            <img src={user_icon} className="img_icon" alt='Last Name'/>
            <input type="text" name="last_name" placeholder="Last Name" className="input_field" onChange={(e) => setlastName(e.target.value)} required/>
          </div>
          <div className="input">
            <img src={email_icon} className="img_icon" alt='Email'/>
            <input type="email" name="email" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className="input">
            <img src={password_icon} className="img_icon" alt='Password'/>
            <input name="psw" type="password" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} required/>
          </div>
        </div>
        <div className="submit_panel">
          <input className="submit" type="submit" value="Register"/>
        </div>
      </form>
      </div>
  )
}

export default Register;
