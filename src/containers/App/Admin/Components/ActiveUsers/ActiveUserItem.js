import React from "react";


const ActiveUserItem = ({ data }) => {
  const { image, title } = data;
  return (
    <div className="gx-news-item">
      <div className="gx-news-thumb"><img className="gx-width-175 gx-rounded-sm" src={image} alt="..." /></div>
      <div className="gx-news-content">
        <h4 className="gx-mt-0">User Name</h4>
        <h6 className="gx-mt-0">Active Now</h6>
      </div>
    </div>
  );
}

export default ActiveUserItem;
