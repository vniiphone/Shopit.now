import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import APP_LOGO_WHITE from "../Icons/app-logo-white.svg";
import InputContainer from "../Components/Home/InputContainer";
import { passwordPattern } from "../datas/passwordPattern";
import RegisterMain from "../Components/login-register/RegisterMain";
import LoginRegError from "../Components/login-register/LoginRegError";
import Success from "../Components/login-register/Success";
import { getCurrentUser } from "../services/LoginReg";
import "../css/register.css";

const validate = Yup.object().shape({
  name: Yup.string()
    .required("Enter the name")
    .min(3)
    .max(20)
    .label("Name")
    .trim(),
  email: Yup.string()
    .required("Enter the email")
    .max(25)
    .email("Invalid email")
    .label("Email")
    .trim(),
  mobile: Yup.string()
    .length(10, "Invalid Mobile no")
    .required("Enter the mobile no")
    .label("Mobile no")
    .trim(),
  password: Yup.string()
    .max(20)
    .matches(passwordPattern, "Password rule violation")
    .required("Enter the password")
    .label("Password")
    .trim(),
  confirm: Yup.string()
    .required("Confirm the password")
    .oneOf([Yup.ref("password"), null], "Passwords doesn't match")
    .label("Confirm Password")
    .trim(),
});

class Register extends RegisterMain {
  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    const { registrationBegin, registerError } = this.state;
    return (
      <div className="register-container">
        {registrationBegin && <Success />}
        <div className="left-container">
          <div className="left-sub-container">
            <Link to="/" className="logo-container">
              <img src={APP_LOGO_WHITE} alt="Register screen white logo" />
            </Link>
            <h2>Create your</h2>
            <h2 style={{ paddingTop: 0 }}>account</h2>
            <h3>
              Already Registered?{" "}
              <Link to="/login" className="signin-link">
                Sign in
              </Link>
            </h3>
          </div>
        </div>
        <div className="right-container">
          {registerError && <LoginRegError error={registerError} />}
          <Formik
            initialValues={{
              name: "",
              email: "",
              mobile: "",
              password: "",
              confirm: "",
            }}
            onSubmit={this.handleRegistration}
            validationSchema={validate}
          >
            {({
              handleSubmit,
              handleChange,
              errors,
              setFieldTouched,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <InputContainer
                  inputRef={this.nameref}
                  onBlur={() => setFieldTouched("name")}
                  touched={touched.name}
                  errors={errors.name}
                  onChange={handleChange("name")}
                  maxLength={20}
                  autoCapitalize="words"
                  autoComplete="off"
                  spellCheck="false"
                  type="text"
                  name="full name"
                />
                <InputContainer
                  inputRef={this.emailref}
                  onBlur={() => setFieldTouched("email")}
                  touched={touched.email}
                  errors={errors.email}
                  onChange={handleChange("email")}
                  maxLength={25}
                  autoCapitalize="off"
                  autoComplete="off"
                  spellCheck="false"
                  type="text"
                  name="email"
                />
                <InputContainer
                  inputRef={this.mobileref}
                  onBlur={() => setFieldTouched("mobile")}
                  touched={touched.mobile}
                  errors={errors.mobile}
                  onChange={handleChange("mobile")}
                  autoComplete="off"
                  spellCheck="false"
                  type="number"
                  name="mobile"
                />
                <div className="password-container">
                  <input
                    ref={this.passwordref}
                    placeholder=" "
                    onBlur={() => setFieldTouched("password")}
                    onChange={handleChange("password")}
                    maxLength={20}
                    type="password"
                    name="password"
                  />
                  <label htmlFor="password">Password</label>
                  {touched.password && (
                    <h5 className="input-error">{errors.password}</h5>
                  )}
                  <div
                    className={
                      errors.password && touched.password
                        ? "password-rules force-show"
                        : "password-rules"
                    }
                  >
                    <ul>
                      <li>Password should contain minimum 8 characters</li>
                      <li>
                        Password should have atleast one uppercase, lowercase,
                        digit and special character(@$!%*?&)
                      </li>
                    </ul>
                  </div>
                </div>
                <InputContainer
                  inputRef={this.confirmref}
                  onBlur={() => setFieldTouched("confirm")}
                  touched={touched.confirm}
                  errors={errors.confirm}
                  onChange={handleChange("confirm")}
                  type="password"
                  name="re-enter password"
                />
                <button
                  disabled={registrationBegin}
                  ref={this.submitRef}
                  type="submit"
                  className="btn-container"
                >
                  Register
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default Register;
