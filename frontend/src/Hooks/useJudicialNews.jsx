import { useState, useEffect } from "react";
import axios from "axios";

const BASE = "http://localhost:5000";

export function useJudicialNews(slug) {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setData([]);
    axios.get(`${BASE}/judicial/news/${slug}`)
      .then(r  => { if (!cancelled) setData(r.data ?? []); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(()=> { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);

  return { data, loading, error };
}
