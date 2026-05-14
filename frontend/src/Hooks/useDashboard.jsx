import { useEffect, useState } from "react";
import axios from "axios";

export default function useDashboard(user, tiles, setTiles, setInfoMessage) {
  const [savedTiles, setSavedTiles] = useState([]);
  const [infoType, setInfoType] = useState("success");

  const loadSavedLayout = async () => {
    if (!user?.id) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/user_tiles/${user.id}`,
      );

      const dbTiles = res.data.tiles || [];

      setTiles(dbTiles);
      setSavedTiles(dbTiles);
    } catch (error) {
      setTiles([]);
      setSavedTiles([]);
    }
  };

  const saveLayout = async () => {
    try {
      await axios.post("http://localhost:5000/user_tiles", {
        userId: user.id,
        tiles,
      });

      setSavedTiles(tiles);
      setInfoType("success");
      setInfoMessage("Układ został zapisany.");
    } catch (error) {
      setInfoType("error");
      setInfoMessage(error.response?.data?.message || "Błąd zapisu układu.");
    }
  };

  const hasUnsavedChanges =
    JSON.stringify(tiles || []) !== JSON.stringify(savedTiles || []);

  useEffect(() => {
    loadSavedLayout();
  }, [user?.id]);

  return {
    loadSavedLayout,
    saveLayout,
    hasUnsavedChanges,
    infoType,
    savedTiles,
  };
}
