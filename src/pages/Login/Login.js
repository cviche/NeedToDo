import React, { Fragment } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import backend_host from "../host";
import { login, authenticate } from "../api_calls";

axios.defaults.withCredentials = true;
// let history = useHistory();
// document.body.style.backgroundColor = "green";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  // Redirects to login page if the user is authenticated.
  componentDidMount = async () => {
    console.log("Hello world.");
    const auth_successful = await authenticate(backend_host);
    console.log(auth_successful);
    if (auth_successful === true) {
      // thishistory.pushState("/home");
      this.props.history.push("/home");
      console.log("We are pushing the user to the home page");
    } else console.log("Bad");
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
        console.log("LOGIN: You have successfully logged in.");
        localStorage.setItem("token", token);
        return;
      }

      console.log("An error has occured");
      return;
    } catch (error) {
      console.log(error);
    }
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
