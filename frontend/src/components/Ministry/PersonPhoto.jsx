import { useState, useEffect } from "react";

export default function PersonPhoto({ name, src, className, initialsClass }) {
  const [photoUrl, setPhotoUrl] = useState(src || null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (src) { setPhotoUrl(src); return; }
    if (!name) return;

    const controller = new AbortController();
    const params = new URLSearchParams({
      action: "query", titles: name, prop: "pageimages",
      format: "json", pithumbsize: "400", origin: "*",
    });
    fetch(`https://pl.wikipedia.org/w/api.php?${params}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const page = Object.values(data?.query?.pages ?? {})[0];
        if (page?.thumbnail?.source) setPhotoUrl(page.thumbnail.source);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [name, src]);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`${className} bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden color-transition`}>
      {photoUrl && !imgError ? (
        <img
          src={photoUrl}
          alt={name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-hover:brightness-105"
          style={{ objectPosition: "center 15%" }}
        />
      ) : (
        <span className={`font-black select-none ${initialsClass}`}>{initials}</span>
      )}
    </div>
  );
}
