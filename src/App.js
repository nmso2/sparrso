import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Button } from "react-bootstrap";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Button>Button</Button>
      <Home />
    </div>
  );
}

export default App;
