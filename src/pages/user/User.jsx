import React from "react";
import "./User.scss";

const User = () => {
  const userData = JSON.parse(localStorage.getItem("user-data"));
  console.log(userData);
  return (
    <main>
      <div className="user">
        <h1>My information</h1>
        <hr />
        <h2>First Name: {userData.FirstName}</h2>
        <h2>Last Name: {userData.LastName}</h2>
        <h2>Username: {userData.UserName}</h2>
        <h2>
          Phone: {userData.phones[0]} | {userData.phones[1]}
        </h2>
      </div>
    </main>
  );
};

export default User;
