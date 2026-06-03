import { memo, useState } from "react";
import { CLUB_HEX } from "./Hemicycle";

function ClubLogo({ id, name, size = "md" }) {
  const [hasError, setHasError] = useState(false);

  const dimensions = size === "lg" ? "h-12 w-12" : "h-8 w-8";

  if (hasError) {
    return (
      <div
        className={`${dimensions} rounded-lg flex items-center justify-center text-white font-black text-[10px]`}
        style={{ background: CLUB_HEX[id] ?? "#94a3b8" }}
      >
        {id.slice(0, 2)}
      </div>
    );
  }

  return (
    <img
      src={`http://localhost:5000/sejm/clubs/${encodeURIComponent(id)}/logo`}
      alt={name}
      onError={() => setHasError(true)}
      className={`${dimensions} object-contain rounded-lg`}
    />
  );
}

export default memo(ClubLogo);
