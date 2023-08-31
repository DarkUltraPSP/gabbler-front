import Button from "../component/Button";
import API_URL from "../config";

function SignUp() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    firstname: e.target.firstname.value,
                    lastname: e.target.lastname.value,
                    email: e.target.email.value,
                    birthdate: e.target.birthdate.value,
                    phone: e.target.phone.value,
                    password: e.target.password.value,
                })
            });
            const data = await response.json();
            if (data.error) {
                alert(data.error);
            }
            else {
                window.location.href = "/signin";
            }
        } catch (error) {
            console.error(error);
        }
    };


    
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-row justify-center border-b">
                <h1 className="text-2xl p-5">Inscription</h1>
            </div>
            <div className="flex flex-col h-full justify-center">
                <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                  <div className="flex flex-col justify-center items-center h-full">

                    <label className="text-ash-grey">Nom</label>
                    <input className="bg-transparent text-ash-grey border-ash-grey border rounded-full py-1 px-3 m-2" type="text" name="lastname" required/>

                    <label className="text-ash-grey">Prénom</label>
                    <input className="bg-transparent text-ash-grey border-ash-grey border rounded-full py-1 px-3 m-2" type="text" name="firstname" required/>

                    <label className="text-ash-grey">Date de naissance</label>
                    <input className="bg-transparent text-ash-grey border-ash-grey border rounded-full py-1 px-3 m-2" type="date" name="birthdate" />

                    <label className="text-ash-grey">Email</label>
                    <input className="bg-transparent text-ash-grey border-ash-grey border rounded-full py-1 px-3 m-2" type="email" name="email" required/>

                    <label className="text-ash-grey">Téléphone</label>
                    <input className="bg-transparent text-ash-grey border-ash-grey border rounded-full py-1 px-3 m-2" type="tel" name="phone"/>

                    <label className="text-ash-grey">Nom d'utilisateur</label>
                    <input className="bg-transparent text-ash-grey border-ash-grey border rounded-full py-1 px-3 m-2" type="text" name="username" required/>

                    <label className="text-ash-grey">Mot de passe</label>
                    <input className="bg-transparent text-ash-grey border-ash-grey border rounded-full py-1 px-3 m-2" type="password" name="password" required/>

                    <label className="text-ash-grey">Confirmer le mot de passe</label>
                    <input className="bg-transparent text-ash-grey border-ash-grey border rounded-full py-1 px-3 m-2" type="password" name="passwordConf" required/>

                    <Button className="py-1 px-10 m-2" type="submit" value="Login"> S'inscrire </Button>
                  </div>
                </form>
                
            </div>
        </div>
    );
}

export default SignUp;