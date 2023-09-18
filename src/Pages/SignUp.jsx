import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import API_URL from "../config";

function SignUp() {
  const navigate = useNavigate();

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
        }),
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row justify-center border-b">
        <h1 className="p-5 text-2xl">Inscription</h1>
      </div>
      <div className="flex flex-col justify-center h-full">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <label className="text-ash-grey">Nom</label>
            <input
              className="px-3 py-1 m-2 bg-transparent border rounded-full text-ash-grey border-ash-grey"
              type="text"
              name="lastname"
              required
            />

            <label className="text-ash-grey">Prénom</label>
            <input
              className="px-3 py-1 m-2 bg-transparent border rounded-full text-ash-grey border-ash-grey"
              type="text"
              name="firstname"
              required
            />

            <label className="text-ash-grey">Date de naissance</label>
            <input
              className="px-3 py-1 m-2 bg-transparent border rounded-full text-ash-grey border-ash-grey"
              type="date"
              name="birthdate"
            />

            <label className="text-ash-grey">Email</label>
            <input
              className="px-3 py-1 m-2 bg-transparent border rounded-full text-ash-grey border-ash-grey"
              type="email"
              name="email"
              required
            />

            <label className="text-ash-grey">Téléphone</label>
            <input
              className="px-3 py-1 m-2 bg-transparent border rounded-full text-ash-grey border-ash-grey"
              type="tel"
              name="phone"
            />

            <label className="text-ash-grey">Nom d'utilisateur</label>
            <input
              className="px-3 py-1 m-2 bg-transparent border rounded-full text-ash-grey border-ash-grey"
              type="text"
              name="username"
              required
            />

            <label className="text-ash-grey">Mot de passe</label>
            <input
              className="px-3 py-1 m-2 bg-transparent border rounded-full text-ash-grey border-ash-grey"
              type="password"
              name="password"
              required
            />

            <label className="text-ash-grey">Confirmer le mot de passe</label>
            <input
              className="px-3 py-1 m-2 bg-transparent border rounded-full text-ash-grey border-ash-grey"
              type="password"
              name="passwordConf"
              required
            />

            <Button className="px-10 py-1 m-2" type="submit" value="Login">
              {" "}
              S'inscrire{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
