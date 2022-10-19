import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./mix.css";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(inpval);

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };
  const sendData = async (e) => {
    try {
      e.preventDefault();
      const { name, email, password } = inpval;

      const res = await fetch("http://localhost:8009/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (data.status === 422 || !data) {
        alert("Data is Not Present");
      } else {
        // toast.success("User Register Successfully 😃!", {
        //   position: "top-center",
        // });
        alert("User Register Successfully");

        setInpval({
          ...inpval,
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div>
      <div>
        <section>
          <div className="form_data">
            <div className="form_heading">
              <h1>Sign Up</h1>
              <p style={{ textAlign: "center" }}>
                We are glad that you will be using Project Cloud to manage your
                tasks!We hope that you will get like it.
              </p>
            </div>

            <form>
              <div className="form_input">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={inpval.name}
                  onChange={setVal}
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="form_input">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={inpval.email}
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
                    value={inpval.password}
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

              <button className="btn" onClick={sendData}>
                Sign UP
              </button>
              <p>
                Already have an account? <NavLink to="/login">Log in</NavLink>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
