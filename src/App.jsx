import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "@/components/Layout";
import AppRoutes from "@/AppRoutes";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;