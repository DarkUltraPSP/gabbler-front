import Button from "../component/Button";
import Gab from "../component/Gab";
import API_URL from "../config";
import { useEffect, useState } from "react";

function Home() {
  const decodeJWT = (token) => {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  };

  const [gabInput, setGabInput] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

 const [feed, setFeed] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/signin";
    }
  }, []);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(`${API_URL}/gab`);
        const data = await response.json();
        setFeed(data);
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
          user : { idUser : decodeJWT(jwt).jti}
        }),
      });
      const data = await response.json();
      setFeed([data, ...feed]);
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col overflow-auto">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl p-5">Accueil</h1>
      </div>
      <form className="flex border-y" onSubmit={handleSubmit}>
        <div className="w-1/6 p-3">
        <img
                src="https://i.imgur.com/4kZ1baN.png"
                alt="Gabbler User Profile Pic"
                className="flex rounded-full bg-cover w-14 h-14"
            />
        </div>
        <div className=" flex flex-col w-5/6 items-end">
          <textarea onChange={(e) => setGabInput(e.target.value)} maxLength="255" name="gabInput" id="gabInput" placeholder="Ecrivez votre gab ici !" className="bg-transparent resize-none w-full focus:outline-none p-2 min-h-fit overflow-hidden"></textarea>
          { displayErrorMessage ? <span className="text-red-500"> {255 - gabInput.length}/255 </span> : null}
          <Button type="submit" className="w-1/4 px-2 py-1 m-2"> Gab ! </Button>
        </div>
        </form>
        {feed.map((gab) => (
          <Gab
            gab={gab}
          />
        ))}
    </div>
  );
}

export default Home;
