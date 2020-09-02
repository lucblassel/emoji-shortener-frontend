import React from "react";
import "../styles/Title.css";

export default function Title() {
  return (
    <h1 className="pageTitle">
      <span className="emojiFrame">
        <span role="img" aria-label="wave-image">
          🌊
        </span>
        <span role="img" aria-label="mask-image">
          👺
        </span>
      </span>
      emoj.yt
      <span className="emojiFrame">
        <span role="img" aria-label="mask-image">
          👺
        </span>
        <span role="img" aria-label="wave-image">
          🌊
        </span>
      </span>
    </h1>
  );
}
