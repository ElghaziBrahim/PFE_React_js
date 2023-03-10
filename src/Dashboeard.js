import { useLocation } from "react-router-dom";
import Header from "./componants/Dashboeard/header/Header";
import "./dashboard.css";
import Container from "./componants/Dashboeard/container/Container";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Dashboard = (props) => {
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    check_isLogin();
  }, []);
  function check_isLogin() {
    if (userData === null || userData === false) {
      navigate("/");
      console.log("Not logged in");
    } else {
      console.log("Logged in");
    }
  }

  const [page_in, setPage] = useState("main");
  function updateState(newState) {
    setPage(newState);
  }

  return (
    <div>
      <Header data={userData} updateState={updateState} />
      <Container data={userData} page_in={page_in} />
    </div>
  );
};
export default Dashboard;
