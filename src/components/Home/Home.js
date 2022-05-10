import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLaunches } from "../../redux/slices/launchesSlice";
import LaunchesCard from "../LaunchesCard/LaunchesCard";
import { Button, Dropdown, DropdownButton, Pagination } from "react-bootstrap";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [isSuccess, setIsSuccess] = useState("");
  const [duration, setDuration] = useState("");
  const [upcomming, setUpcomming] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const pageNumber = Math.ceil(displayData.length / 12);

  console.log("page number::", page);

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
    setIsSuccess("");
    setDuration("");
    setUpcomming("");
    setSearchText("");
    setPage(0);
  };

  useEffect(() => {
    upcomming === "upcomming"
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
      : duration === "last_week"
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
      : duration === "last_month"
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
      : duration === "last_year"
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
      : setDisplayData(
          launches.filter((search) =>
            search.rocket.rocket_name
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
        );

    setPageCount(pageNumber);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launches, searchText, isSuccess, duration, upcomming, pageNumber]);

  console.log("displayData::", displayData);

  return (
    <section className="bg-light pt-5 pb-5 mt-5 shadow-sm">
      <div className="container">
        <div>
          <div className="d-md-flex justify-content-center">
            <input
              type="text"
              className="form-control-sm border-1 mt-1"
              placeholder="Search by Rocket Name..."
              aria-label="Search by Rocket Name..."
              onChange={(e) => {
                setSearchText(e.target.value);
                setIsSuccess("");
                setDuration("");
                setUpcomming("");
                setPage(0);
              }}
              value={searchText}
            />

            <DropdownButton
              variant="outline-dark"
              className="ms-3 mt-1"
              id="dropdown-item-button"
              title="Launch Date"
            >
              <Dropdown.Item
                as="button"
                value={"last_week"}
                onClick={(e) => {
                  setIsSuccess("");
                  setUpcomming("");
                  setDuration(e.target.value);
                  setPage(0);
                }}
              >
                Last Week
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                value={"last_month"}
                onClick={(e) => {
                  setIsSuccess("");
                  setUpcomming("");
                  setDuration(e.target.value);
                  setPage(0);
                }}
              >
                Last Month
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                value={"last_year"}
                onClick={(e) => {
                  setIsSuccess("");
                  setUpcomming("");
                  setDuration(e.target.value);
                  setPage(0);
                }}
              >
                Last Year
              </Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              variant="outline-dark"
              className="ms-3 mt-1"
              id="dropdown-item-button"
              title="Launch Status"
            >
              <Dropdown.Item
                as="button"
                value={"fail"}
                onClick={(e) => {
                  setDuration("");
                  setUpcomming("");
                  setIsSuccess(e.target.value);
                  setPage(0);
                }}
              >
                Failure
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                value={"success"}
                onClick={(e) => {
                  setDuration("");
                  setUpcomming("");
                  setIsSuccess(e.target.value);
                  setPage(0);
                }}
              >
                Success
              </Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              variant="outline-dark"
              className="ms-3 mt-1"
              id="dropdown-item-button"
              title="Upcoming?"
            >
              <Dropdown.Item
                as="button"
                value={"upcomming"}
                onClick={(e) => {
                  setDuration("");
                  setIsSuccess("");
                  setUpcomming(e.target.value);
                  setPage(0);
                }}
              >
                Upcomming
              </Dropdown.Item>
            </DropdownButton>
            <Button
              variant="outline-danger"
              onClick={clearFilter}
              className="ms-3 mt-1"
            >
              Clear Filter
            </Button>
          </div>
        </div>
        {/* </div> */}
        <div className="row pt-3">
          <div className="col-12">
            <h3 className="text-uppercase border-bottom pb-2 mb-4">Launches</h3>
          </div>
        </div>
        <div className="row">
          {displayData.slice(page * 12, page * 12 + 12).map((launch, index) => (
            <LaunchesCard key={index} launch={launch} />
          ))}
        </div>
      </div>
      <Pagination className="justify-content-center mt-md-5">
        {[...Array(pageCount).keys()].map((number) => (
          <Pagination.Item key={number} onClick={() => setPage(number)}>
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </section>
  );
};

export default Home;
