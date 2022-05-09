import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLaunches } from "../../redux/slices/launchesSlice";
import LaunchesCard from "../LaunchesCard/LaunchesCard";
import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
} from "react-bootstrap";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [filterState, setFilterState] = useState(true);
  const [monthSelected, setMonthSelected] = useState(false);

  const launches = useSelector((state) => state.launches.launches);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  //   console.log(launches);
  var today = new Date();
  // function filterDate() {
  //   var today = new Date();
  //   var filterDate = new Date(
  //     today.getFullYear() - 1900,
  //     today.getMonth(),
  //     today.getDate()
  //   );
  //   return filterDate;
  // }

  var y = new Date(new Date().getFullYear() - 1, 0, 1);
  var m = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  var d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

  var d1 = new Date(); // current date
  d1.setDate(0); // going to 1st of the month
  console.log(new Date(y.getFullYear(), 11, 31), ":::", y); //last day of previous year
  console.log(d1, ":::", m); //last day of previous month
  console.log(
    d,
    ":::",
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14)
  ); // last week

  // console.log(filterDate());
  // console.log(y);
  // console.log(m);
  // console.log(d);
  console.log(
    "Test::: ",
    m < new Date("Sun Apr 03 2022 00:00:00 GMT+0600") &&
      new Date("Sun Apr 03 2022 00:00:00 GMT+0600") < d1
  );

  // const searchResult = launches.filter(
  //   (search) =>
  //     search.rocket.rocket_name.toLowerCase().includes(searchText.toLowerCase())
  //   // && filterDate() < new Date(search.launch_date_local)
  // );

  useEffect(() => {
    monthSelected
      ? setDisplayData(
          launches.filter(
            (search) =>
              search.rocket.rocket_name
                .toLowerCase()
                .includes(searchText.toLowerCase()) &&
              m < new Date(search.launch_date_local) &&
              new Date(search.launch_date_local) < d1
          )
        )
      : setDisplayData(
          launches.filter((search) =>
            search.rocket.rocket_name
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
        );
  }, [launches, monthSelected, searchText]);

  console.log("displayData::", displayData);
  //   console.log("searchText::", searchText);

  const filteredResult = () =>
    displayData.filter(
      (data) =>
        m < new Date(data.launch_date_local) &&
        new Date(data.launch_date_local) < d1
    );
  console.log(filteredResult());

  return (
    <section className=" bg-light pt-5 pb-5 shadow-sm">
      <div className="container">
        <div>
          <p>Search</p>
          <div>
            <InputGroup className="mb-3 " size="lg">
              <FormControl
                className="display-6"
                placeholder="Search by Rocket Name..."
                aria-label="Search by Rocket Name..."
                aria-describedby="basic-addon1"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />{" "}
              <Button
                className=" ms-2"
                onClick={() => setFilterState(!filterState)}
              >
                Filter
              </Button>
            </InputGroup>

            <div hidden={filterState}>
              <div className="ms-3 d-md-inline">
                <input
                  type="checkbox"
                  name="week"
                  id="week"
                  value={7}
                  onChange={(e) => console.log(e.target.checked)}
                />
                <label className="ms-1" htmlFor="week">
                  Last Week
                </label>
              </div>
              <div className="ms-3 d-md-inline">
                <input
                  type="checkbox"
                  name="month"
                  id="month"
                  onChange={(e) => setMonthSelected(e.target.checked)}
                />
                <label className="ms-1" htmlFor="month">
                  Last Month
                </label>
              </div>
              <div className="ms-3 d-md-inline">
                <input type="checkbox" name="year" id="year" />
                <label className="ms-1" htmlFor="year">
                  Last Year
                </label>
              </div>
              <div className="ms-3 d-md-inline">
                <input type="checkbox" name="upcomming" id="upcomming" />
                <label className="ms-1" htmlFor="upcomming">
                  Upcomming
                </label>
              </div>

              {/* ================================================= */}
              <DropdownButton
                variant="outline-dark"
                className="ms-3 d-md-inline"
                id="dropdown-item-button"
                title="Launch Status"
              >
                {/* <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText> */}
                <Dropdown.Item as="button">Failure</Dropdown.Item>
                <Dropdown.Item as="button">Success</Dropdown.Item>
              </DropdownButton>
              {/* ================================================= */}
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12">
            <h3 className="text-uppercase border-bottom pb-2 mb-4">Launches</h3>
          </div>
        </div>
        <div className="row">
          {displayData.map((launch, index) => (
            <LaunchesCard key={index} launch={launch} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
