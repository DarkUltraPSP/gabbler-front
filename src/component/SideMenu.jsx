import { LogOutIcon, Search, User } from "lucide-react";

const SideMenu = () => {
    const decodeJWT = (token) => {
        // Decode the JWT payload (this is just a basic example)
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = atob(payloadBase64);
        return JSON.parse(decodedPayload);
      };

    const goTo = (path) => {
        window.location.href = path;
    };

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/signin';
    };

    if (localStorage.getItem('token') !== null) {
        return (
            <div className="flex flex-col mt-10 text-xl">
                <div className="flex flex-row my-2">
                    <Search />
                    <button className="text-left flex flex-row ml-2"> Rechercher </button>
                </div>
                <div className="flex flex-row my-2">
                    <User />
                    <button className="text-left flex flex-row ml-2" onClick={() => goTo(`/profile/${decodeJWT(localStorage.getItem('token')).jti}`)}> Profil </button>
                </div>
                <div className="flex flex-row my-2">
                    <LogOutIcon/>
                    <button className="text-left flex flex-row ml-2" onClick={logout}> Deconnexion </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col mt-10 text-xl">
            </div>
        );
    }
};

export default SideMenu;
