import { Link, useNavigate } from "react-router-dom";
import Button from "../component/Button";
import API_URL from "../config";
import { useState } from "react";

function SignIn() {
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(e.target.password.value);
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });
      const data = await response.json();
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        navigate("/");
      } else {
        setDisplayErrorMessage(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row justify-center border-b">
        <h1 className="p-5 text-2xl">Connexion</h1>
      </div>
      <div className="flex flex-col justify-center h-full">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <label className="text-ash-grey">Nom d'utilisateur</label>
            <input
              className="px-3 py-1 m-2 bg-transparent border rounded-full text-ash-grey border-ash-grey"
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              required
            />

            <label className="text-ash-grey">Mot de passe</label>
            <input
              className="px-3 py-1 m-2 bg-transparent border rounded-full text-ash-grey border-ash-grey"
              type="password"
              name="password"
              placeholder="Mot de passe"
              required
            />

            <Button className="px-10 py-1 m-2" type="submit" value="Login">
              Connexion
            </Button>
            {displayErrorMessage && (
              <p className="text-red-500">Nom d'utilisateur ou mot de passe incorrect</p>
            )}
          </div>
        </form>
        <div className="flex flex-col items-center justify-center">
          <p className="text-ash-grey">Pas encore de compte ?</p>
          <Link className="px-10 py-1 m-2" to={"/signup"}>
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
