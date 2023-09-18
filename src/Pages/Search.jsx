import { LucideSearch } from "lucide-react";
import Button from "../component/Button";
import { useEffect, useState } from "react";
import API_URL from "../config";
import Gab from "../component/Gab";
import UserCard from "../component/UserCard";
import Loader from "../component/Loader";

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [feed, setFeed] = useState([]);
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target?.search?.value === "") return;

    fetchFeedAndUsers(e.target?.search?.value);
  };

  const fetchFeedAndUsers = async (search) => {
    try {
      setIsLoading(true);

      const gabs = await fetch(`${API_URL}/gab/content/${search}`).then((res) =>
        res.json()
      );
      const users = await fetch(`${API_URL}/user/username/${search}`).then((res) =>
        res.json()
      );

      setFeed(gabs);
      setUsers(users);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col overflow-auto">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          className="w-full px-3 py-1 m-2 bg-transparent border rounded-full text-ash-grey border-ash-grey"
          type="text"
          name="search"
          placeholder="Rechercher..."
          required
        />
        <Button className="p-2 my-2 mr-2 rounded-full" type="submit" value="Search">
          <LucideSearch />
        </Button>
      </form>

      <Loader isLoading={isLoading} />

      {users && users.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="p-5 text-2xl">Aucun utilisateur trouvé</h1>
        </div>
      )}

      {feed && feed.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="p-5 text-2xl">Aucun gab trouvé</h1>
        </div>
      )}

      <hr />

      {users && users.length > 0 && (
        <div className="flex flex-col">
          <h1 className="p-5 text-2xl">Utilisateurs</h1>

          {users.map((user) => (
            <UserCard key={user.idUser} user={user} />
          ))}
        </div>
      )}

      <hr />

      {feed && feed.length > 0 && (
        <div className="flex flex-col">
          <h1 className="p-5 text-2xl">Gabs</h1>

          {feed.map((gab) => (
            <Gab key={gab.idGab} gab={gab} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
