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
import ItemPage from "./components/ItemPage";
import SubMarket from "./components/SubMarket";
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

function SubCategory() {
  const { subCategoryName } = useParams();
  return <SubMarket subCategoryName={subCategoryName} />;
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
            <Route
              path="/category/:categoryName/:subCategoryName"
              element={<SubCategory />}
            />
            <Route
              path="/category/:itemType/:weaponType/:skinName"
              element={<ItemPage />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
