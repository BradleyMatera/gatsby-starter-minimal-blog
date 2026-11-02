import * as React from "react";

export const useRecruiterFilter = (key: string, fallback = "All") => {
  const [value, setValue] = React.useState(fallback);
  React.useEffect(() => {
    const sync = () => setValue(new URLSearchParams(window.location.search).get(key) || fallback);
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("gatsby-route-update", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("gatsby-route-update", sync);
    };
  }, [key, fallback]);
  const update = (next: string) => {
    setValue(next);
    const url = new URL(window.location.href);
    if (next === fallback || !next) url.searchParams.delete(key);
    else url.searchParams.set(key, next);
    window.history.replaceState(window.history.state, "", url);
  };
  return [value, update] as const;
};
