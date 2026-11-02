import * as React from "react";

export const useUrlState = <T extends Record<string, string>>(defaults: T) => {
  const initial = React.useRef(defaults);
  const [state, setState] = React.useState<T>(defaults);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const read = () => {
      const params = new URLSearchParams(window.location.search);
      const next = { ...initial.current };
      Object.keys(next).forEach((key) => {
        next[key as keyof T] = (params.get(key) ?? initial.current[key]) as T[keyof T];
      });
      setState(next);
    };
    read();
    setReady(true);
    window.addEventListener("popstate", read);
    window.addEventListener("gatsby-route-update", read);
    return () => {
      window.removeEventListener("popstate", read);
      window.removeEventListener("gatsby-route-update", read);
    };
  }, []);

  const update = React.useCallback((changes: Partial<T>, replace = false) => {
    const next = { ...state, ...changes };
    setState(next);
    const url = new URL(window.location.href);
    Object.keys(initial.current).forEach((key) => {
      if (next[key] && next[key] !== initial.current[key]) url.searchParams.set(key, next[key]);
      else url.searchParams.delete(key);
    });
    if (url.href !== window.location.href) {
      window.history[replace ? "replaceState" : "pushState"](window.history.state, "", url);
    }
  }, [state]);

  return [state, update, ready] as const;
};
