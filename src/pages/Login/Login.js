import React, { Fragment } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import backend_host from "../host";
import { login, authenticate } from "../api_calls";

axios.defaults.withCredentials = true;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      incorrect_pw: false,
    };
  }

  // Redirects to home page if the user is authenticated.
  componentDidMount = async () => {
    document.body.style.background = "#71ff7f";
    const auth_successful = await authenticate(backend_host);
    if (auth_successful === true) {
      console.log("We are pushing the user to the home page");
      this.props.history.push("/home");
    }
    return;
  };

  // Sends a POST request to the server to login a user.
  handleLogin = async (event) => {
    event.preventDefault();
    try {
      const curr_state = this.state;
      const login_successful = await login(backend_host, curr_state);
      const token = login_successful;
      console.log(token);
      if (login_successful) {
        localStorage.setItem("token", token);
        this.props.history.push("/home");
        return;
      }
      this.setState({ incorrect_pw: true });
      return;
    } catch (error) {
      console.log(error);
      this.setState({ incorrect_pw: true });
    }
  };

  // Updates state
  handleChange = (event) => {
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
            {this.state.incorrect_pw ? (
              <h4
                style={{
                  color: "red",
                  margin: "10px",
                  fontWeight: "bolder",
                }}
              >
                Incorrect username/password. Please try again.
              </h4>
            ) : null}
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
