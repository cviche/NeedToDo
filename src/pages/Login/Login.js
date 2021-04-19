import React, { Fragment } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import backend_host from "../host";

axios.defaults.withCredentials = true;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleLogin = (event) => {
    event.preventDefault();

    console.log(backend_host);
    console.log(this.state);
    axios
      .post(`${backend_host}/login`, this.state, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        console.log(token);
        localStorage.setItem("token", token);
        console.log("Frontend: Successfully stored token in local storage.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handleChange;
  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Fragment>
        <section className="title-container">
          <Link to="/" className="title-text">
            NeedToDo
          </Link>
          <form className="form-container" onSubmit={this.handleLogin}>
            <input
              type="text"
              name="username"
              className="input-style"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              className="input-style"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input type="submit" value="Login" className="login-button" />
          </form>
        </section>
      </Fragment>
    );
  }
}
export default Login;
