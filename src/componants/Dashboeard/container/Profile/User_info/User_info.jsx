import { useState, useEffect } from "react";
import axios from "axios";
import "./user_info.css";

function User_info(props) {
  const [user_all_data, setUserdata_all] = useState();
  const [twitter, setTwitter] = useState();
  const [facebook, setFacebook] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState(props.data.email);
  const [Info_form, setInfo_form] = useState("show");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost/ReactProjects/pfe/src/users_by_name.php?name=${props.data.name}`
      );
      const data = response.data;
      console.log(data);
      setUserdata_all(data[0]);
      setAddress(data[0].address);
      setEmail(data[0].email);
      setFacebook(data[0].facebook);
      setTwitter(data[0].twitter);
      props.data_send(data[0]);
    };
    fetchData();
  }, []);

  function change_to_edit() {
    setInfo_form("edit");
  }

  function change_to_show() {
    axios
      .post("http://localhost/ReactProjects/pfe/src/edit_info.php", {
        name: props.data.name,
        email: email,
        twitter: twitter,
        facebook: facebook,
        address: address,
      })
      .then((response) => {
        const userData = {
          address: response.data.address,
          email: response.data.email,
          facebook: response.data.facebook,
          twitter: response.data.twitter,
        };
        setAddress(userData.address);
        setEmail(userData.email);
        setFacebook(userData.facebook);
        setTwitter(userData.twitter);
        setUserdata_all(userData);
        props.data_send(userData); // Move this line here
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors that occur during registration
      });

    setInfo_form("show");
  }

  return (
    <>
      <h2>User Information</h2>
      {Info_form === "show" ? (
        <>
          <div className="part_info">
            <div className="info_header">Full Name</div>
            <div className="info_val">{props.data.name}</div>
          </div>
          <div className="part_info">
            <div className="info_header">Email</div>

            <div className="info_val">{email}</div>
          </div>
          <div className="part_info">
            <div className="info_header">Address</div>
            <div className="info_val">{address}</div>
          </div>
          <div className="part_info">
            <div className="info_header">Facebook username</div>
            <div className="info_val">{facebook}</div>
          </div>
          <div className="part_info">
            <div className="info_header">Twitter username</div>
            <div className="info_val">{twitter}</div>
          </div>
          <button className="modify_bu" onClick={change_to_edit}>
            <h3>Modify Info</h3>
          </button>
        </>
      ) : (
        <>
          <div className="part_info">
            <div className="info_header">Full Name</div>
            <div className="info_val">
              <input
                value={props.data.name}
                type="text"
                placeholder="Email"
                readOnly
              />
            </div>
          </div>
          <div className="part_info">
            <div className="info_header">Email</div>
            <div className="info_val">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="part_info">
            <div className="info_header">Address</div>
            <div className="info_val">
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Adresse"
              />
            </div>
          </div>
          <div className="part_info">
            <div className="info_header">Facebook username</div>
            <div className="info_val">
              {" "}
              <input
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                type="text"
                placeholder="Facebook"
              />
            </div>
          </div>
          <div className="part_info">
            <div className="info_header">Twitter username</div>
            <div className="info_val">
              {" "}
              <input
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                type="text"
                placeholder="Twitter"
              />
            </div>
          </div>
          <button className="modify_bu" onClick={change_to_show}>
            <h3>Save</h3>
          </button>
        </>
      )}
    </>
  );
}

export default User_info;
