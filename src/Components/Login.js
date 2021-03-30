import React, { useState, useEffect } from "react";
import axios from "axios";
function Login({
  email,
  password,
  logged,
  setLogged,
  login,
  setEmail,
  setPassword,
}) {
  return (
    <div>
      <div className="loginWrapper">
        <label>email</label>
        <input
          type="text"
          placeholder="email here"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>password</label>
        <input
          type="password"
          placeholder="passwrod please"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" onClick={login} />
      </div>
    </div>
  );
}

export default Login;
