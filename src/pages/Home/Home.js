import React, { Fragment } from "react";
import "./Home.scss";
import { authenticate } from "../api_calls";
import backend_host from "../host";
import Tasks from "./Tasks";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [{ task: "Need to go swimming", date: "4/27/21", time: "8:50pm" }],
      username: "",
    };
  }

  // Redirects to login page if they are not authenticated.
  componentDidMount = async () => {
    document.body.style.background = "#DAECFC";
    const auth_successful = await authenticate(backend_host);
    console.log("The user we have found is:", auth_successful);
    if (auth_successful === false) {
      console.log("We are pushing the user to the home page");
      this.props.history.push("/login");
    }
    this.setState({ username: auth_successful });
    console.log("cdm done");
    console.log(this.state);
    return;
  };

  handleSignOut = (event) => {
    try {
      localStorage.removeItem("token");
      this.props.history.push("/login");
    } catch (error) {
      console.log(error);
      console.log(
        "There was an error when trying to sign out. Please try again"
      );
    }
  };

  showModal = () => {
    console.log("You have clicked the add button!");
    let modal = document.getElementById("myModal");
    console.log(modal);
    modal.style.display = "flex";
  };

  removeModal = (event) => {
    console.log("You have clicked the modal!");
    let modal = document.getElementById("myModal");
    let close_icon = document.getElementsByClassName("close")[0];
    console.log(modal);
    if (event.target == modal || event.target == close_icon)
      modal.style.display = "none";
  };

  addTask = (event) => {
    try {
      console.log("hello");
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
    } catch {}
  };

  render() {
    return (
      <Fragment>
        <div id="myModal" className="modal" onClick={this.removeModal}>
          <div className="modal-content">
            <span className="close" onClick={this.removeModal}>
              &times;
            </span>
            {/* <input type="text" placeholder="Enter a task" /> */}
            <textarea
              name="new_task"
              id="task"
              cols="30"
              rows="10"
              placeholder="Enter a new task"
            ></textarea>
            <button className="add-task-button" onClick={this.addTask}>
              Add task
            </button>
          </div>
        </div>
        <header>
          <nav className="home-nav">
            <div></div>
            <ul className="home-ul">
              <li className=""></li>
              <li className="add-icon" onClick={this.showModal}>
                +
              </li>
              <li className="sign-out-button">
                <button
                  className="sign-out-button"
                  onClick={this.handleSignOut}
                >
                  Sign out
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <section className="notes-section">
          <div>
            {" "}
            {this.state.notes == false ? (
              <div style={{ margin: "14px" }}>
                You have currently have no tasks. Click the “+” icon above to
                add a task
              </div>
            ) : (
              <div style={{ margin: "14px" }}>
                Click the task to mark it as done.
              </div>
            )}
          </div>
          <Tasks task_text="Hello World!" date="1/1/21" time="2:00pm" />
        </section>
      </Fragment>
    );
  }
}

export default Home;
