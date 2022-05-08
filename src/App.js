import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLaunches } from "./redux/slices/launchesSlice";
import { Button } from "react-bootstrap";

function App() {
  const launches = useSelector((state) => state.launches.launches);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLaunches());
  }, []);

  console.log(launches);

  return (
    <div className="App">
      <Button>Button</Button>
      {launches.map((launch) => (
        <p>{launch.mission_name}</p>
      ))}
    </div>
  );
}

export default App;
