import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from "../ContextProvider/Context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  console.log("logindata", logindata)
  const [data, setData] = useState(false);
  const history = useNavigate();

  const DashBoardValid = async () => {
    const token = JSON.parse(localStorage.getItem("BMIUserToken"));

    const res = await fetch("http://localhost:8009/validuser", {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!data || data.status === 401) {
      console.log("error page redirect");
    } else {
        console.log("user verify");
      // setLoginData(data);
      history("/home");
    }
  };

  useEffect(() => {
      DashBoardValid();
      setData(true);
  }, []);
  return (
    <div>
      Home
    </div>
  )
}

export default Home
