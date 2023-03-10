import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";


function Login(props) {
  const [user_data,setUserdata]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost/ReactProjects/pfe/src/users.php"
      );
      const data = await response.json();
      console.log(data);
      setUserdata(data);
    };

    fetchData();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function Submidhandle(e) {
    e.preventDefault();
    const user = user_data.find((user) => user.email === email && user.password === password);
    if (user) {
      console.log("Login successful");
      localStorage.setItem("userData", JSON.stringify(user));
      navigate("/dashboard", { state: user });
      
      // do something else, like redirect to dashboard
    } else {
      console.log("Login failed");
      alert("Login failed");
      
      // display error message or something
    }
    

    
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={Submidhandle}>
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
          Log in
        </button>
        <button className="chage_form_butt">
          Don't Have an Account ?
          <button
            className="bbb"
            onClick={() => props.onFormSwitch("register")}
          >
            Register
          </button>
        </button>
      </form>
    </>
  );
}
export default Login;
