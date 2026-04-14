import { useEffect, useState } from "react";
import axios from "axios";

export default function useDashboard(user, tiles, setTiles, setInfoMessage) {
    const [savedTiles, setSavedTiles] = useState(null);
    const [infoType, setInfoType] = useState("success");

    const loadSavedLayout = async () => {
        if (!user?.id) return;

        try {
            const res = await axios.get(
                `http://localhost:5000/user_tiles/${user.id}`
            );

            if (Array.isArray(res.data.tiles)) {
                setTiles(res.data.tiles);
                setSavedTiles(res.data.tiles);

                setInfoType("success");
                setInfoMessage("Wczytano zapisany układ.");
            }
        } catch (error) {
            if (error.response?.status === 404) {
                setSavedTiles(tiles);
            } else {
                setInfoType("error");
                setInfoMessage(
                    error.response?.data?.message ||
                        "Błąd wczytywania układu."
                );
            }
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
            setInfoMessage(
                error.response?.data?.message || "Błąd zapisu układu."
            );
        }
    };

    const hasUnsavedChanges =
        savedTiles !== null &&
        JSON.stringify(tiles) !== JSON.stringify(savedTiles);

    useEffect(() => {
        loadSavedLayout();
    }, [user?.id]);

    return {
        loadSavedLayout,
        saveLayout,
        hasUnsavedChanges,
        infoType,
    };
}