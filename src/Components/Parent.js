import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import FriendProfile from "./FriendProfile";
export const UserContext = createContext();
function Parent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState();
  let history = useHistory();
  const toLogin = () => {
    history.push("login");
  };
  const login = () => {
    axios
      .post("http://localhost:5000/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (!password) {
          alert("enterpwd");
        }
        if (res.data.logged) {
          setLogged(true);
          setUserData(res);
          console.log("log is ", logged);
          localStorage.setItem("token", res.data.token);
          history.push("home");
        }
      });
  };

  return (
    <div>
      <h2>Welcome to socia mediaa app</h2>
      <a onClick={toLogin}>Login</a>
      <UserContext.Provider value={userData}>
        <Route exact path="/login">
          <Login
            email={email}
            setEmail={setEmail}
            setPassword={setPassword}
            password={password}
            logged={logged}
            setLogged={setLogged}
            login={login}
          />
        </Route>
        <Route exact path="/Home">
          <Home />
        </Route>
        <Route exact path="/friend">
          <FriendProfile />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </UserContext.Provider>
    </div>
  );
}

export default Parent;
