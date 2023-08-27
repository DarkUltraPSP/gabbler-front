import GabblerLogoCropped from "./GabblerLogoCropped.png";
import "./component/SideMenu.jsx";
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import SideMenu from "./component/SideMenu.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import NotFound from "./Pages/NotFound";

const App = () => {
    return (
        <div className="bg-licorice text-ash-grey h-screen flex flex-row ">
            <div className="flex flex-row w-1/3 justify-end p-10">
                <div className="flex flex-col">
                    <div className="flex w-100 justify-end">
                        <img src={GabblerLogoCropped} alt="Gabbler Logo" className="flex w-14" />
                    </div>
                        <SideMenu/>
                </div>
            </div>
            <div className="center border-x flex-col w-1/3 overflow-hidden">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </Router>
            </div>
            <div className="right w-1/3"></div>
        </div>
    );
};

export default App;
