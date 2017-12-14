import React from 'react';
import { connect } from 'react-redux';
import ToggleDisplay from "react-toggle-display";
import { startLogin } from '../actions/auth';

import LoginError from "../components/LoginError";

export class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      showError: false
    };
  }

  closeLoginError = (data) => {
    this.setState({
      showError: data.showError
    })
  }

  render() {
    return (
      <div className="box-layout">
      
      
          <div className="box-layout__box">
            <h1 className="box-layout__title">Spencer.co</h1>
            <p>A new companion for your expenses</p>
            <button className="loginBtn loginBtn--facebook" onClick={() => {this.props.startLogin("facebook")
                .then((e) => {
                  if (!e.operationType) {
                    this.setState({ showError: true });
                  }
                })
            }}>
              Login with Facebook
            </button>    
            <button className="loginBtn loginBtn--google" onClick={() => {this.props.startLogin("google")}}>
              Login with Google
            </button>
          </div>

         

          <ToggleDisplay show={this.state.showError}>
            <LoginError closeLoginError={this.closeLoginError} errorMessage={this.props.errorMessage}/>
          </ToggleDisplay>

        </div>
    );
  };
};

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  email: state.auth.email
});

const mapDispatchToProps = (dispatch) => ({
  startLogin: (loginType) => dispatch(startLogin(loginType))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
