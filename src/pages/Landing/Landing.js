import React, { Fragment } from "react";
import "./Landing.scss";
import checklist from "../images/checklist.png";
import { Link } from "react-router-dom";
import backend_host from "../host";
import { authenticate, register } from "../api_calls";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      taken_username: false,
    };
  }

  // Redirects to home page if the user is authenticated.
  componentDidMount = async () => {
    const auth_successful = await authenticate(backend_host);
    if (auth_successful === true) {
      this.props.history.push("/home");
    }
    return;
  };

  // Changes state and input value
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Sends a POST request to the server register a user.
  handleRegister = async (event) => {
    event.preventDefault();
    try {
      const curr_state = this.state;
      const register_successful = await register(backend_host, curr_state);
      const token = register_successful;
      if (register_successful) {
        localStorage.setItem("token", token);
        this.props.history.push("/home");
        return;
      }
      this.setState({ taken_username: true });
      return;
    } catch (error) {
      console.log(error);
      this.setState({ taken_username: true });
    }
  };

  render() {
    return (
      <>
        <header className="header">
          <nav className="nav">
            <ul className="ul">
              <li className="li">
                <button className="logo-text">NeedToDo</button>
              </li>
              <li className="li">
                <Link to="/login" className="sign-in">
                  Sign In
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="main-body">
          <img src={checklist} alt="checklist" className="checklist-img" />
          <section className="sign-in-section">
            <div>
              <h1 className="catch">Start doing what you</h1>
              <h3 className="subcatch">
                A simple web app that lets you add and complete tasks.
              </h3>
            </div>

            <div>
              <form onSubmit={this.handleRegister} className="sign-in-info">
                {this.state.taken_username ? (
                  <h4
                    style={{
                      color: "red",
                      margin: "10px",
                      fontWeight: "bolder",
                    }}
                  >
                    That username is taken. Try another
                  </h4>
                ) : null}

                <label>
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.handleChange}
                    className="input-style"
                  />
                </label>

                <label>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.handleChange}
                    className="input-style"
                  />
                </label>
                <input
                  type="submit"
                  value="Become productive"
                  className="submit-style"
                />
              </form>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Landing;
