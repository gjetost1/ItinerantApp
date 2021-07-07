import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-yellow-500 bg-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" style={{textAlign:"right", marginTop:"1vh"}}>Logout</button>;
};

export default LogoutButton;
