import React from "react";
import { Navigate } from "react-router-dom";

const UserProtect = (props) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      return props.children;
    } else {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.log(error.message);

  }
};

export default UserProtect;
