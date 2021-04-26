import React, { Fragment } from "react";
import "./Home.scss";
import { authenticate, addTask, fetchTask, removeTask } from "../api_calls";
import backend_host from "../host";
import Tasks from "./Tasks";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      username: "",
      loading: true,
    };
  }

  componentDidMount = async () => {
    document.body.style.background = "#DAECFC";

    // Redirects to login page if the user is not authenticated.
    const auth_successful = await authenticate(backend_host);
    if (auth_successful === false) {
      this.props.history.push("/login");
    }
    this.setState({ username: auth_successful });

    // Now that we know the user is authenticated, we can fetch their tasks from the database
    const fetched_tasks = await fetchTask(backend_host, {
      username: auth_successful,
    });
    this.setState({ notes: fetched_tasks, loading: false });
    return;
  };

  // Removing the JWT when signing out a user
  handleSignOut = (event) => {
    try {
      localStorage.removeItem("token");
      this.props.history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // When a user clicks the plus icon, the modal will appear.
  showModal = () => {
    let modal = document.getElementById("myModal");
    modal.style.display = "flex";
  };

  // When a user clicks the 'X' icon or the 'add task' button, the modal will disappear.
  removeModal = (event) => {
    let modal = document.getElementById("myModal");
    let close_icon = document.getElementsByClassName("close")[0];
    if (event.target == modal || event.target == close_icon)
      modal.style.display = "none";
  };

  // Will add a task inside the database and display the newly added task to the user
  addTask = async (event) => {
    try {
      // Getting the task text from the HTML element
      const task_message = document.getElementById("task");
      const task_message_text_temp = task_message.value;
      const task_message_text = task_message_text_temp.replace(/[\r\n]+/g, " ");
      task_message.value = "";

      // Closing the Modal
      let modal = document.getElementById("myModal");
      modal.style.display = "none";

      // Checking for the case where the string the user has entered is only whitespace or empty.
      if (
        !task_message_text_temp.replace(/\s/g, "").length ||
        task_message_text_temp == ""
      ) {
        return;
      }

      // Using an API I made to add the task to the database and send back a confirmation that it was inserted.
      const addTask_successful = await addTask(backend_host, {
        username: this.state.username,
        task: task_message_text,
      });

      // If we have successfully inserted a task inside the database, add the task to the user's screen.
      if (addTask_successful == true) {
        let messages = this.state.notes;
        messages.push(task_message_text);
        this.setState({ notes: messages });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Removes a user's task from the database and updates it on the screen
  removeTask = async (event) => {
    try {
      //Deleting the task from the database
      const deleted_task = event.target.innerText;
      const removeTask_successful = await removeTask(backend_host, {
        username: this.state.username,
        removed_task: deleted_task,
      });

      // Deleting the task from the user's screen
      if (removeTask_successful == true) {
        let old_list = this.state.notes;
        let new_list = old_list.filter((item) => item !== deleted_task);
        this.setState({ notes: new_list });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // Storing a list of the user's task so it can be displayed on their screen.
    let list_of_tasks = this.state.notes;
    let displayed_tasks = [];
    for (let i = 0; i < list_of_tasks.length; i++) {
      displayed_tasks.push(
        <Tasks
          key={i}
          task_text={list_of_tasks[i]}
          date="1/1/21"
          time="2:00pm"
          removeTask={this.removeTask}
        />
      );
    }

    return (
      <Fragment>
        <div id="myModal" className="modal" onClick={this.removeModal}>
          <div className="modal-content">
            <span className="close" onClick={this.removeModal}>
              &times;
            </span>
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
          <div className="notes-list">{displayed_tasks}</div>
        </section>
        <div className="loading-icon">
          {this.state.loading ? (
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : null}
        </div>
      </Fragment>
    );
  }
}

export default Home;
