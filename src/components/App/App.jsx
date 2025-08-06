import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "./Routes/Routes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { getCategories } from "../../features/categories/categoriesSlice";

import { makeServer } from "../../mirage/server";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;