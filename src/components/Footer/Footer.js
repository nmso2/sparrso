import React from "react";

const Footer = () => {
  return (
    <div
      className="text-center text-dark p-5 m-0"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      © {new Date().getFullYear()} Copyright:{" "}
      <a
        className="text-dark"
        href="https://nagibmahfuzsubho.netlify.app/"
        target={"_blank"}
        rel="noreferrer"
      >
        Md. Nagib Mahfuz Subho
      </a>
    </div>
  );
};

export default Footer;
