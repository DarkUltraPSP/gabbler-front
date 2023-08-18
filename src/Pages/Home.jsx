import Button from "../component/Button";
import { useEffect, useState } from "react";

function Home() {
  const [gabInput, setGabInput] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  useEffect(() => {
    if (gabInput.length > 200) {
      setDisplayErrorMessage(true);
    } else {
      setDisplayErrorMessage(false);
    }
  }, [gabInput]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl p-5">Home</h1>
      </div>
      <form className="flex border-y">
        <div className="w-1/6">
          
        </div>
        <div className=" flex flex-col w-5/6 items-end">
          <textarea onChange={(e) => setGabInput(e.target.value)} maxLength="255" name="gabInput" id="gabInput" placeholder="Ecrivez votre gab ici !" className="bg-transparent resize-none w-full focus:outline-none p-2 min-h-fit overflow-hidden "></textarea>
          { displayErrorMessage ? <span className="text-red-500"> {255 - gabInput.length}/255 </span> : null}
          <Button type="submit" className="w-1/4 p-2 m-2"> Gab ! </Button>
        </div>
        </form>
    </div>
  );
}

export default Home;
