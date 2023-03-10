import React, { useState } from "react";
import "./article.css";
import { useLocation } from "react-router-dom";

function Article(props) {
  const location = useLocation();
  const userData = location.state;

  const [isChecked, setIsChecked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  function changeChecked(e) {
    setIsChecked(!isChecked);
    props.article_chack_data(e.target.value, e.target.checked);
  }

  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  return (
    <>
      <div className="article">
        <div className="information">
          <h1>
            <a /* href={props.article_info.url} */ target="_blank">
              {props.article_info.title}
            </a>
          </h1>
          <h2>
            {props.article_info.authors.map((author, index) => (
              <div className="author">
                <span key={index}>{author.name}</span>
              </div>
            ))}
          </h2>

          <div className="info">
            {isExpanded
              ? props.article_info.description
              : `${props.article_info.description.slice(0, 300)}...`}
            <button onClick={toggleExpanded}>
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
        <>
          {props.boxcheck && (
            <div className="checkbox_article">
              <input
                type="checkbox"
                onChange={changeChecked}
                value={props.article_info.title}
              />
            </div>
          )}
        </>
      </div>
    </>
  );
}

export default Article;
