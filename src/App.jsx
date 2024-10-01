import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { CartProvider } from "./components/context/CartContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Market from "./components/Market";
import Agents from "./components/Agents";
import Stickers from "./components/Stickers";
import ItemPage from "./components/ItemPage";
import SubMarket from "./components/SubMarket";
import CartPage from "./components/CartPage";
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
    <CartProvider>
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
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
