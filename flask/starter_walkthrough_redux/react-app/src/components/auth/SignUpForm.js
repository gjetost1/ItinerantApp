import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';



const SignUpForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  if (user) history.push('/');

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password))
        .catch(async (res) => {
          const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    };
    return setErrors(['Oops, your passwords dont match...']);
  }

  function hider() {
    let btn = document.getElementById("but")
    if (btn.style.display === "none") {
      btn.style.display = "block";
    } else {
      btn.style.display = "none"
    }
  }


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp} style={{textAlign:"center"}}>
      <div>
      {errors.map((error, i) => <li id="but" className="text-white" style={{fontSize:"3vh"}} key={i}>{error} <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style={{fontSize:"3vh", marginTop:"1vh"}} onClick={hider} >x</button></li>)}
      </div>
      <div>
        <label className="text-white" style={{fontSize:"3vh"}}>User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label className="text-white" style={{fontSize:"3vh"}}>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label className="text-white" style={{fontSize:"3vh"}}>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label className="text-white" style={{fontSize:"3vh"}}>Confirm Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style={{fontSize:"3vh", marginTop:"1vh"}}  type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
