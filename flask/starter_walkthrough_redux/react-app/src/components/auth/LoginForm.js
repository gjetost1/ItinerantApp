import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = async(e) => {
    e.preventDefault()
    await dispatch(login("demo@aa.io", "password"))
    history.push("/")
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div style={{marginBottom:"auto", width:"24vw",}}>
      <form onSubmit={onLogin} style={{textAlign:"right"}}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="email"></label>
          <input
            className="text-white" style={{fontSize:"3vh", float:"left", marginLeft:"4vw", marginTop:"2vh"}}
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input

            className="text-white" style={{fontSize:"3vh", float:"left", marginLeft:"4vw", marginTop:"1vh"}}
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <button style={{margin:"1vh", width:"24w", marginRight:"9vw"}} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black hover:text-yellow-500  bg-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" type="submit">Login</button>
        </div>
      </form>

      <div style={{display:"flex", flexDirection:"column", float:"left", marginBottom:"auto"}}>
        <button style={{margin:"1vh", width:"24vw"}} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-gray-900 hover:text-yellow-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" onClick={()=>window.location=`/sign-up`}>Sign Up </button>
        <button style={{margin:"1vh", width:"24vw"}} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-gray-900 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" onClick={demoLogin}>Demo User </button>
      </div>
    </div>
  );
};

export default LoginForm;
