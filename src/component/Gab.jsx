import { MessagesSquare, ThumbsDown, ThumbsUp, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import API_URL from "../config";
// import { TIMESTAMP } from "mysql/lib/protocol/constants/types";

function Gab({ gab }) {
    const [interactions, setInteractions] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchInteractions = async () => {
            try {
                const response = await fetch(`${API_URL}/interaction/gab/${gab.idGab}`);
                const data = await response.json();
                setInteractions(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInteractions();
    }, []);

    const deleteGab = async () => {
        try {
            const response = await fetch(`${API_URL}/gab/${gab.idGab}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const decodeJWT = (token) => {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = atob(payloadBase64);
        return JSON.parse(decodedPayload);
    };

    return (
        <div className="flex flex-row p-3 border-b overflow-auto">
            <div className="flex flex-col justify-center w-1/6">
                <img
                    src={"/uploads/" + gab.user.profilePictureUrl}
                    className="flex rounded-full bg-cover w-14 h-14 cursor-pointer"
                    onClick={() => window.location.href = `/profile/${gab.user.idUser}`}
                />
            </div>
            <div className="flex flex-col ml-2 w-5/6">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <span className="text-ash-grey font-bold hover:underline cursor-pointer" onClick={() => window.location.href = window.location.href = `/profile/${gab.user.idUser}`}>
                            {gab.user.username}
                        </span>
                        <span className="text-ash-grey ml-2"> {gabDate(gab.createdAt)} </span>
                    </div>
                    <div className="flex flex-row">
                        {gab.user.idUser == decodeJWT(localStorage.getItem("token")).jti ? (
                            <div className="flex flex-row cursor-pointer">
                                <Trash2 strokeWidth="1" size={20} className="hover:text-red-900 ease-in-out duration-150" onClick={deleteGab} />
                            </div>
                        ) : null
                        }

                    </div>
                </div>

                <div className="flex flex-col my-1">
                    <span className="text-ash-grey"> {gab.content} </span>
                </div>

                <div className="flex flex-row my-1">
                    <div className="flex flex-row mr-5 justify-start">
                        <MessagesSquare className="h-4 mr-1" />
                        <span className="text-ash-grey flex flex-row">0 </span>
                    </div>

                    <div className="flex flex-row mr-5">
                        <ThumbsUp className="h-4 mr-1" />
                        <span className="text-ash-grey flex flex-row"> { } </span>
                    </div>

                    <div className="flex flex-row mr-5">
                        <ThumbsDown className="h-4 mr-1" />
                        <span className="text-ash-grey flex flex-row"> { } </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gab;

function gabDate(gabDate) {
    return new Date(gabDate).toLocaleDateString();
}