import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Market from "./components/Market";
import Agents from "./components/Agents";
import Stickers from "./components/Stickers";
import "./App.css";

function Category() {
  const { categoryName } = useParams();
  return categoryName === "agents" ? (
    <Agents />
  ) : categoryName === "stickers" ? (
    <Stickers />
  ) : (
    <Market />
  );
}

function App() {
  return (
    <div className="common">
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
