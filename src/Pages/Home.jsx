import { Link, useNavigate } from "react-router-dom";
import Button from "../component/Button";
import Gab from "../component/Gab";
import API_URL from "../config";
import { useEffect, useState } from "react";
import Loader from "../component/Loader";

function Home() {
  const decodeJWT = (token) => {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  };

  const navigate = useNavigate();

  const [gabInput, setGabInput] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [feed, setFeed] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/signin";
    }
  }, []);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/gab`);
        const data = await response.json();
        setFeed(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeed();
  }, []);

  useEffect(() => {
    if (gabInput.length > 200) {
      setDisplayErrorMessage(true);
    } else {
      setDisplayErrorMessage(false);
    }
  }, [gabInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jwt = localStorage.getItem("token");

    try {
      if (gabInput === "" || gabInput.length > 255) {
        return;
      }

      const response = await fetch(`${API_URL}/gab`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: gabInput,
          user: { idUser: decodeJWT(jwt).jti },
        }),
      });

      const data = await response.json();

      setFeed([data, ...feed]);
      setGabInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col overflow-auto">
      <div className="flex flex-row justify-between">
        <h1 className="p-5 text-2xl">Accueil</h1>
      </div>
      <form className="flex p-3 border-y" onSubmit={handleSubmit}>
        <Link
          to={`/profile/${decodeJWT(localStorage.getItem("token")).jti}`}
          className="w-1/6"
        >
          <img
            src="https://i.imgur.com/4kZ1baN.png"
            alt="Gabbler User Profile Pic"
            className="flex bg-cover rounded-full cursor-pointer w-14 h-14"
          />
        </Link>
        <div className="flex flex-col items-end w-5/6">
          <textarea
            value={gabInput}
            onChange={(e) => setGabInput(e.target.value)}
            maxLength="255"
            name="gabInput"
            id="gabInput"
            placeholder="Ecrivez votre gab ici !"
            required
            className="w-full p-2 overflow-auto bg-transparent resize-none focus:outline-none min-h-fit"
          ></textarea>
          {displayErrorMessage ? (
            <span className="text-red-500"> {255 - gabInput.length}/255 </span>
          ) : null}
          <Button type="submit" className="w-1/4 px-2 py-1">
            Gab !
          </Button>
        </div>
      </form>
      <Loader isLoading={isLoading} />
      {feed.map((gab) => (
        <Gab key={gab.idGab} gab={gab} />
      ))}
    </div>
  );
}

export default Home;
