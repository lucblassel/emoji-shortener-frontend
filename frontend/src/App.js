import React from "react";
import EmojiForm from "./components/EmojiForm.js";
import { getAll } from "./lib/getURLs";
import "./styles/App.css";

class App extends React.Component {
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
                <a href={doc.emojis} className="card" key={doc.emojis}>
                  <h3>emoj.yt/{doc.raw}</h3>
                </a>
              );
            })}
          </div>
        </main>

        <footer className="pageFooter">
          I'm using the Vulf Mono Font from{" "}
          <a style={{ marginLeft: "1%" }} href="https://ohnotype.co">
            @ohnotypeco
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
