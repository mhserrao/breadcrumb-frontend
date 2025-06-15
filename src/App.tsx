import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/breadcrumb">
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
