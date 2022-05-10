import React, { useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faLocationDot,
  faRocket,
  faVideo,
  faW,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Carousel,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const LaunchesCard = ({ launch }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="col-lg-4 mb-3 d-flex align-items-stretch">
      <div className="card shadow-lg">
        <div className="text-center">
          <img
            src={launch.links.mission_patch}
            className="card-img-top p-3 w-75"
            alt="Card"
            onClick={() => setShow(true)}
            role="button"
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
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">Mission Info</Tooltip>}
            >
              <span className="d-inline-block">
                <a
                  href={launch.links.article_link}
                  className="btn btn-outline-dark mt-auto"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </a>
              </span>
            </OverlayTrigger>

            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">Video</Tooltip>}
            >
              <span className="d-inline-block">
                <a
                  href={launch.links.video_link}
                  className="btn btn-outline-dark mt-auto"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faVideo} />
                </a>
              </span>
            </OverlayTrigger>

            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">Wikipedia</Tooltip>}
            >
              <span className="d-inline-block">
                <a
                  href={launch.links.wikipedia}
                  className="btn btn-outline-dark mt-auto"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faW} />
                </a>
              </span>
            </OverlayTrigger>
          </div>
        </div>
      </div>
      {/* =================Modal Start================== */}
      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{launch.mission_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-md-flex justify-content-around align-items-center">
            <div>
              <div className="mb-2">
                {launch.launch_success ? (
                  <p className="text-success my-0">
                    This was a successfull mission!
                  </p>
                ) : (
                  <p className="text-danger my-0">
                    Unfortunately this mission was unsuccessfull!
                  </p>
                )}
                {!launch.launch_success && (
                  <p className="my-0 text-danger">
                    Resson: {launch?.launch_failure_details?.reason}
                  </p>
                )}
              </div>

              <div className="mb-2">
                {" "}
                <p className="my-0">
                  Launch Date:{" "}
                  {moment(launch.launch_date_local).format("MMMM Do YYYY")}
                </p>
                <p className="my-0">Location: {launch.launch_site.site_name}</p>
              </div>

              <div className="mb-2">
                <p className="my-0">Rocket Name: {launch.rocket.rocket_name}</p>
                <p className="my-0">Rocket Type: {launch.rocket.rocket_type}</p>
              </div>
            </div>
            <img src={launch.links.mission_patch_small} alt="Card" />
          </div>
          <div>
            <p className="h4">Details</p>
            <p>{launch.details}</p>
            <Carousel>
              {launch.links.flickr_images.length !== 0 &&
                launch.links.flickr_images.map((imageLink) => (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={imageLink}
                      alt="slide"
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* =================Modal End==================== */}
    </div>
  );
};

export default LaunchesCard;
