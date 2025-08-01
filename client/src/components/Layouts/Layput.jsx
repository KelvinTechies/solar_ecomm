import React, { useEffect } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import useLoggedInUser from "../../services/app";

function Layput() {
  const { auth, getLoggedInUser } = useLoggedInUser();
  useEffect(() => {
    getLoggedInUser(); 
  }, [getLoggedInUser]);
  return (
    <>
      <SideBar />
      <main className="dashboard-main">
        <NavBar /> 
        <Outlet />
      </main>
    </>
  ); 
}

export default Layput;
 