import React from "react";
import "../styles/Loading.css";

class LoadingIcon extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div id={this.props.id}>
        <div>Loading... </div>
        <div className="iconContainer">
          <span role="img" aria-label="loading icon">
            😐
          </span>
        </div>
      </div>
    );
  }
}

export default LoadingIcon;
