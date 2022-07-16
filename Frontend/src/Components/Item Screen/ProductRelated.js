import React, { Component } from "react";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../../Components/Home/CarouselBtns";
import configs from "../../utils/TodaysDealCarousel";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { api_endpoints as API_ENDPOINT, formUrl as URL } from "../../api/api";

import "../../css/ProductRelated.css";
import axios from "axios";

class ProductRelated extends Component {
  state = {
    loading: true,
    products: [],
    error: false,
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    const id = this.props.productId;
    if (id) {
      this.setState({ error: false, loading: true });
      await axios
        .get(`${URL(API_ENDPOINT.productApi)}/view/category/${id}`)
        .then(({ data }) => {
          this.setState({ products: data, loading: false });
        })
        .catch(() => {
          this.setState({ error: true, loading: false });
        });
    }
  };

  render() {
    const { handleClick } = this.props;
    const { loading, products } = this.state;
    const settings = {
      ...configs,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
    };
    return (
      <div className="product-related-container">
        {loading ? (
          <SkeletonTheme
            color="rgb(225, 225, 225)"
            highlightColor="rgb(215, 215, 215)"
          >
            <Skeleton className="related-skeleton" count={10} />
          </SkeletonTheme>
        ) : (
          <Slider {...settings}>
            {products.map((item) => {
              const { id, title, thumbnail } = item;
              const { type, picByte } = thumbnail;
              const imgUrl = `data:${type};base64,${picByte}`;
              return (
                <div key={id}>
                  <div
                    onClick={() => handleClick(id)}
                    className="item-container"
                  >
                    <img src={imgUrl} alt="product-related" />
                    <h5>{title}</h5>
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

export default ProductRelated;
