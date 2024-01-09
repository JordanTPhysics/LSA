import React, { useState, useEffect } from "react";

import Salaah from "./components/Salaah";

class App extends React.Component {
  render() {
  return (
    <div className="container m-0">
      <header className="row">

        <div className="col-md-3">
          <strong className="neon-text">
            <a
              href="https://www.google.com/maps/place/11+Moorland+Rd,+Lytham+Saint+Annes+FY8+3TD"
              className="phone-number"
              target="_blank"
            >
             <h3>11 Moorland Road, Lytham St. Annes, Lancashire, FY8 3TD</h3> 
            </a>
          </strong>
        </div>
        <div className="col-md-3">
          <div className="neon-text">
           <h3> For any queries, complaints or suggestions, please call below: 
            <a className="phone-number" href="tel:07949165575" target="_blank">
              07949165575
            </a> </h3>
          </div>
        </div>
        <div className="col-md-3">
          <img src="/images/logo_LSA_2023.png" width={0.2} />
        </div>
      </header>

      <div className="row menu-box"></div>
      <div className="row main">
        <div>
          <h2>Welcome</h2>
          <span>
            The Lytham St. Annes Islamic Society (LSA) was established by a
            dedicated group of Muslims who recognized the importance of
            fostering a strong sense of community among its members, both in
            terms of religious and social aspects. The primary objective of LSA
            is to promote religious harmony and cultivate positive relationships
            between Muslims and non-Muslims, while facilitating the integration
            of Muslims residing on the Fylde Coast into the local society. A key
            goal is to unite Muslims on the Fylde Coast under a single
            organization and actively engage in fundraising for local charitable
            initiatives.
          </span>
        </div>
        <span>
          LSA stands out as an exceptional and dynamic organization that
          collaborates closely with local communities to provide essential
          services and support to our users and the broader community. We firmly
          believe that the future of our communities lies in the hands of our
          young generation, who require guidance and assistance to understand
          and shape the future effectively. LSA remains dedicated to working
          tirelessly towards peace and harmony within our communities.{" "}
        </span>
      </div>
      <div className="row">
        <Salaah/>
      </div>

      <footer className="footer row">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src="/images/logo_LSA_2023.png" alt="" width={0.5} />
              <h1>Lytham St. Annes Islamic Community Centre</h1>
            </div>
            <div className="footer-contact"></div>
            <div className="footer-social">
              <h3>Follow Us</h3>
              <a
                href="https://www.facebook.com/groups/1142322199143685"
                className="phone-number"
                target="_blank"
              >
                Join our group on Facebook!
              </a>{" "}
              <br />
            </div>
          </div>
          <div className="footer-disclaimer">
            <p>
              {" "}
              E-mail:{" "}
              <a target="_blank" href="LSA.Islamicsociety@gmail.com">
                LSA.Islamicsociety@gmail.com
              </a>
            </p>
            <p>
              Telephone:
              <a
                className="phone-number"
                href="tel:07949165575"
                target="_blank"
              >
                07949165575{" "}
              </a>
            </p>
            <p>Charity number: 1170146</p>
          </div>
        </div>
      </footer>
    </div>
  );
  }
}
export default App
