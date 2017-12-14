import React from "react";

class LoginError extends React.Component {
  onClose = () => {
    this.props.closeLoginError({
      showError: false
    });
  }
  render() {
    return (
      <div className="box-layout__box box-layout__box--error">
        <h3>Oops!</h3>
        <p>{this.props.errorMessage}</p>
        <button className="button button--error" onClick={this.onClose}>Close</button>
      </div>
    );
  }
}

export default LoginError;