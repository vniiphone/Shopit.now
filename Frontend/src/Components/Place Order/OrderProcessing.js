import React, { Component } from "react";
import axios from "axios";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../State Management/MappingStates";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Process from "../Order Process/Process";
import { api_endpoints as API_ENDPOINT, formUrl as URL } from "../../api/api";
import * as services from "../../services/LoginReg";
import "../../css/order-processing.css";

class OrderProcessing extends Component {
  componentWillUnmount() {
    this.props.paymentOver();
  }

  componentDidMount() {
    const { fromWhere } = this.props.paymentBegan;
    if (fromWhere === "CART") this.checkCart();
  }

  checkCart = async () => {
    const { id } = services.getCurrentUser();
    await axios
      .get(`${URL(API_ENDPOINT.userCart)}/${id}`, {
        headers: {
          Authorization: services.getJwt(),
        },
      })
      .then(({ data }) => {
        if (!data.length) this.redirectPage();
      });
  };

  redirectPage = () => {
    window.location = "/cart";
  };

  componentDidUpdate(prevProps, prevState) {
    const { paymentBegan } = this.props;
    if (prevProps.paymentBegan !== paymentBegan) {
      if (!paymentBegan.processStarted) {
        return <Redirect to="/cart" />;
      }
    }
  }

  render() {
    const continueProcess = this.props.paymentBegan.processStarted;
    if (!continueProcess) return <Redirect to="/cart" />;
    return <Process />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderProcessing);
