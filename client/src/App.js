import React from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Bloom from "./Components/Bloom";
import Google from "./Components/Google";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/bloom" exact component={Bloom} />
      <Route path="/google" exact component={Google} />
    </Router>
  );
}

export default App;
