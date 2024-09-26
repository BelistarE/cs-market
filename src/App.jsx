// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Market from "./components/Market";
import "./App.css";

function App() {
  return (
    <div className="common">
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Market />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
