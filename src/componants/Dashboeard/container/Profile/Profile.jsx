import "./profile.css";
import Profile_back from "../../../../pictures/profile_back.png";
import Profile_pic from "../../../../pictures/avatar_profile.png";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Twitter from "../../../../pictures/twitter.png";
import Location from "../../../../pictures/location.png";
import User_info from "./User_info/User_info";

import Facebook from "../../../../pictures/facebook.png";

function Profile(props) {
  const [twitter_data, setTwitter_data] = useState();
  const [facebook_data, setFacebook_data] = useState();
  const [address_data, setAddress_data] = useState();
  const [articles_saved, setArticles] = useState([]);

  function get_data_from_child(data) {
    setTwitter_data(data.twitter);
    setFacebook_data(data.facebook);
    setAddress_data(data.address);
  }

  useEffect(() => {
    axios
      .post("http://localhost/ReactProjects/pfe/src/get_saved_articles.php", {
        name: props.data.name,
      })
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors that occur during registration
      });
  }, []);

  return (
    <>
      <img src={Profile_back} />
      <div className="user_container">
        <div className="user_info">
          <div className="full_name">{props.data.name}</div>

          <div className="social">
            <div className="tag">
              <img src={Twitter} /> {twitter_data}
            </div>
            <div className="tag">
              <img src={Facebook} /> {facebook_data}
            </div>
            <div className="tag">
              <img src={Location} /> {address_data}
            </div>
          </div>
        </div>
        <img className="profile_avatar" src={Profile_pic} />
      </div>
      <div className="cont2">
        <div className="side__"></div>
        <div className="main_">
          <div className="aricles_">
            {articles_saved.map((article_, id) => (
              <div className="article_" key={id}>
                {article_.title}
              </div>
            ))}
          </div>
          <div className="cont3">
            <User_info
              data={props.data}
              data_send={get_data_from_child} // pass the callback function as a prop
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
