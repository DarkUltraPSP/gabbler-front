import { MessagesSquare, ThumbsDown, ThumbsUp } from "lucide-react";
// import { useEffect, useState } from "react";
// import API_URL from "../config";
// import { TIMESTAMP } from "mysql/lib/protocol/constants/types";

function Gab({ gab }) {
    // const [interactions, setinteractions] = useState([]);

    // useEffect(() => {
    //     const fetchinteractions = async () => {
    //         try {
    //             const response = await fetch(`${API_URL}/interaction/gab/${gab.idGab}`);
    //             const data = await response.json();
    //             setinteractions(data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchinteractions();
    // }, []);

    return (
        <div className="flex flex-row p-3 border-b overflow-auto">
            <img
                src="https://i.imgur.com/4kZ1baN.png"
                alt="Gabbler User Profile Pic"
                className="flex rounded-full bg-cover w-14 h-14"
            />
            <div className="flex flex-col ml-2 my-1">
                <div className="flex flex-row">
                    <span className="text-ash-grey">{gab.user.username}</span>
                    <span className="text-ash-grey ml-2"> {gabDate(gab.createdAt)} </span>
                </div>

                <div className="flex flex-col my-1">
                    <span className="text-ash-grey"> {gab.content} </span>
                </div>

                <div className="flex flex-row my-1">
                    <div className="flex flex-row mr-5 justify-start">
                        <MessagesSquare className="h-4 mr-1"/>
                        <span className="text-ash-grey flex flex-row">0 </span>
                    </div>

                    <div className="flex flex-row mr-5">
                        <ThumbsUp className="h-4 mr-1"/>
                        <span className="text-ash-grey flex flex-row"> {} </span>
                    </div>

                    <div className="flex flex-row mr-5">
                        <ThumbsDown className="h-4 mr-1"/>
                        <span className="text-ash-grey flex flex-row"> {} </span>
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