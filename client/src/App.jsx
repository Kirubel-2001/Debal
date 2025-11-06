import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Auth/Signup/Signup";
import Signin from "./pages/Auth/Signin/Signin";
import PostRoom from "./pages/PostRoom/PostRoom";
import Profile from "./pages/Profile/Profile";
import MyRooms from "./pages/MyRooms/MyRooms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/post" element={<PostRoom />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-rooms" element={<MyRooms />} />
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;
