import React from "react";

export default function Contact() {
    return (
        <div className="frame">
            <h1>Contact</h1>
            <h3 className="box">
                <strong>Address:</strong> 35 St. Davids Road South, Lytham St. Annes,
                FY8 1TJ
            </h3>
            <div className="divider"></div>

            <h3 className="box">
                <strong>E-mail:</strong>{" "}
                <a target="_blank" href="LSA.Islamicsociety@gmail.com">
                    LSA.Islamicsociety@gmail.com
                </a>
            </h3>
            <div className="divider"></div>

            <h3 className="box">
                <strong>Telephone:</strong>
                <a
                    className="phone-number"
                    href="tel:07949165575"
                    target="_blank"
                >
                    07949165575{" "}
                </a>
            </h3 >
            <div className="divider"></div>

            <h3 className="box">Charity number: 1170146</h3>
        </div>
    );
}

