import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "@/components/Layout";
import AppRoutes from "@/AppRoutes";
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
        <Toaster />
      </Router>
    </>
  );
}

export default App;