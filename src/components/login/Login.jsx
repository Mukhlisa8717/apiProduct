import React from "react";
import { useGetInputValue } from "../../hooks/useGetInputValue";
import { useCreateUserMutation } from "../../context/api/userApi";
import Model from "../model/Model";
import './Login.scss'

const initialState = {
  UserName: "",
  password: "",
};

const Login = ({ setLoginModel }) => {
  const { formData, handleChange, setFormData } =
    useGetInputValue(initialState);
  const [createUser, { isLoading, error }] = useCreateUserMutation();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUser(formData).unwrap();
      localStorage.setItem("x-auth-token", data.token);
      localStorage.setItem("user-data", JSON.stringify(data.user));
    } catch (err) {
      console.error("Failed to log in:", err);
    }
  };

  const closeLoginModel = () => {
    setLoginModel(false);
  };

  return (
    <Model close={closeLoginModel}>
      <form onSubmit={handleLogIn} className="login">
        <h2>Login</h2>
        <input
          value={formData.UserName}
          onChange={handleChange}
          name="UserName"
          type="text"
          placeholder="Your username"
        />
        <input
          value={formData.password}
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Your password"
        />
        <button disabled={isLoading}>Login</button>
        {error && <div>Error: {error.message}</div>}
      </form>
    </Model>
  );
};

export default Login;
