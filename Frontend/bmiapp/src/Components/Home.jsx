import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from "../ContextProvider/Context";
import { NavLink, useNavigate } from "react-router-dom";
import './mix.css'

const Home = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  console.log("logindata", logindata)
  const [data, setData] = useState(false);
  const history = useNavigate();

  const DashBoardValid = async () => {
    const token = JSON.parse(localStorage.getItem("BMIUserToken"));
    console.log("token from local", token)

    const res = await fetch("http://localhost:8009/validuser", {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("data from valid page", data)

    if (!data || data.status === 401) {
      // console.log("error page redirect");
      alert("Invalid User Need Token")
    } else {
        console.log("user verify", data);
      setLoginData(data);
      history("/home");
    }
  };

  let calcBmi = (event) => {
    //prevent submitting
    event.preventDefault()

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      let bmi = (weight / (height * height) * 703)
      setBmi(bmi.toFixed(1))

      // Logic for message

      if (bmi < 25) {
        setMessage('You are underweight')
      } else if (bmi >= 25 && bmi < 30) {
        setMessage('You are a healthy weight')
      } else {
        setMessage('You are overweight')
      }
    }
  }
  useEffect(() => {
      DashBoardValid();
      // setData(true);
  }, []);
  let reload = () => {
    window.location.reload()
  }
  return (
    <>
    Home page
    <div className="Calculator">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (in)</label>
            <input value={height} onChange={(event) => setHeight(event.target.value)} />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' onClick={reload} type='submit'>Reload</button>
          </div>
        </form>

        <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>

        {/* <div className='img-container'>
          <img src={imgSrc} alt=''></img>
        </div> */}
      </div>
    </div>
    </>
    // <div>
    //   <div>
    //   {data ? (
    //     <>
    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItem: "center",
    //           margin: "30px 0px 0px 35%",
    //         }}
    //       >
    //         <h1>User Email: {logindata ? logindata.validUserOne.email : ""}</h1>
    //       </div>
    //     </>
    //   ) : (
    //     <>
    //      Please login your Account
    //      <NavLink to="/" style={{ marginRight: "30px" }}>
    //         Login
    //       </NavLink>
    //     </>
    //   )}
    // </div>
    // </div>
  )
}

export default Home
