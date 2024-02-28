import React from "react";

import "./ContentTitle.css";

const ContentTitle = ({ icon, title, titleLevel }) => {
  return (
    <div className="icon">
      {icon}
      <h level={titleLevel} className="title">{title}</h>
    </div>
  );
};

export default ContentTitle;
