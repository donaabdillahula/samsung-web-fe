import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ApiClientFactory } from "./shared/ApiClientFactory.jsx";
import { clientInstance } from "./shared/AxiosClient.jsx";
import ServiceFactory from "./services/ServiceFactory.jsx";
import { DependencyProvider } from "./shared/context/DependencyProvider.jsx";

const apiClient = ApiClientFactory(clientInstance);
const services = ServiceFactory(apiClient);


createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <BrowserRouter basename="/samsung-web-fe">
    <DependencyProvider services={services}>
      <App />
    </DependencyProvider>
  </BrowserRouter>
);