import React, { Fragment } from "react";
import "./Landing.scss";
import checklist from "./images/checklist.png";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSignIn = () => {
    console.log("Hello world");
  };

  render() {
    return (
      <>
        <header className="header">
          <nav className="nav">
            <ul className="ul">
              <li className="li">
                <button onClick={this.handleSignIn} className="logo-text">
                  NeedToDo
                </button>
              </li>
              <li className="li">
                <button onClick={this.handleSignIn} className="sign-in">
                  Sign In
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <div class="main-body">
          <img src={checklist} alt="checklist" className="checklist-img" />
          <section className="sign-in-section">
            <div>
              <h1 class="catch">Start doing what you</h1>
              <h3 class="subcatch">
                A simple web app that lets you add and complete tasks.
              </h3>
            </div>

            <div>
              <form onSubmit={this.handleSubmit} className="sign-in-info">
                <label>
                  <input
                    type="text"
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.handleChange}
                    className="input-style"
                  />
                </label>
                <label>
                  <input
                    type="text"
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
