import { LogOutIcon, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();

  const decodeJWT = (token) => {
    // Decode the JWT payload (this is just a basic example)
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  if (localStorage.getItem("token") !== null) {
    return (
      <div className="flex flex-col mt-10 text-xl">
        <Link to="/search" className="flex flex-row my-2">
          <Search />
          <button className="flex flex-row ml-2 text-left"> Rechercher </button>
        </Link>
        <Link
          to={`/profile/${decodeJWT(localStorage.getItem("token")).jti}`}
          className="flex flex-row my-2"
        >
          <User />
          <button className="flex flex-row ml-2 text-left"> Profil </button>
        </Link>
        <div onClick={logout} className="flex flex-row my-2">
          <LogOutIcon />
          <button className="flex flex-row ml-2 text-left" onClick={logout}>
            {" "}
            Deconnexion{" "}
          </button>
        </div>
      </div>
    );
  } else {
    return <div className="flex flex-col mt-10 text-xl"></div>;
  }
};

export default SideMenu;
