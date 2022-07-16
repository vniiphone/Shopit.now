import axios from "axios";
import React, { Component } from "react";
import { api_endpoints as API_ENDPOINT, formUrl as URL } from "../../api/api";
import { getCurrentUser, getJwt } from "../../services/LoginReg";

class AddressContainer extends Component {
  constructor(props) {
    super(props);
    this.errorRef = React.createRef();
  }

  state = {
    user: null,
    account: [],
    savedAddress: {
      id: null,
      addressDetails: null,
      defaultAddress: null,
    },
    loading: false,
    submissionError: null,
    onSubmission: false,
    noMountError: true,
  };

  async componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user, loading: true });
    await axios
      .get(`${URL(API_ENDPOINT.userOperations)}/address/${user.id}`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then(({ data }) => {
        const account = [...data];
        this.setState({ account, loading: false, noMountError: true });
      })
      .catch(() => {
        this.errorhandle();
        this.setState({ noMountError: false, loading: false });
      });
  }

  changeDefault = (item) => {
    const account = [...this.state.account];
    this.removeError();
    account.map((i) => {
      if (item === i.id) return (i.defaultAddress = true);
      else return (i.defaultAddress = false);
    });
    this.changeDefaultInServer(account, item);
  };

  changeDefaultInServer = async (account, item) => {
    const { user } = this.state;
    await axios
      .put(
        `${URL(API_ENDPOINT.userOperations)}/update-default-address/${
          user.id
        }/${item}`,
        null,
        {
          headers: { Authorization: getJwt() },
        }
      )
      .then(() => {
        this.setState({ account });
      })
      .catch(() => {
        this.errorhandle();
      });
  };

  handleEdit = (item) => {
    this.handleAddAddress();
    this.setState({ savedAddress: item });
  };

  editChanges = (value) => {
    const { savedAddress } = this.state;
    this.removeError();
    savedAddress.address = value;
    const address = {
      id: savedAddress.id,
      addressDetails: value,
      defaultAddress: savedAddress.defaultAddress,
    };
    this.editChangesToServer(address);
  };

  editChangesToServer = async (address) => {
    const { user } = this.state;
    this.setState({ onSubmission: true });
    await axios
      .put(
        `${URL(API_ENDPOINT.userOperations)}/update-address/${user.id}`,
        address,
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then(() => {
        this.setState({ onSubmission: false });
        this.makeUpdateChanges(address);
      })
      .catch(() => {
        this.setState({ onSubmission: false });
        this.errorhandle();
      });
  };

  makeUpdateChanges = (address) => {
    const { account } = this.state;
    const updatedAccount = account.filter((i) => i.id !== address.id);
    const newAccount = [...updatedAccount, address];
    this.setState({ account: newAccount });
    this.handleAddAddress();
  };

  deleteAddress = async (item) => {
    const { user } = this.state;
    this.removeError();
    await axios
      .delete(
        `${URL(API_ENDPOINT.userOperations)}/delete-address/${user.id}/${item}`,
        { headers: { Authorization: getJwt() } }
      )
      .then(() => {
        this.updateAddressAfterDeletion(item);
      })
      .catch(() => {
        this.errorhandle();
      });
  };

  updateAddressAfterDeletion = (item) => {
    const account = [...this.state.account];
    const updatedAccount = account.filter((i) => i.id !== item);
    this.setState({ account: updatedAccount });
  };

  addAddress = (values, onSubmitProps) => {
    this.removeError();
    onSubmitProps.resetForm();
    const newAddress = {
      addressDetails: values,
      defaultAddress: false,
    };
    this.addAddressToServer(newAddress);
  };

  addAddressToServer = async (address) => {
    const { user } = this.state;
    this.setState({ onSubmission: true });
    await axios
      .put(`${URL(API_ENDPOINT.userOperations)}/address/${user.id}`, address, {
        headers: { Authorization: getJwt() },
      })
      .then(() => {
        window.location = "/account/address";
      })
      .catch(() => {
        this.setState({ onSubmission: false });
        this.errorhandle();
      });
  };

  errorhandle = () => {
    this.errorRef.current.classList.add("account-address-error-display");
    this.setState({
      submissionError: "Server error occured. Try after sometime",
    });
  };
  removeError = () => {
    this.errorRef.current.classList.remove("account-address-error-display");
    this.setState({ submissionError: null });
  };

  handleOverlay = () => {
    const container = document.querySelector(".account-address-container");
    const overlay = document.querySelector(".background-overlay");
    overlay.classList.toggle("display-overlay");
    container.classList.toggle("background-blur");
  };

  handleAddAddress = () => {
    const input = document.querySelector(".address-input");
    input.classList.toggle("display-address-input");
    this.handleOverlay();
    this.setState({
      savedAddress: {
        id: null,
        address: null,
        defaultAddress: null,
      },
    });
  };
}

export default AddressContainer;
