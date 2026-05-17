import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";

export function useGlobalAchievements() {
  const { user } = useUser();

  const [achievements, setAchievements] = useState([]);
  const [categories, setCategories] = useState([]);
  const [progression, setProgression] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      try {
        const [achievementsRes, progressionRes, categoriesRes] =
          await Promise.all([
            axios.get(`http://localhost:5000/achievements/${user.id}`),
            axios.get(`http://localhost:5000/progression/${user.id}`),
            axios.get("http://localhost:5000/category"),
          ]);

        setAchievements(achievementsRes.data);
        setProgression(progressionRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Achievements fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  return {
    achievements,
    categories,
    progression,
    loading,
  };
}