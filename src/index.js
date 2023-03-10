import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboeard";
import Select_con from "./componants/Container_select/Con_select";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(  
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="select" element={<Select_con />} />
    </Routes>
  </BrowserRouter>
);
