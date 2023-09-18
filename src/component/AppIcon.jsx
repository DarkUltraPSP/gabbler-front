import { Link } from "react-router-dom";
import GabblerLogoCropped from "../GabblerLogoCropped.png";

export default function AppIcon() {
  return (
    <Link to="/" className="flex justify-end w-100">
      <img
        src={GabblerLogoCropped}
        alt="Gabbler Logo"
        className="flex cursor-pointer w-14"
      />
    </Link>
  );
}
