import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Navigation } from "./components/navigation/Navigation";
import { Homepage } from "./pages/home/Homepage";

function App() {
  return (
    <div className="App">
      <header>
        {/* <Counter /> */}
        <Navigation />
        <Homepage />
      </header>
    </div>
  );
}

export default App;
