import axios from "axios";

// This function makes sure that the user has a JWT which will let them stay on the website.
// Otherwise, they will get redirected to the login page.
export const authenticate = async (backend_host) => {
  try {
    // Making sure the JWT exists
    const token = localStorage.getItem("token");
    console.log(token);
    if (token === null) {
      console.log("A token does not exist");
      return false;
    }

    // Making sure the JWT is valid.
    const auth_successful = await axios.get(`${backend_host}/authenticate`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Let the user know the JWT is valid
    if (auth_successful.status == 200) return auth_successful.data.user;

    // Let the user know the JWT is invalid.
    return false;
  } catch (error) {
    return false;
  }
};

// Logs in a user if the credentials are correct.
export const login = async (backend_host, state) => {
  try {
    const res = await axios.post(`${backend_host}/login`, state, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Returns a JWT so the frtonend can store it in the client's browser.
    return res.data.token;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Registers a user to the database
export const register = async (backend_host, state) => {
  try {
    console.log(backend_host);
    console.log(backend_host);
    console.log(backend_host);
    console.log(backend_host);
    console.log(backend_host);
    const res = await axios.post(`${backend_host}/register`, state, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Returns JWT so the frontend can store it in the client's browser.
    return res.data.token;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//Adds a task for the user that will be stored in the database.
export const addTask = async (backend_host, state) => {
  try {
    const add_task_successful = await axios.post(
      `${backend_host}/addTask`,
      state,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // If the task was stored in the database successfully, let the frontend know.
    if (add_task_successful.status == 200) {
      return true;
    }

    // The task was not stored in the database.
    return false;
  } catch (error) {
    return false;
  }
};

//Adds a fetch tasks for the user
export const fetchTask = async (backend_host, state) => {
  try {
    // Fetch list of tasks from the database.
    const fetch_task_successful = await axios.post(
      `${backend_host}/fetchTask`,
      state,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // If we have succesfully got the list of tasks, send those tasks to the frontend
    if (fetch_task_successful.status == 200) {
      // Parsing the data for the frontend to have an easier time processing it
      let list_of_messages = fetch_task_successful.data.rows;
      let sent_messages = [];
      for (let i = 0; i < list_of_messages.length; i++) {
        sent_messages.push(list_of_messages[i]["message"]);
      }
      return sent_messages;
    }

    // We did not fetch the user's tasks from the database.
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//Deletes a task for the user
export const removeTask = async (backend_host, state) => {
  try {
    // Deleting the user's task from the database.
    const delete_task_successful = await axios.post(
      `${backend_host}/removeTask`,
      state,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Let the frontend know that we have deleted the task from the database.
    if (delete_task_successful.status == 200) {
      return true;
    }

    // Let the frontend know that we have failed to delete the task from the database.
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
