import { useState, useEffect } from "react";
import axios from "axios";

const BASE = "http://localhost:5000";

export function useSejmLeadership() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    axios.get(`${BASE}/sejm/leadership`)
      .then(r  => { if (!cancelled) setData(r.data ?? []); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(()=> { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

export function useSejmClubs() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    axios.get(`${BASE}/sejm/clubs`)
      .then(r  => { if (!cancelled) setData(r.data ?? []); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(()=> { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

export function useSejmProceedings() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    axios.get(`${BASE}/sejm/proceedings`)
      .then(r  => { if (!cancelled) setData(r.data ?? []); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(()=> { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
