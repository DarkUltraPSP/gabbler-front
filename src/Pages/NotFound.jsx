import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl">404</h1>
      <p>Page not found</p>
      <Link
        to="/"
        className="block px-4 py-2 mx-auto mt-8 rounded-full w-max bg-purple-taupe"
      >
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
