import React from "react";

const AccountDataItem = ({ title, text }) => {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "inline-block", width: "30%" }}>
        <strong>{title}</strong>
      </div>
      <div style={{ display: "inline-block", width: "70%" }}>{text}</div>
    </div>
  );
};

export default AccountDataItem;
