import { useState } from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeForm from "./_components/HomeForm";
import CompletionPage from "./_components/CompletionPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeForm />} />
          <Route path="/submit" element={<CompletionPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
