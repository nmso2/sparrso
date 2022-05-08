import React from "react";

const LaunchesCard = ({ launch }) => {
  return (
    <div class="col-lg-4 mb-3 d-flex align-items-stretch">
      <div class="card">
        <img src={launch.links.mission_patch} class="card-img-top" alt="Card" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">{launch.mission_name}</h5>
          <p class="card-text mb-4">{launch.details}</p>
          <a
            href="/"
            class="btn btn-primary text-white mt-auto align-self-start"
          >
            Book now
          </a>
        </div>
      </div>
    </div>
  );
};

export default LaunchesCard;
