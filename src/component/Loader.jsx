import { LoaderIcon } from "lucide-react";
import React from "react";

export default function Loader({ isLoading }) {
  return isLoading ? (
    <span className="flex items-center justify-center gap-4 py-4 text-center">
      <LoaderIcon className="animate-spin" /> Chargement des Gabs...
    </span>
  ) : null;
}
