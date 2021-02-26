import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./CSS/App.css";
import "./CSS/cart.css";
import "./CSS/product.css";
import "./CSS/payment.css";
import "./CSS/navigation.css";
import "./CSS/index.css";


ReactDOM.render(
	<App />,
	document.getElementById("root")
);

serviceWorker.unregister();
