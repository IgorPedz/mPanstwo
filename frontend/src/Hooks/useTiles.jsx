import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function useTiles() {
  const { t } = useTranslation();
  const [tiles, setTiles] = useState([]);
  const [availableTiles, setAvailableTiles] = useState([]);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("mpanstwo-tiles");
    if (saved) setTiles(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("mpanstwo-tiles", JSON.stringify(tiles));
  }, [tiles]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/dashboard_content");
        setAvailableTiles(res.data);
      } catch (err) {
        setInfoMessage(err.response?.data?.message || t("common.messages.errorOccurred"));
      }
    };
    fetchData();
  }, []);

  return { tiles, setTiles, availableTiles, infoMessage, setInfoMessage };
}