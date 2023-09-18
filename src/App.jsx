import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SideMenu from "./component/SideMenu.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound";
import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import AppIcon from "./component/AppIcon.jsx";
import Search from "./Pages/Search.jsx";

const App = () => {
  const decodeJWT = (token) => {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  };

  useEffect(() => {
    // Check for an existing JWT in local storage
    const jwtToken = localStorage.getItem("token");

    if (jwtToken) {
      const decodedToken = decodeJWT(jwtToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        // JWT has expired, remove it from local storage
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-row min-h-screen bg-licorice text-ash-grey">
        <div className="flex flex-row justify-end w-1/3 p-10">
          <div className="flex flex-col">
            <AppIcon />
            <SideMenu />
          </div>
        </div>
        <div className="flex-col w-1/3 center border-x">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/search" element={<Search />} />
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/profile/edit"></Route>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div className="w-1/3 right"></div>
      </div>
    </Router>
  );
};

export default App;
