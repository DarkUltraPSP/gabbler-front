import { MessagesSquare, ThumbsDown, ThumbsUp, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import API_URL from "../config";
import { Link, useNavigate } from "react-router-dom";
// import { TIMESTAMP } from "mysql/lib/protocol/constants/types";

const generateInteractionBody = (interactionType, gab, user) => {
  return {
    user: {
      idUser: user.idUser,
    },
    gab: {
      idGab: gab.idGab,
    },
    interactionType: {
      idInteractionType: interactionType,
    },
  };
};

function Gab({ gab }) {
  const [interactions, setInteractions] = useState({
    likes: [],
    dislikes: [],
  });
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const likeGab = () => {
    if (
      interactions.likes.find(
        (like) => like.user.idUser == decodeJWT(localStorage.getItem("token")).jti
      ) ||
      interactions.dislikes.find(
        (dislike) => dislike.user.idUser == decodeJWT(localStorage.getItem("token")).jti
      )
    ) {
      return;
    }

    fetch(`${API_URL}/interaction`, {
      method: "POST",
      body: JSON.stringify(generateInteractionBody(1, gab, gab.user)),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token").jti}`,
      },
    });

    navigate(0);
  };

  const dislikeGab = () => {
    if (
      interactions.dislikes.find(
        (dislike) => dislike.user.idUser == decodeJWT(localStorage.getItem("token")).jti
      ) ||
      interactions.likes.find(
        (like) => like.user.idUser == decodeJWT(localStorage.getItem("token")).jti
      )
    ) {
      return;
    }

    fetch(`${API_URL}/interaction`, {
      method: "POST",
      body: JSON.stringify(generateInteractionBody(2, gab, gab.user)),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token").jti}`,
      },
    });

    navigate(0);
  };

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const { interactions: likes } = await fetch(
          `${API_URL}/interaction/like/${gab.idGab}`
        ).then((res) => res.json());
        const { interactions: dislikes } = await fetch(
          `${API_URL}/interaction/dislike/${gab.idGab}`
        ).then((res) => res.json());

        setInteractions({ likes, dislikes });
      } catch (error) {
        console.error(error);
      }
    };
    fetchInteractions();
  }, []);

  const deleteGab = async () => {
    try {
      await fetch(`${API_URL}/gab/${gab.idGab}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const decodeJWT = (token) => {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  };

  return (
    <div className="flex p-3 overflow-auto border-b">
      <Link
        to={`/profile/${gab.user.idUser}`}
        className="flex flex-col justify-center w-1/6"
      >
        <img
          alt={gab.user.username}
          src={"/uploads/" + gab.user.profilePictureUrl}
          className="flex bg-cover rounded-full cursor-pointer w-14 h-14"
        />
      </Link>
      <div className="flex flex-col w-5/6 ml-2">
        <div className="flex justify-between">
          <div className="flex">
            <Link
              className="font-bold cursor-pointer text-ash-grey hover:underline"
              to={`/profile/${gab.user.idUser}`}
            >
              {gab.user.username}
            </Link>
            <span className="ml-2 text-ash-grey"> {gabDate(gab.createdAt)} </span>
          </div>
          <div className="flex">
            {gab.user.idUser == decodeJWT(localStorage.getItem("token")).jti ? (
              <div className="flex cursor-pointer">
                <Trash2
                  strokeWidth="1"
                  size={20}
                  className="duration-150 ease-in-out hover:text-red-900"
                  onClick={deleteGab}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col my-1">
          <span className="text-ash-grey"> {gab.content} </span>
        </div>

        <div className="flex my-1">
          <button className="flex items-center justify-center p-1 mr-5 rounded-full hover:bg-gray-400/50">
            <MessagesSquare className="h-4" />
            <span className="flex text-ash-grey">0</span>
          </button>

          <button
            className={`flex items-center justify-center p-1 mr-5 rounded-full hover:bg-green-400/25 ${
              interactions.likes.find(
                (like) => like.user.idUser == decodeJWT(localStorage.getItem("token")).jti
              ) && "text-green-500"
            }`}
            onClick={() => likeGab()}
          >
            <ThumbsUp className="h-4" />
            <span className="flex text-ash-grey">{interactions.likes.length}</span>
          </button>

          <button
            className={`flex items-center justify-center p-1 mr-5 rounded-full hover:bg-red-400/25 ${
              interactions.dislikes.find(
                (dislike) =>
                  dislike.user.idUser == decodeJWT(localStorage.getItem("token")).jti
              ) && "text-red-500"
            }`}
            onClick={() => dislikeGab()}
          >
            <ThumbsDown className="h-4" />
            <span className="flex text-ash-grey"> {interactions.dislikes.length} </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gab;

function gabDate(gabDate) {
  return new Date(gabDate).toLocaleDateString();
}
