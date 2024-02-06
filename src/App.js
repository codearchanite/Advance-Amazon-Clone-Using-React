import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  NavBar,
  Checkout,
  SearchResults,
  Footer,
  ProductPage,
  // Login,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/Footer" element={<Footer />}/>
        {/* <Route path="/Login" element={<Login />}/> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
