import { useState, useEffect } from "react";
import axios from "axios";

export function useMinistryNews(slug) {
  const [news,    setNews]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5000/news/${slug}`)
      .then(res => {
        if (!cancelled) setNews(res.data.items ?? []);
      })
      .catch(err => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  return { news, loading, error };
}
