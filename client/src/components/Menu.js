import React from "react";

function Menu({ menuItems, backgroundImage, title }) {
  const styles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center" /* Horizontally center the image */,
    alignItems: "center",
    alignText: "center",
    fontWeight: "700",
    color: "white",
    border: "2px solid brown",
    borderRadius: "15%",
  };

  const itemElements = menuItems.map((item, idx) => (
    <li
      className="list-item"
      key={item.id}
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="id">
        <strong>{title === "CHICKEN" ? "" : idx+1}. {item.id}</strong>
      </div>
      <div className="divider"></div>
      <div className="value">
        <strong>{item.value}</strong>
      </div>
    </li>
  ));

  return (
    <div className="menu">
      <h2 style={styles} className="title">
        {title}
      </h2>
      <ol>{itemElements}</ol>
    </div>
  );
}
export default Menu;
