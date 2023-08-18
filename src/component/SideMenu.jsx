import { Search, User } from "lucide-react";

const SideMenu = () => {
    return (
        <div className="flex flex-col mt-10 text-xl">
            <div className="flex flex-row my-2">
                <Search/>
                <button className="text-left flex flex-row ml-2"> Rechercher </button>
            </div>
            <div className="flex flex-row">
                <User/>
                <button className="text-left flex flex-row ml-2"> Profile </button>
            </div>
        </div>
    );
};

export default SideMenu;
