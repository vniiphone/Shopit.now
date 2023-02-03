import React, { Component } from "react";
import TimeGen from "../../utils/TimeGen";
import Lottie from "lottie-react";
import { api_endpoints as API_ENDPOINT, formUrl as URL } from "../../api/api";
import axios from "axios";
import load from "../../animations/dataload.json";
import Slider from "react-slick";
import configs from "../../utils/TodaysDealCarousel";
import { NextArrow, PrevArrow } from "./CarouselBtns";

import "../../css/todaysdeal.css";

class TodaysDeals extends Component {
  state = {
    data: [],
    loading: true,
    error: false,
  };
  async componentDidMount() {
    this.setState({ loading: true, error: false });
    await axios
      .get(`${URL(API_ENDPOINT.productApi)}/view/new-deals`)
      .then(({ data }) => {
        this.setState({ data, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  }

  render() {
    const { data, loading, error } = this.state;
    const { onClick } = this.props;

    const settings = {
      ...configs,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
    };

    return (
      <div className="todays-deal-container">
        <div className="todays-deal-head">
          <h2>Today's Deals</h2>
          {loading && (
            <Lottie className="new-deals-load" animationData={load} />
          )}
          {!loading && !error && data.length !== 0 && (
            <span>
              <TimeGen />
            </span>
          )}
        </div>
        {error ? (
          <div className="todays-deal-error">Couldn't load today's deals</div>
        ) : (
          <Slider {...settings}>
            {data.map((item) => {
              const imgUrl = `data:${item.thumbnail.type};base64,${item.thumbnail.picByte}`;
              return (
                <div key={item.id}>
                  <div onClick={() => onClick(item)} className="item-container">
                    <img src={imgUrl} alt="todays-deals" />
                    <h4>{item.title.toLowerCase()}</h4>
                    <h5>
                      <span>$ </span>
                      {item.price}
                    </h5>
                  </div>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
    );
  }
}

export default TodaysDeals;
