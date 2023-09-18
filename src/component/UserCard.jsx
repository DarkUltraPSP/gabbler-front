import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div className="flex flex-row p-3 overflow-auto border-b">
      <Link to={`/profile/${user.idUser}`} className="flex flex-col justify-center w-1/6">
        <img
          alt={user.username}
          src={"/uploads/" + user.profilePictureUrl}
          className="flex bg-cover rounded-full cursor-pointer w-14 h-14"
        />
      </Link>
      <div className="flex flex-col w-5/6 ml-2">
        <div className="flex justify-between">
          <div className="flex">
            <Link
              className="font-bold cursor-pointer text-ash-grey hover:underline"
              to={`/profile/${user.idUser}`}
            >
              {user.username}
            </Link>
          </div>
        </div>

        <div className="flex flex-col my-1">
          <span className="text-ash-grey"> {user.biography} </span>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
