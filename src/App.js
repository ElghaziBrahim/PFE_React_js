import React, { useEffect, useState } from "react";
import "./App.css";

import Register from "./componants/register/Register";
import Login from "./componants/login/Login";
import Search from "./pictures/search.jpg";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  
  return (
    <div className="App">


      <div className="format">
        {currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} />
        ) : (
          <Register onFormSwitch={toggleForm} />
        )}
      </div>
      <img src={Search} className="saearch_pic" />
    </div>
  );
}

export default App;
