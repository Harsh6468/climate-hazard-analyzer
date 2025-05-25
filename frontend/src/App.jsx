import React from "react";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white">
      <header className="p-6 text-center text-3xl font-extrabold drop-shadow-lg">
        Climate Hazard Trend Analyzer
      </header>
      <main className="max-w-5xl mx-auto p-4">
        <Home />
      </main>
      <footer className="text-center p-4 text-sm opacity-70">
        &copy; 2025 Dygnify Ventures
      </footer>
    </div>
  );
}

export default App;
