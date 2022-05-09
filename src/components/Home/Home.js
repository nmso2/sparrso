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
  const [yearSelected, setYearSelected] = useState(false);
  const [weekSelected, setWeekSelected] = useState(false);
  const [upcommingSelected, setUpcommingSelected] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");

  const launches = useSelector((state) => state.launches.launches);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  var today = new Date();
  var y = new Date(new Date().getFullYear() - 1, 0, 1);
  var m = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  var w = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

  var d1 = new Date(); // current date
  d1.setDate(0); // going to 1st of the month

  const clearFilter = () => {
    setMonthSelected(false);
    setYearSelected(false);
    setWeekSelected(false);
    setUpcommingSelected(false);
    setIsSuccess("");
  };

  useEffect(() => {
    yearSelected
      ? setDisplayData(
          launches.filter(
            (search) =>
              search.rocket.rocket_name
                .toLowerCase()
                .includes(searchText.toLowerCase()) &&
              y < new Date(search.launch_date_local) &&
              new Date(search.launch_date_local) <
                new Date(y.getFullYear(), 11, 31)
          )
        )
      : monthSelected
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
      : weekSelected
      ? setDisplayData(
          launches.filter(
            (search) =>
              search.rocket.rocket_name
                .toLowerCase()
                .includes(searchText.toLowerCase()) &&
              new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - 14
              ) < new Date(search.launch_date_local) &&
              new Date(search.launch_date_local) < w
          )
        )
      : upcommingSelected
      ? setDisplayData(
          launches.filter(
            (search) =>
              search.rocket.rocket_name
                .toLowerCase()
                .includes(searchText.toLowerCase()) && search.upcoming
          )
        )
      : isSuccess === "success"
      ? setDisplayData(
          launches.filter(
            (search) =>
              search.rocket.rocket_name
                .toLowerCase()
                .includes(searchText.toLowerCase()) && search.launch_success
          )
        )
      : isSuccess === "fail"
      ? setDisplayData(
          launches.filter(
            (search) =>
              search.rocket.rocket_name
                .toLowerCase()
                .includes(searchText.toLowerCase()) && !search.launch_success
          )
        )
      : setDisplayData(
          launches.filter((search) =>
            search.rocket.rocket_name
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    launches,
    monthSelected,
    searchText,
    yearSelected,
    weekSelected,
    upcommingSelected,
    isSuccess,
  ]);

  console.log("displayData::", displayData);

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
                  checked={weekSelected}
                  onChange={(e) => setWeekSelected(e.target.checked)}
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
                  checked={monthSelected}
                  onChange={(e) => setMonthSelected(e.target.checked)}
                />
                <label className="ms-1" htmlFor="month">
                  Last Month
                </label>
              </div>
              <div className="ms-3 d-md-inline">
                <input
                  type="checkbox"
                  name="year"
                  id="year"
                  checked={yearSelected}
                  onChange={(e) => setYearSelected(e.target.checked)}
                />
                <label className="ms-1" htmlFor="year">
                  Last Year
                </label>
              </div>
              <div className="ms-3 d-md-inline">
                <input
                  type="checkbox"
                  name="upcomming"
                  id="upcomming"
                  checked={upcommingSelected}
                  onChange={(e) => setUpcommingSelected(e.target.checked)}
                />
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
                <Dropdown.Item
                  as="button"
                  value={"fail"}
                  onClick={(e) => setIsSuccess(e.target.value)}
                >
                  Failure
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  value={"success"}
                  onClick={(e) => setIsSuccess(e.target.value)}
                >
                  Success
                </Dropdown.Item>
              </DropdownButton>
              <Button onClick={clearFilter} className="ms-3 d-md-inline">
                Clear Filter
              </Button>
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
