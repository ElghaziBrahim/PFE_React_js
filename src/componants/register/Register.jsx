import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function Submidhandle(e) {
    e.preventDefault();

    // Send a POST request to your backend API
    axios
      .post("http://localhost/ReactProjects/pfe/src/register.php", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        const userData = {
          email: response.data.email,
          name: response.data.name,
          methode: "register",
          // Add any additional user data you need to store here
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/select", { state: userData });
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors that occur during registration
      });
  }
  return (
    <>
      <h1>Register </h1>
      <form onSubmit={Submidhandle}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your Full Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Your Password"
        />
        <button type="submit" className="submit_">
          Register
        </button>
        <button className="chage_form_butt">
          Already have an account ?
          <button className="bbb" onClick={() => props.onFormSwitch("login")}>
            Log in
          </button>
        </button>
      </form>
    </>
  );
}
export default Register;
