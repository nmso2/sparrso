import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLaunches } from "./redux/slices/launchesSlice";
import { Button } from "react-bootstrap";
import LaunchesCard from "./components/LaunchesCard/LaunchesCard";

function App() {
  const launches = useSelector((state) => state.launches.launches);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  console.log(launches);

  return (
    <div className="App">
      <Button>Button</Button>
      <section class="bg-light pt-5 pb-5 shadow-sm">
        <div class="container">
          <div class="row pt-5">
            <div class="col-12">
              <h3 class="text-uppercase border-bottom mb-4">Launches</h3>
            </div>
          </div>
          <div class="row">
            {launches.map((launch) => (
              <LaunchesCard launch={launch} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
