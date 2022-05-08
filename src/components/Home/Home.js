import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLaunches } from "../../redux/slices/launchesSlice";
import LaunchesCard from "../LaunchesCard/LaunchesCard";
import { FormControl, InputGroup } from "react-bootstrap";

const Home = () => {
  const [searchText, setSearchText] = useState("");

  const launches = useSelector((state) => state.launches.launches);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  //   console.log(launches);

  const searchResult = launches.filter((search) =>
    search.rocket.rocket_name.toLowerCase().includes(searchText.toLowerCase())
  );

  console.log("searchResult::", searchResult);
  console.log("searchText::", searchText);

  return (
    <section class="bg-light pt-5 pb-5 shadow-sm">
      <div class="container">
        <div>
          <p>Search</p>
          <div>
            {/* <input
              type="text"
              placeholder="Enter Rocket Name..."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            /> */}

            <InputGroup className="mb-3" size="lg">
              <FormControl
                placeholder="Enter Rocket Name..."
                aria-label="Enter Rocket Name..."
                aria-describedby="basic-addon1"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
            </InputGroup>
          </div>
        </div>
        <div class="row pt-5">
          <div class="col-12">
            <h3 class="text-uppercase border-bottom mb-4">Launches</h3>
          </div>
        </div>
        <div class="row">
          {searchResult.map((launch) => (
            <LaunchesCard launch={launch} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
