// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Import the Header
import Home from "./components/Home";
import Market from "./components/Market";

function App() {
  return (
    <Router>
      {/* Header is always visible */}
      <Header />

      {/* Separate section where the content will be rendered */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<Market />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
