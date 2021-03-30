import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";

function Home() {
  const [post, setPost] = useState([]);
  const [userName, setUserName] = useState("");
  const [createPost, setCreatePost] = useState("");
  const [postMade, setpostMade] = useState(true);
  const [request, setrequest] = useState([]);

  const [isfrnd, setIsFrnd] = useState("false");
  let history = useHistory();

  const logout = () => {
    history.push("login");
    localStorage.clear();
  };
  const addfriend = (e) => {
    console.log(e.target.value);
    axios
      .post(
        `http://localhost:5000/api/users/accept/`,
        {
          frndtobe: e.target.value,
        },
        {
          headers: {
            "authentication-token": localStorage.getItem("token"),
          },
        }
      )
      .then(() => console.log("accepted"));
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/post/getpost", {
        headers: {
          "authentication-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setrequest(res.data.allPost.requests);
        if (res.data.allPost.post.length == 0) {
          console.log("empty");
          setUserName(res.data.allPost.name);
        } else {
          setPost(res.data.allPost.post);

          setUserName(res.data.allPost.name);
        }
      });
  }, [postMade]);
  const clickPost = () => {
    console.log(request);
    setpostMade(!postMade);
    axios.post(
      "http://localhost:5000/api/post/createPost",
      {
        postText: createPost,
      },
      {
        headers: {
          "authentication-token": localStorage.getItem("token"),
        },
      }
    );
  };
  const clickSearch = () => {
    history.push("friend");
  };
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <div>Hello : {userName}</div>
      <button onClick={clickSearch}>Search frnd</button>
      <div>
        <input
          type="text"
          placeholder="Please add post"
          style={{ width: "30%", height: "100px" }}
          onChange={(e) => setCreatePost(e.target.value)}
        />
        <button onClick={clickPost}>createpost</button>
        <div className="yourRequests">
          request:
          {request.map((names, i) => {
            return (
              <ol key={i}>
                <li>
                  {names}{" "}
                  <button onClick={addfriend} value={names}>
                    addfrnd
                  </button>
                </li>
              </ol>
            );
          })}
        </div>
      </div>
      <div>
        <h1>Showing all posts of {userName}</h1>
        {post.map((data, i) => {
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
    </div>
  );
}

export default Home;
