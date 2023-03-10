import React, { useEffect, useState } from "react";
import "./container.css";
import { useLocation } from "react-router-dom";
import Article from "./article/Article";
import Search_icon from "../../../pictures/search_icon.png";
import Profile from "./Profile/Profile";

import data from "../../../json.json";

function Container(props) {
  const location = useLocation();
  const userData = location.state;
  const [search_user, setSearchUser] = useState("us");

  const [articles, setArticles] = useState([]);
  const [change_in_input, setInputVar] = useState("us");

  function search_click() {
    setSearchUser(change_in_input);
  }

  /*   useEffect(() => {
    async function getDate() {
      const API_URL = `https://newsapi.org/v2/top-headlines?country=${search_user}&apiKey=508c1cfc7754418d847a229393e8647d`;
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data.articles);
      setArticles(data.articles);
    }
    getDate();
  }, [search_user]); */
  useEffect(() => {
    setArticles(data);
    console.log(data);
  }, []);

  function search_val(e) {
    setInputVar(e.target.value);
  }

  return (
    <>
      {props.page_in == "main" ? (
        <>
          <div className="search">
            <div className="select_">
              <select id="pet-select">
                <option value="">Categories</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="hamster">Hamster</option>
              </select>
            </div>
            <div className="input">
              <input
                onChange={search_val}
                type="search"
                placeholder="Search for article"
              />
              <button onClick={search_click}>
                <img src={Search_icon} />
              </button>
            </div>
          </div>
          {/* <p>Welcome {props.data.email}</p> */}
          <hr color="black" size="3" />
          <div className="container">
            <div className="side"></div>
            <div className="main">
              {articles.map((article) => (
                <div key={article.id} className="article_co">
                  <Article article_info={article} boxcheck={false} />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : props.page_in == "profile" ? (
        <>
          <Profile data={userData} />
        </>
      ) : null}
    </>
  );
}

export default Container;
