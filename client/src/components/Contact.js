import React from "react";

export default function Contact() {
    return (
        <div className="frame">
        <h1>Contact</h1>
        <h3>
            <strong>Address:</strong> 35 St. Davids Road South, Lytham St. Annes,
            FY8 1TJ
        </h3>
      <div className="divider"></div>

        <h3>
            <strong>E-mail:</strong>{" "}
            <a target="_blank" href="LSA.Islamicsociety@gmail.com">
            LSA.Islamicsociety@gmail.com
            </a>
        </h3>
      <div className="divider"></div>

        <h3>
            <strong>Telephone:</strong>
            <a
                className="phone-number"
                href="tel:07949165575"
                target="_blank"
            >
                07949165575{" "}
            </a>
        </h3>
        <h3>Charity number: 1170146</h3>
        </div>
    );
}

