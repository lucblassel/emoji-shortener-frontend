import React from "react";
import { getUnique } from "../lib/getURLs.js";
import Footer from "../components/Footer.js";
import Title from "../components/Title.js";
import LoadingIcon from "../components/LoadingIcon.js";
import "../styles/Redirect.css";

const punycode = require("punycode");

class RedirectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
    };
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    let encoded = punycode.encode(id);
    let queryId = (encoded.slice(0, -1) === id) ? id : encoded;
    
    let address = await getUnique(queryId);
    this.setState({
      emojis: address.emojiURL,
      url: address.redirectURL,
      punycode: queryId,
    });
    document.getElementById("loadingIcon").setAttribute(
      "style", "display: none;"
    )
  }

  render() {
    return (
      <div className="pageContainer">
        <div className="mainBody">
          <div className="header">
            <Title/>
          </div>
          <div className="content">
            <LoadingIcon id="loadingIcon"/>
            <div className="contentItem">
              This url: <br />
              <a href={this.state.punycode}>{this.state.emojis}</a>
            </div>
            <div className="contentItem">
              Should redirect you to:
              <br />
              <a href={this.state.url}>{this.state.url}</a>
            </div>
          </div>
          <div className="backButton">
            <a href="/"> return <span role="img" aria-label="home-image">🏡</span></a>
          </div>
          <div className="description">
            <h4>Why am I seeing this page?</h4>
            <p>This is just a little personal project of mine, and I do not check
            if the shortened URLs are trusted or not. </p>
            <p>Since I don't want people getting phished/scammed with
            this website, you will always see this page and check what URL you
            are getting redirected to.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default RedirectPage;
