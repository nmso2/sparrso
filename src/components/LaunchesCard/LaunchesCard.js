import moment from "moment";
import React from "react";

const LaunchesCard = ({ launch }) => {
  function nextweek() {
    var today = new Date();
    // var today = moment(launch.launch_date_local).format();
    // var nextweek = new Date(
    //   today.moment().year() - 3,
    //   today.getMonth(),
    //   today.getDate()
    // );
    var nextweek = today.getFullYear() - 1;
    return nextweek;
  }
  var today = moment(launch.launch_date_local).format();
  console.log(nextweek() < moment(launch.launch_date_local).year());
  console.log(nextweek(), "::::", moment(launch.launch_date_local).format());
  console.log(today);

  return (
    <div className="col-lg-4 mb-3 d-flex align-items-stretch">
      <div className="card">
        <img
          src={launch.links.mission_patch}
          className="card-img-top"
          alt="Card"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{launch.mission_name}</h5>
          {nextweek() < moment(launch.launch_date_local).format() && (
            <p className="card-text mb-4">
              {moment(launch.launch_date_local, "YYYYMMDD").fromNow()} on{" "}
              {moment(launch.launch_date_local).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </p>
          )}
          <p className="card-text mb-4">
            {moment(launch.launch_date_local).subtract(6, "days").calendar()}
          </p>
          <p className="card-text mb-4">{launch.details}</p>

          <a
            href="/"
            className="btn btn-primary text-white mt-auto align-self-start"
          >
            Book now
          </a>
        </div>
      </div>
    </div>
  );
};

export default LaunchesCard;
