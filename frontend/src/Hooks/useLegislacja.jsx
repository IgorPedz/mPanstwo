import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { sejmCache } from "../lib/sejmCache";

const BASE = "http://localhost:5000";
const BILLS_TTL = 30 * 60 * 1000;

function authConfig() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return {
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
}

function billsKey(page, limit, search, type) {
  return `legislation_bills:${page}:${limit}:${search}:${type}`;
}

export function useBills({ page = 0, limit = 20, search = "", type = "all" } = {}) {
  const [data,    setData]    = useState({ items: [], total: 0, page: 0, limit: 20 });
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    const key = billsKey(page, limit, search, type);
    const cached = sejmCache.get(key);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    const params = new URLSearchParams({ page, limit, search, type }).toString();
    axios.get(`${BASE}/legislation/bills?${params}`)
      .then(r  => {
        if (!cancelled) {
          sejmCache.set(key, r.data, BILLS_TTL);
          setData(r.data);
        }
      })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [page, limit, search, type]);

  return { ...data, loading, error };
}

export function useBillDetails(num) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!num) return;
    let cancelled = false;
    setLoading(true); setData(null); setError(null);
    axios.get(`${BASE}/legislation/bills/${num}`)
      .then(r  => { if (!cancelled) setData(r.data); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [num]);

  return { data, loading, error };
}

export function useLegislativeProcess(num) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!num) return;
    let cancelled = false;
    setLoading(true);
    axios.get(`${BASE}/legislation/bills/${num}/process`)
      .then(r  => { if (!cancelled) setData(r.data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [num]);

  return { data, loading };
}

export function useBillVotings(num) {
  const [votings, setVotings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!num) return;
    let cancelled = false;
    setLoading(true);
    axios.get(`${BASE}/legislation/bills/${num}/votings`)
      .then(r  => { console.log("[useBillVotings]", num, r.data); if (!cancelled) setVotings(r.data ?? []); })
      .catch(e => { console.log("[useBillVotings] error", e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [num]);

  return { votings, loading };
}

export function useBillVotingDetail(sitting, votNum) {
  const [detail,  setDetail]  = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sitting || !votNum) return;
    let cancelled = false;
    setDetail(null);
    setLoading(true);
    axios.get(`${BASE}/legislation/votings/${sitting}/${votNum}`)
      .then(r  => { if (!cancelled) setDetail(r.data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [sitting, votNum]);

  return { detail, loading };
}

export function useOpinions(num) {
  const [opinions,   setOpinions]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState(null);

  useEffect(() => {
    if (!num) return;
    let cancelled = false;
    setLoading(true);
    axios.get(`${BASE}/legislation/bills/${num}/opinions`)
      .then(r  => { if (!cancelled) setOpinions(r.data ?? []); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [num]);

  const postOpinion = useCallback(async (content) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await axios.post(
        `${BASE}/legislation/bills/${num}/opinions`,
        { content },
        authConfig()
      );
      if (res.data.opinions) setOpinions(res.data.opinions);
      return { success: true };
    } catch (e) {
      const msg = e.response?.data?.error ?? "Nie udało się dodać opinii";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setSubmitting(false);
    }
  }, [num]);

  return { opinions, loading, submitting, error, postOpinion };
}
