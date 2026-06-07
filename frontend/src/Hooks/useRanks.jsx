import { useEffect, useState } from "react";
import axios from "axios";
import { Icons } from "../Utils/Dynamic/RankIcons";

export const useRanks = () => {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRanks = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("http://localhost:5000/ranks", {
          signal: controller.signal, 
        });

        if (!Array.isArray(res.data)) {
          throw new Error("Dane z serwera nie są tablicą");
        }

        const mapped = res.data
          .sort((a, b) => Number(a.level) - Number(b.level))
          .map((rank) => {
            const level = Number(rank.level);
            const slug =
              rank.slug ||
              (typeof rank.name === "string" &&
              rank.name.toLowerCase().startsWith("rank")
                ? rank.name
                : `rank${level}`);

            return {
              id: rank.id,
              level,
              slug,
              nameKey: rank.nameKey || `achievements.ranks.${slug}.name`,
              xpKey: rank.xpKey || `achievements.ranks.${slug}.xp`,
              descriptionKey:
                rank.descriptionKey || `achievements.ranks.${slug}.desc`,
              icon: Icons[`rank${level}`] || Icons.rank1,
              color: rank.color || "bg-slate-500",
            };
          });

        setRanks(mapped);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRanks();

    return () => {
      controller.abort();
    };
  }, []);

  return { ranks, loading, error };
};
