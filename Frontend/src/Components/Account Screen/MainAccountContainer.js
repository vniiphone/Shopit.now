import axios from "axios";
import { Component } from "react";
import { api_endpoints as API_ENDPOINT, formUrl as URL } from "../../api/api";
import userIcon from "../../Images/user.png";
import {
  getCurrentUser,
  getJwt,
  removeJwt,
  userLogin,
  setJwt,
} from "../../services/LoginReg";

class MainAccountContainer extends Component {
  data = [
    { name: "Orders", to: "/account/orders" },
    { name: "Manage Address", to: "/account/address" },
  ];

  state = {
    user: {
      id: "",
      sub: "",
      fullname: "",
      role: [],
    },
    account: [],
    profileImage: userIcon,
    error: null,
    confirmPassword: "",
    submissionStarted: false,
    imageError: null,
  };

  componentDidMount() {
    const account = this.data;
    const user = getCurrentUser();
    this.getImageFromServer(user.id);
    this.setState({ account, user });
  }

  getImageFromServer = async (id) => {
    await axios
      .get(`${URL(API_ENDPOINT.userOperations)}/profile-image/${id}`, {
        headers: { Authorization: getJwt() },
      })
      .then(({ data }) => {
        if (data) {
          const imgUrl = `data:${data.type};base64,${data.picByte}`;
          this.setState({ profileImage: imgUrl });
        } else this.setState({ profileImage: userIcon });
      })
      .catch(() => {
        this.setState({ imageError: "An error occoured. Try agian later" });
      });
  };

  handleOverlay = (name) => {
    const overlay = document.querySelector(`.${name}`);
    const container = document.querySelector(".account-container");
    container.classList.toggle("blur-background");
    overlay.classList.toggle("background-overlay-display");
  };
  handleChange = (overlay, optionName) => {
    const changeOption = document.querySelector(`.${optionName}`);
    changeOption.classList.add(`${optionName}-display`);
    this.handleOverlay(overlay);
  };
  closeChange = (overlay, optionName) => {
    const changeOption = document.querySelector(`.${optionName}`);
    changeOption.classList.remove(`${optionName}-display`);
    this.handleOverlay(overlay);
    this.setState({ error: null, confirmPassword: "" });
  };
  handleDeleteConfirmation = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };
  handleAccountDelete = async () => {
    const { user, confirmPassword } = this.state;
    this.setState({ error: null });
    if (confirmPassword.length > 0) {
      this.setState({ submissionStarted: true });
      await axios
        .post(
          `${URL(API_ENDPOINT.userOperations)}/delete-user/${user.id}`,
          {},
          {
            headers: {
              Authorization: getJwt(),
              "user-password": confirmPassword,
            },
          }
        )
        .then(() => {
          removeJwt();
        })
        .catch(({ response }) => {
          if (response.status === 401) {
            this.setState({
              error: "Password is wrong",
              submissionStarted: false,
            });
          } else {
            this.setState({
              error: "Server error. Try after sometime",
              submissionStarted: false,
            });
          }
        });
    } else {
      this.setState({ error: "Enter the password" });
    }
  };
  handleLogout = () => {
    this.setState({ submissionStarted: true });
    removeJwt();
  };

  handlePasswordChange = async (value) => {
    const { user } = this.state;
    this.setState({ error: null, submissionStarted: true });
    await axios
      .put(
        `${URL(API_ENDPOINT.userOperations)}/update-password/${user.id}`,
        {},
        {
          headers: {
            Authorization: getJwt(),
            "current-password": value.current,
            "new-password": value.password,
          },
        }
      )
      .then(() => {
        this.handleReLogin(user.sub, value.password);
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          this.setState({
            error: "Password is wrong",
            submissionStarted: false,
          });
        } else {
          this.setState({
            error: "Server error. Try after sometime",
            submissionStarted: false,
          });
        }
      });
  };
  handleReLogin = async (email, password) => {
    await userLogin(email, password)
      .then(({ data }) => {
        setJwt(data);
        window.location = "/";
      })
      .catch(() => {
        removeJwt();
      });
  };

  handleProfileImage = (e) => {
    this.setState({ imageError: null });
    const image = e.target.files[0];
    if (!image) return "";
    const validation = this.imageValidation(image);
    if (validation) {
      const uploadData = this.imageUploadData(image);
      this.uploadImageDataToServer(uploadData, image);
    }
  };

  uploadImageDataToServer = async (uploadData, image) => {
    const { user, profileImage } = this.state;
    const oldImage = profileImage;
    this.profileImageView(image);
    await axios
      .post(
        `${URL(API_ENDPOINT.userOperations)}/profile-image/${user.id}`,
        uploadData,
        {
          headers: { Authorization: getJwt() },
        }
      )
      .catch(() => {
        this.setState({
          imageError:
            "Sorry cannot upload the image right now. Try agian later",
          profileImage: oldImage,
        });
      });
  };

  imageUploadData = (image) => {
    const uploadImageData = new FormData();
    uploadImageData.append("file", image, image.name);
    return uploadImageData;
  };

  profileImageView = (image) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImage: reader.result });
      }
    };
    reader.readAsDataURL(image);
  };

  imageValidation = (image) => {
    const imgType = image.type.split("/");
    const allowedType = ["jpg", "jpeg", "png"];
    if (allowedType.includes(imgType[1])) {
      if (image.size <= 1000000) return true;
      this.setState({ imageError: "Image should be < 1mb" });
      return false;
    }
    this.setState({ imageError: "Choose a .jpeg or .png file" });
    return false;
  };
}

export default MainAccountContainer;
