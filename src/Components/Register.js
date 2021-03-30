import React, { useState } from "react";
import axios from "axios";
import { Route, Switch, Link, useHistory } from "react-router-dom";
function Register() {
  let history = useHistory();
  const [name, setname] = useState("");
  const [lastName, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const formsubmit = () => {
    axios
      .post("http://localhost:5000/api/users/register", {
        email: email,
        password: password,
        name: name,
        lastName: lastName,
        userName: userName,
      })
      .then((res) => {
        if (res.data === "saved") {
          history.push("login");
        }
      });
  };

  return (
    <div>
      <label>name</label>
      <br />
      <input
        type="text"
        placeholder="name please"
        onChange={(e) => setname(e.target.value)}
      />
      <br />
      <label>lastname</label>
      <br />
      <input
        type="text"
        placeholder="lastname please"
        onChange={(e) => setlastname(e.target.value)}
      />
      <br />
      <label>email</label>
      <br />
      <input
        type="email"
        placeholder="email please"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label>password</label>
      <br />
      <input
        type="password"
        placeholder="password please"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <label>username</label>
      <br />
      <input
        type="username"
        placeholder="username please"
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <input type="submit" onClick={formsubmit} />
    </div>
  );
}

export default Register;
