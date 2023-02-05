import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Match from "./Components/Match";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Match></Match>
    </div>
  );
}

export default App;
