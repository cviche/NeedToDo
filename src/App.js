import "./App.css";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
