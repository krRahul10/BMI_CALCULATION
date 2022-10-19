import React, { useState } from "react";
import { NavLink, useNavigate,  } from "react-router-dom";
import "./mix.css";

const Login = () => {
  const history = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [inpVal, setInpVal] = useState({
    email: "",
    password: "",
  });
  // console.log(inpVal);

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpVal(() => {
      return {
        ...inpVal,
        [name]: value,
      };
    });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = inpVal;

    if (email === "") {
      alert("please enter your email");
    } else if (!email.includes("@")) {
      alert("please enter valid email");
    } else if (password === "") {
      alert("please enter your password");
    } else if (password.length < 4) {
      alert("password must be 4 char");
    } else {
     
      const res = await fetch("http://localhost:8009/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      // console.log("Whole data", data);

      if (res.status === 201) {
        console.log("token",data.result.token)
        alert("User Login Successfully Done");
        localStorage.setItem(
          "BMIUserToken",
          JSON.stringify(data.result.token)
        );
        history("/home");
        setInpVal({ ...inpVal, email: "", password: "" });
       
      }
    }
  };
  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. please login</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={inpVal.email}
                onChange={setVal}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  value={inpVal.password}
                  onChange={setVal}
                  placeholder="Enter Your Password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginUser}>
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to="/register">Sign Up</NavLink>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
