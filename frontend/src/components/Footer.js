import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="pageFooter">
      <div className="footerItem">
        I'm using the Vulf Mono Font from{" "}
        <a style={{ marginLeft: "1%" }} href="https://ohnotype.co">
          @ohnotypeco
        </a>
      </div>
      <div className="footerItem" style={{fontSize: "normal"}}>
        Check me out at <a href="https://lucblassel.com">lucblassel.com</a> and
         on <a href="https://github.com/lucblassel">github</a>
      </div>
    </footer>
  );
}
