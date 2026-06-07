import { useState, useEffect } from "react";
import axios from "axios";
import { sejmCache } from "../lib/sejmCache";

const BASE = "http://localhost:5000";

const TTL = {
  leadership:  60 * 60 * 1000, // 60 min
  clubs:       30 * 60 * 1000, // 30 min
  proceedings:  5 * 60 * 1000, //  5 min
  allMps:      30 * 60 * 1000, // 30 min
  mpDetails:   60 * 60 * 1000, // 60 min
};

export function useSejmLeadership() {
  const [data,    setData]    = useState(() => sejmCache.get("leadership") ?? []);
  const [loading, setLoading] = useState(() => !sejmCache.get("leadership"));
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (sejmCache.get("leadership")) return;
    let cancelled = false;
    axios.get(`${BASE}/sejm/leadership`)
      .then(r => {
        const d = r.data ?? [];
        sejmCache.set("leadership", d, TTL.leadership);
        if (!cancelled) setData(d);
      })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

export function useSejmClubs() {
  const [data,    setData]    = useState(() => sejmCache.get("clubs") ?? []);
  const [loading, setLoading] = useState(() => !sejmCache.get("clubs"));
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (sejmCache.get("clubs")) return;
    let cancelled = false;
    axios.get(`${BASE}/sejm/clubs`)
      .then(r => {
        const d = r.data ?? [];
        sejmCache.set("clubs", d, TTL.clubs);
        if (!cancelled) setData(d);
      })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

export function useSejmProceedings() {
  const [data,    setData]    = useState(() => sejmCache.get("proceedings") ?? []);
  const [loading, setLoading] = useState(() => !sejmCache.get("proceedings"));
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (sejmCache.get("proceedings")) return;
    let cancelled = false;
    axios.get(`${BASE}/sejm/proceedings`)
      .then(r => {
        const d = r.data ?? [];
        sejmCache.set("proceedings", d, TTL.proceedings);
        if (!cancelled) setData(d);
      })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

export function useAllMPs() {
  const [data,    setData]    = useState(() => sejmCache.get("all_mps") ?? []);
  const [loading, setLoading] = useState(() => !sejmCache.get("all_mps"));
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (sejmCache.get("all_mps")) return;
    let cancelled = false;
    axios.get(`${BASE}/sejm/mps`)
      .then(r => {
        const mps = r.data ?? [];
        sejmCache.set("all_mps", mps, TTL.allMps);
        mps.forEach(mp => {
          if (!sejmCache.get(`mp:${mp.id}`)) {
            sejmCache.set(`mp:${mp.id}`, { ...mp, _partial: true }, TTL.allMps);
          }
        });
        if (!cancelled) setData(mps);
      })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

/* ── Prefetch pełnych danych posła (np. przy hover na kartę) ─────────────── */
export function prefetchMPDetails(id) {
  if (!id) return;
  const cached = sejmCache.get(`mp:${id}`);
  if (cached && !cached._partial) return; 
  axios.get(`${BASE}/sejm/mp/${id}/details`)
    .then(r => sejmCache.set(`mp:${id}`, r.data, TTL.mpDetails))
    .catch(() => {});
}

/* ── Dane posła ──────────────────────────────────────────────────────────── */
export function useMPDetails(id) {
  const [data,    setData]    = useState(() => id ? (sejmCache.get(`mp:${id}`) ?? null) : null);
  const [loading, setLoading] = useState(() => {
    if (!id) return false;
    const c = sejmCache.get(`mp:${id}`);
    return !c; 
  });
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    const cached = sejmCache.get(`mp:${id}`);

    if (cached && !cached._partial) {
      setData(cached);
      setLoading(false);
      return;
    }

    if (!cached) {
      setLoading(true);
      setData(null);
      setError(null);
    }

    axios.get(`${BASE}/sejm/mp/${id}/details`)
      .then(r => {
        if (!cancelled) {
          sejmCache.set(`mp:${id}`, r.data, TTL.mpDetails);
          setData(r.data);
        }
      })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  return { data, loading, error };
}

function useMPData(id, path) {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true); setData([]); setError(null);
    axios.get(`${BASE}/sejm/mp/${id}/${path}`)
      .then(r  => { if (!cancelled) setData(r.data ?? []); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id, path]);
  return { data, loading, error };
}

export const useMPCommittees       = (id) => useMPData(id, "committees");
export const useMPVotings          = (id) => useMPData(id, "votings");
export const useMPInterpellations  = (id) => useMPData(id, "interpellations");
export const useMPWrittenQuestions = (id) => useMPData(id, "written-questions");

/* ── Auth helper ─────────────────────────────────────────────────────────── */
function authConfig() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return {
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
}

/* ── Oceny posłów ────────────────────────────────────────────────────────── */
export function useMPRating(id) {
  const [ratingData, setRatingData] = useState({ avgRating: null, count: 0, distribution: [0,0,0,0,0], userRating: null });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    axios.get(`${BASE}/sejm/mp/${id}/rating`, authConfig())
      .then(r => { if (!cancelled) setRatingData(r.data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  const rate = async (rating, club) => {
    setSubmitting(true);
    try {
      const res = await axios.post(
        `${BASE}/sejm/mp/${id}/rate`,
        { rating, club },
        authConfig()
      );
      setRatingData(res.data);
      return res.data;
    } finally {
      setSubmitting(false);
    }
  };

  return { ...ratingData, loading, submitting, rate };
}
