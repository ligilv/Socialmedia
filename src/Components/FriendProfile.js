import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./Parent";
const FriendProfile = () => {
  const [frnd, setFrnd] = useState("");
  // const [mydata, setmydata] = useState();
  const [frndData, setFrndData] = useState();
  const [friendPost, setFriendPost] = useState();
  const [searchClicked, setSearchClicked] = useState(false);
  const [requestBtn, setRequestBtn] = useState(false);
  const datas = useContext(UserContext);
  const [isFriend, setFriend] = useState();
  useEffect(() => {
    // console.log("datas", datas);
    // console.log(frndData.data.user.name);
    console.log("loaed");
    console.log(datas);
  }, []);

  const sendRequest = () => {
    console.log("sennt");
    axios
      .post(
        `http://localhost:5000/api/users/sendrequest/`,
        {
          friendName: frnd,
        },
        {
          headers: {
            "authentication-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => console.log(res));
  };
  const searchFrnd = () => {
    console.log(datas);
    axios
      .get(`http://localhost:5000/api/users/byname/${frnd}`, {
        headers: {
          "authentication-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setFrndData(res);

        if (res.data.length == 0) {
          setSearchClicked(false);
        } else {
          setFriendPost(res.data[0].post);
          setSearchClicked(true);
          console.log(friendPost);
          if (res.data[0].friends.includes(datas.data.user.name)) {
            console.log("u r friends");
          } else {
            console.log("no");
            setRequestBtn(true);
          }
        }
      });
  };
  return (
    <div>
      <div
        className="searchBar"
        style={{ display: "flex", height: "50px", justifyContent: "center" }}
      >
        <input
          type="text"
          placeholder="search for frnds"
          onChange={(e) => {
            setFrnd(e.target.value);
          }}
        />
        <button onClick={searchFrnd}>search</button>
      </div>
      hi {datas.data.user.name}
      {requestBtn ? (
        <div>
          <button onClick={sendRequest}>Sendrequest</button>
        </div>
      ) : (
        "noo"
      )}
      {searchClicked ? (
        <div>
          <h1>Showing all posts of</h1>
          {friendPost.map((data, i) => {
            return (
              <div style={{ border: "2px red solid" }} key={i}>
                <h3>{data.postText}</h3>
                <h6>
                  <button>Likes</button>: {data.likes.length}
                </h6>
              </div>
            );
          })}
        </div>
      ) : (
        <div>no search</div>
      )}
    </div>
  );
};

export default FriendProfile;
