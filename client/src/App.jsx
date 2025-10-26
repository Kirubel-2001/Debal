import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import FeaturedListingCard from "./components/FeaturedListingCard";

function App() {
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<FeaturedListingCard />} />
      </Routes>
        </BrowserRouter>
    )
}
export default App;