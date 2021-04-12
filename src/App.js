import "./App.css";
import Landing from "./pages/Landing";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" render={() => <div>Home Page not made yet.</div>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
