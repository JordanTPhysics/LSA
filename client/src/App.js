import React, { useState, useEffect } from "react";


import Salaah from "./components/Salaah";
import Welcome from "./components/Welcome";
import Madrasah from "./components/Madrasah";
import Events from "./components/Events";
import Donate from "./components/Donate";
import Contact from "./components/Contact";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: "welcome",
      activeBackground: "images/DUA.jpg",
    };

  }
  

  selectRenderComponent = () => {
    switch (this.state.activeComponent) {
      
      case "welcome":
        return <Welcome />;
      case "salaah":
        return <Salaah />;
      case "madrasah":
        return <Madrasah />;
      case "events":
        return <Events />;
      case "donate":
        return <Donate />;
      case "contact":
        return <Contact />;
      default:
        return <Welcome />;
    }
  }

  componentDidMount() {

  }

  handleChange = (component, image) => {
    this.setState({ activeComponent: component, activeBackground: image});
  }


  render() {
    const bodyStyle = {
      backgroundImage: `url("${this.state.activeBackground}")`,
      transition: 'background 0.5s ease-in-out', // CSS transition for the background property
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '100vw',
      height: '200vh',
      backgroundColor: 'black',
    };


    return (
      <div className="container-fluid m-0" style={bodyStyle}>
        <header className="row">

          <div className="col-md-6">
            <h1>Lytham St Annes Islamic Society</h1>
            <strong >
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
            <img src="/images/logo_LSA_2023.png" width={0.2} />
          </div>
        </header>

        <div className="row menu-box">
          <ul>
            <li><a onClick={() => this.handleChange("welcome", "/images/DUA.jpg")}>Welcome</a></li>
            <li><a onClick={() => this.handleChange("madrasah", "/images/Quran.jpg")}>Madrasah</a></li>
            <li><a onClick={() => this.handleChange("salaah", "/images/salaah.jpg")}>Salaah</a></li>
            <li><a onClick={() => this.handleChange("events", "/images/DUA.jpg")}>Events</a></li>
            <li><a onClick={() => this.handleChange("donate", "/images/DUA.jpg")}>Donate</a></li>
            <li><a onClick={() => this.handleChange("contact", "/images/salaah.jpg")}>Contact</a></li>
          </ul>


        </div>
        <div className="row main">
          <div className="col-md-12">
            {this.selectRenderComponent()}
          </div>
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

const mapStateToProps = (state) => ({
  backgroundImage: state.backgroundImage,
});

export default App;
