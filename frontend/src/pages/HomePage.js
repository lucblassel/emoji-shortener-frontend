import React from "react";
import EmojiForm from "../components/EmojiForm.js";
import Footer from "../components/Footer";
import { getAll } from "../lib/getURLs";
import "../styles/Home.css";

class HomePage extends React.Component {
    constructor() {
      super();
      this.state = {
        addresses: [],
      };
    }
  
    async componentDidMount() {
      let addresses = await getAll();
      this.setState({
        addresses: addresses,
      });
    }
  
    render() {
      return (
        <div className="pageContainer">
          <main className="mainBody">
            <h1 className="pageTitle">
              <span role="img">🌊</span>
              <span role="img">👺</span> emoj.yt <span role="img">👺</span>
              <span role="img">🌊</span>
            </h1>
  
            <p className="description">encode urls as emoji strings!</p>
  
            <EmojiForm />
  
            <div className="addressGrid">
              <h2>Latest entries: </h2>
              {this.state.addresses.map((doc) => {
                return (
                  <a href={doc.punycode} className="link" key={doc.punycode}>
                    <h3>emoj.yt/{doc.raw}</h3>
                  </a>
                );
              })}
            </div>
          </main>
          
          <Footer/>
        </div>
      );
    }
  }

export default HomePage;