import React from "react";
import ReactDOM from "react-dom/client";
import AccessibilityWidget from "./components/AccessibilityWidget";

// Wait for the container to be created by content.js
const interval = setInterval(() => {
  const container = document.getElementById("accessibility-widget-root");
  if (container) {
    clearInterval(interval);
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <AccessibilityWidget />
      </React.StrictMode>
    );
  }
}, 100);
