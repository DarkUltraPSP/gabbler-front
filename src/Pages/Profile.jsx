import React from "react";
import { useEffect, useState } from "react";
import API_URL from "../config";
import Gab from "../component/Gab";
import Button from "../component/Button";

function Profile() {
    const userId = window.location.href.split("/")[4];
    const [user, setUser] = useState({});
    const [feed, setFeed] = useState([]);

    const decodeJWT = (token) => {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = atob(payloadBase64);
        return JSON.parse(decodedPayload);
    };

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            window.location.href = "/signin";
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${API_URL}/user/${userId}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const response = await fetch(`${API_URL}/gab/user/${userId}`);
                const data = await response.json();
                setFeed(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFeed();
    }, []);

    return (
        <div className="flex flex-col overflow-auto">
            <div className="flex flex-row justify-between border-b py-2 px-5">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold"> {user.username} </h1>
                    <div className="text-sm my-1"> {feed.length} Gabs </div>
                </div>
                <div className="flex py-4">
                    {userId === decodeJWT (localStorage.getItem("token")).jti ? (
                        <Button onClick={() => window.location.href = "/profile/edit"} className="px-5 py-1">Modifier le profil</Button>
                    ) : (
                        <Button className="px-5 py-1">Suivre</Button>
                    )}
                </div>
            </div>
            <div className="flex flex-col h-32">
                <img src="/uploads/test.jpg" className="object-cover w-full h-full" />
            </div>
            <div className="flex flex-row border-b py-2 px-5">
                <div className="flex bg-cover w-28 h-28">
                    <img src={"/uploads/" + user.bannerPictureUrl} className="object-cover w-full h-full rounded-lg" />
                </div>
                <div className="flex text-sm p-3"> {user.biography} </div>
            </div>
            {feed.map((gab) => (
                <Gab key={gab.idGab} gab={gab} />
            ))}
        </div>
    );
}

export default Profile;