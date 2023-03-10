import React, { useEffect, useState } from "react";
import "./Con_select.css";
import { json, useLocation } from "react-router-dom";
import Article from "../Dashboeard/container/article/Article";
import Header from "../Dashboeard/header/Header";
import data from "../../json.json";
import Save from "../../pictures/save.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Con_select(props) {
  const location = useLocation();
  const userData = location.state;

  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    /*  if (typeof userData.methode !== "undefined") { */
    setArticles(data);
    console.log(data);
    console.log(userData);
    /* } else { */
    /* navigate("/dashboard"); */
    /* } */
  }, []);
  const [checked_articles_val, setChecked_articles_val] = useState([]);

  function article_data_checked(val_article, data_checked) {
    if (data_checked) {
      if (checked_articles_val.includes(val_article)) {
      } else {
        setChecked_articles_val((prevState) => [...prevState, val_article]);
      }
    } else {
      if (checked_articles_val.includes(val_article)) {
        const index = checked_articles_val.indexOf(val_article);
        if (index > -1) {
          setChecked_articles_val((prevState) => {
            const updatedState = [...prevState];
            updatedState.splice(index, 1);
            return updatedState;
          });
        }
      }
    }
  }

  function save_checked(e) {
    e.preventDefault();
    console.log(checked_articles_val);

    axios
      .post("http://localhost/ReactProjects/pfe/src/save_checked.php", {
        data_selected: checked_articles_val,
        name_user: userData.name,
      })
      .then((response) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <button onClick={save_checked}>
        <img className="save_class" src={Save} />
      </button>

      <Header data={userData} />
      {/* <p>Welcome {props.data.email}</p> */}
      <hr color="black" size="3" />
      <div className="container">
        <div className="side">
          <h2>Selected Articles </h2>
          {checked_articles_val.map((sidearticle, id) => (
            <div className="sidearticle">
              <h3>{sidearticle}</h3>
            </div>
          ))}
        </div>
        <div className="main">
          {articles.map((article, id) => (
            <>
              <div className="article_co">
                <Article
                  key={article.id}
                  article_chack_data={article_data_checked}
                  article_info={article}
                  boxcheck={true}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Con_select;
