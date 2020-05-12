import React from "react";
import "./App.css";
import { Books } from "./components/Books";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookPage from "./components/BookPage";

function App() {
  return (
    <Router>
      <>
        <Route path="/" exact component={Books} />
        <Route path="/book/:id" component={BookPage} />
      </>
    </Router>
  );
}

export default App;
