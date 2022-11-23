import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import App from "../containers/App";
import NewCustomer from "../containers/NewCustomer";
import Restricted from "../containers/Restricted";

const RouterPath = () => {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path = "/" element={<App/>} />
        <Route path = "/new" element={<NewCustomer/>} />
        <Route path = "/login" element={<Restricted/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterPath;
