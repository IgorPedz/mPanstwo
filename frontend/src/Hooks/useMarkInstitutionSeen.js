import { useEffect } from "react";
import { useUser } from "../Contexts/UserContext";
import { useFollowStore } from "../store/useFollowStore";

const API = "http://localhost:5000";

export function useMarkInstitutionSeen(institutionId, news) {
  const { user } = useUser();
  const isFollowed = useFollowStore((s) => s.isFollowed(institutionId));

  useEffect(() => {
    if (!user?.id || !isFollowed || !news?.length) return;

    const latestUrl = news[0]?.url;
    if (!latestUrl) return;

    fetch(`${API}/follows/${encodeURIComponent(institutionId)}/seen`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, latestUrl }),
    }).catch(() => {});
  }, [user?.id, institutionId, isFollowed, news]);
}
