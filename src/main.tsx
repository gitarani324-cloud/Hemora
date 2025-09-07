
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/globals.css";
import { initializeMobileMenu } from "./utils/mobileMenu";

// Initialize mobile menu functionality
initializeMobileMenu();

createRoot(document.getElementById("root")!).render(<App />);
  