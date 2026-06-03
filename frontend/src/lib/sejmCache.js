const store = new Map();

export const sejmCache = {
  get(key) {
    const e = store.get(key);
    if (!e) return null;
    if (Date.now() > e.exp) { store.delete(key); return null; }
    return e.data;
  },
  set(key, data, ttlMs = 10 * 60 * 1000) {
    store.set(key, { data, exp: Date.now() + ttlMs });
  },
};
