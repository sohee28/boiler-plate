import axios from "axios";
import React from "react";

function LandingPage(props) {
  const onLogoutHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("Failed to logout");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      Landingpage
      <button onClick={onLogoutHandler}>Logout</button>
    </div>
  );
}

export default LandingPage;
