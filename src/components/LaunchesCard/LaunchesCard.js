import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faRocket } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const LaunchesCard = ({ launch }) => {
  return (
    <div className="col-lg-4 mb-3 d-flex align-items-stretch">
      <div className="card shadow-lg">
        <div className="text-center">
          <img
            src={launch.links.mission_patch}
            className="card-img-top p-3 w-75"
            alt="Card"
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{launch.mission_name}</h5>
          <p className="card-text mb-4">
            {moment(launch.launch_date_local, "YYYYMMDD").fromNow()} on{" "}
            {moment(launch.launch_date_local).format("MMMM Do YYYY")}
          </p>
          <p>
            <FontAwesomeIcon icon={faLocationDot} />{" "}
            {launch.launch_site.site_name}
          </p>
          <p>
            <FontAwesomeIcon icon={faRocket} /> {launch.rocket.rocket_name}
          </p>

          <div className=" d-flex text-center align-content-center justify-content-around">
            <a
              href={launch.links.article_link}
              className="btn btn-outline-dark mt-auto"
              target="_blank"
              rel="noreferrer"
            >
              Details
            </a>
            <a
              href={launch.links.video_link}
              className="btn btn-outline-dark mt-auto"
              target="_blank"
              rel="noreferrer"
            >
              Video
            </a>
            <a
              href={launch.links.wikipedia}
              className="btn btn-outline-dark mt-auto"
              target="_blank"
              rel="noreferrer"
            >
              Wikipedia
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchesCard;
