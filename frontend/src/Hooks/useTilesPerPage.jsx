import { useState, useEffect } from "react";

export default function useTilesPerPage() {
  const [tilesPerPage, setTilesPerPage] = useState(getTiles());

  function getTiles() {
    if (window.matchMedia("(min-width:1100px)").matches) return 12;
    if (window.matchMedia("(min-width:900px)").matches) return 10;
    if (window.matchMedia("(min-width:768px)").matches) return 8;
    return 5;
  }

  useEffect(() => {
    const handleResize = () => setTilesPerPage(getTiles());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return tilesPerPage;
}