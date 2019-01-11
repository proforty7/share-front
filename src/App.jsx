import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import Signup from "./components/Signup";

class App extends Component {
  render() {
    return (
      <main className="container">
        <BrowserRouter>
          <div>
            <Navbar />
            <Route exact path="/" component={Jumbotron} />
            <Route path="/signup" render={() => <Signup />} />
          </div>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;