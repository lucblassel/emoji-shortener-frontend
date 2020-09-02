import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import RedirectPage from "./pages/RedirectPage";

const App = () => {
  return (
    <>
    <Router>
      <Route exact path="/" component={ HomePage } />
      <Route exact path="/:id" component={ RedirectPage } />
    </Router>
    </>
  )
}

export default App;
