import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import ReactLoading from "react-loading";
import axios from "axios";

class Signup extends Component {
  state = {
    error: null,
    redirect: false,
    loading: false
  };

  renderError({ error, touched }) {
    if (error && touched) {
      return (
        <div className="invalid-feedback" style={{ display: "block" }}>
          {error}
        </div>
      );
    }
  }

  textInput = ({ input, label, meta }) => {
    // console.log(formProps);
    return (
      <div className="form-group">
        <label>{label}</label>
        <input className="form-control" {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  inputPassword = ({ input, label, meta }) => {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input className="form-control" type="password" {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  ageInput = ({ input, label, meta }) => {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input className="form-control" type="number" {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  showError = error => {
    this.setState({
      error
    });
  };

  onSubmit = formValues => {
    console.log(formValues);
    this.setState({ loading: true });
    axios.post("/api/auth/signup", formValues).then(res => {
      this.setState({ loading: false });
      console.log(res);
      if (res.data.error) {
        this.showError(res.data.error);
        return;
      } else {
        this.setState({ redirect: true });
      }
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="row">
        <div className="my-4 mx-auto">
          <h1 className="m-4">Sign Up Now to share your thoughts</h1>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field name="name" component={this.textInput} label="Name" />
            <Field name="age" component={this.ageInput} label="Age" />
            <Field
              name="gender"
              component={this.textInput}
              label="Gender (M/F)"
            />

            <Field name="email" component={this.textInput} label="Email" />
            <Field
              name="password"
              component={this.inputPassword}
              label="Password"
            />
            <Field
              name="passwordConfirm"
              component={this.inputPassword}
              label="Confirm Password"
            />
            <button className="btn btn-primary red-btn">Submit</button>
            <div className="invalid-feedback" style={{ display: "block" }}>
              <h4>{this.state.error}</h4>
            </div>
          </form>
          {this.state.redirect ? <Redirect to="/login" /> : null}
          {this.state.loading ? <ReactLoading color="#e74c3c" /> : null}
        </div>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  console.log("form", formValues);

  if (!formValues.name) {
    errors.name = "You must enter a Name";
  }

  if (!formValues.email || !formValues.email.includes("@")) {
    errors.email = "You must enter a valid email address";
  }

  if (!formValues.password || formValues.password.length < 4) {
    errors.password = "Password is too short";
  }

  if (formValues.password !== formValues.passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match";
  }

  if (
    !formValues.gender ||
    (formValues.gender !== "M" && formValues.gender !== "F")
  ) {
    errors.gender = "Please enter a valid Gender";
  }

  return errors;
};

export default reduxForm({
  form: "SignUp",
  validate
})(Signup);
