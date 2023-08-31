import Button from "../component/Button";
import API_URL from "../config";
import {useState } from "react";

function SignIn() {
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
    
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
                window.location.href = "/";
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
                <h1 className="text-2xl p-5">Connexion</h1>
            </div>
            <div className="flex flex-col h-full justify-center">
                <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                  <div className="flex flex-col justify-center items-center h-full">
                    <label className="text-ash-grey">Nom d'utilisateur</label>
                    <input className="bg-transparent text-ash-grey border-ash-grey border rounded-full py-1 px-3 m-2" type="text" name="username" placeholder="Nom d'utilisateur" required/>

                    <label className="text-ash-grey">Mot de passe</label>
                    <input className="bg-transparent text-ash-grey border-ash-grey border rounded-full py-1 px-3 m-2" type="password" name="password" placeholder="Mot de passe" required/>

                    <Button className="py-1 px-10 m-2" type="submit" value="Login"> Connexion</Button>
                    {displayErrorMessage && (
                        <p className="text-red-500">Nom d'utilisateur ou mot de passe incorrect</p>
                    )}
                  </div>
                </form>
                <div class="flex flex-col justify-center items-center">
                    <p className="text-ash-grey">Pas encore de compte ?</p>
                    <Button className="py-1 px-10 m-2" onClick={() => window.location.href = "/signup"}> S'inscrire</Button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
