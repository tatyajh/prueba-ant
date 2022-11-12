import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import App from "../containers/App";
import NewCustomer from "../containers/NewCustomer";


const RouterPath = () => {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path = "/" element={<App/>} />
        <Route path = "/new" element={<NewCustomer/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterPath;
