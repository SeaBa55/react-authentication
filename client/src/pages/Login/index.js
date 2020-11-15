import React, { useState, useEffect } from "react";
import { useAuth } from "../../components/UserAuth";
import API from "../../utils/API";
import history from "../../utils/history";

function Login() {
  let auth = useAuth();
  const [formState, setFormState] = useState({
    username: "",
    password: ""
  });
  const handleInputChange = event => {
    event.preventDefault();
    const id = event.currentTarget.id;
    const value = event.target.value.trim();
    setFormState((prevState) => {
      return { ...prevState, [id] : value}
    });
  };

  const handleKeyDown = event => {
    event.preventDefault();
    if (event.key === 'Enter') {
      handleSubmit(event);
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formState.username !== "" && formState.password !== "") {
      API.userLogIn({
        username: formState.username,
        password: formState.password
      })
        .then((res) => {
          console.log(res.data)
          auth.login(() => { history.push("/game") }, res.data)
        })
        .catch(err => {
            console.log(err);
            console.log(err.toJSON());
          // Need to come up with login error handling
          //   setFormState((prevState) => {
          //     return { ...prevState, ['password'] : ''}
          //   });
          // }
        });
    };
  };

  return (
    <>
      <div className="display-4 mb-1">Log In</div>
      <div className="customDivTwo">
        <div id="codaFont" className="form-group">
          <label id="customFont" htmlFor="username">Username</label>
          <input type="username" className="form-control" id="username" value={formState.username} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="user123" />
        </div>

        <div className="form-group">
          <label id="customFont" htmlFor="password">Password</label>
          <input type="password" className="form-control" value={formState.password} onChange={handleInputChange} onKeyDown={handleKeyDown} id="password" />
        </div>
      </div>
      <button
        className="btn btn-info btn-block"
        type="button"
        onClick={() => {
          history.push("/");
        }}
      >
        Rules
      </button>
      <button 
        type="submit" 
        className="btn btn-info btn-block"
        onClick={handleSubmit}
        >
          Login
      </button>
      <button
        className="btn btn-info btn-block"
        type="button"
        onClick={() => {
          history.push("/signup");
        }}
      >
        Sign Up
      </button>
    </>
  );
}

// function Login() {
//   return (
//     <>
//       <div className="display-4 mb-1">Login</div>
//       <button
//         className="btn btn-info btn-block"
//         type="button"
//         onClick={() => {
//           history.push("/");
//         }}
//       >
//         Rules
//       </button>
//       <button
//         className="btn btn-info btn-block"
//         type="button"
//         onClick={() => {
//           history.push("/signup");
//         }}
//       >
//         Sign Up
//       </button>
//     </>
//   );
// }

export default Login;