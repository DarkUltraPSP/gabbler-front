import GabblerLogoCropped from "./GabblerLogoCropped.png";
import "./component/SideMenu.jsx";
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { useEffect } from "react";
import SideMenu from "./component/SideMenu.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound";
import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";

const App = () => {
    const decodeJWT = (token) => {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = atob(payloadBase64);
        return JSON.parse(decodedPayload);
    };

    useEffect(() => {
        // Check for an existing JWT in local storage
        const jwtToken = localStorage.getItem('token');

        if (jwtToken) {
            const decodedToken = decodeJWT(jwtToken);
            if (decodedToken.exp * 1000 < Date.now()) {
                // JWT has expired, remove it from local storage
                localStorage.removeItem('token');
            }
        }
    }, []);

    return (
        <div className="bg-licorice text-ash-grey min-h-screen flex flex-row">
            <div className="flex flex-row w-1/3 justify-end p-10">
                <div className="flex flex-col">
                    <div className="flex w-100 justify-end">
                        <img src={GabblerLogoCropped} alt="Gabbler Logo" className="flex w-14 cursor-pointer" onClick={() => window.location.href = "/"} />
                    </div>
                    <SideMenu />
                </div>
            </div>
            <div className="center border-x flex-col w-1/3">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />}></Route>
                        <Route path="/profile/edit"></Route>
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </div>
            <div className="right w-1/3"></div>
        </div>
    );
};

export default App;
