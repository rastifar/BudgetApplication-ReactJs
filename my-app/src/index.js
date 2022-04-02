import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Components
import App from "./App";

//Context
import { BudgetsProvider } from "./contexts/BudgetContext";

ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider>
      <App />
    </BudgetsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
