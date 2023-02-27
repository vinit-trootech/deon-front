import React, { useState } from "react";
import { Radio } from "antd";

import Widget from "components/Widget/index";
import { allNews, bitCoinNews, lightCoinNews, rippleNews } from "../Crypto/data"
import CircularProgress from "components/CircularProgress";
import CryptoNewsItem from "../CryptoNewsItem";
import ActiveUserItem from "./ActiveUserItem";

const newsData = [allNews, bitCoinNews, lightCoinNews, rippleNews];

const ActiveUsers = () => {

  const [news, setNews] = useState(newsData[0]);
  const [loader, setLoader] = useState(false);


  const handleChange = (e) => {
    const value = e.target.value;
    setNews(newsData[value]);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  };

  return (
    <Widget>
      <div className="ant-row-flex gx-justify-content-between gx-mb-3 gx-dash-search">
        <h2 className="h4 gx-mb-3 gx-mb-sm-1 gx-mr-2">Active Users</h2>
        <div className="gx-mx-sm-2">
          <Radio.Group className="gx-radio-group-link gx-radio-group-link-news" defaultValue={0}
            onChange={handleChange}>
            <Radio.Button value={0} className="gx-mb-1">Brokers</Radio.Button>
            <Radio.Button value={1} className="gx-mb-1">Traders</Radio.Button>
          </Radio.Group>
        </div>
      </div>

      {loader ? <CircularProgress className="gx-loader-400" /> : news.map((data, index) =>
        <ActiveUserItem key={index} data={data} />
      )}

    </Widget>
  );
}

export default ActiveUsers;
