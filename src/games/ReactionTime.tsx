import { useState, useEffect, useRef, useCallback } from "react";

const ReactionTime = () => {
  const [state, setState] = useState<"waiting" | "ready" | "go" | "done">("waiting");
  const [time, setTime] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const startRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const start = useCallback(() => {
    setState("ready");
    const delay = 2000 + Math.random() * 3000;
    timeoutRef.current = setTimeout(() => {
      setState("go");
      startRef.current = Date.now();
    }, delay);
  }, []);

  const handleClick = () => {
    if (state === "waiting") {
      start();
    } else if (state === "ready") {
      clearTimeout(timeoutRef.current);
      setState("waiting");
      setTime(-1); // Too early
    } else if (state === "go") {
      const elapsed = Date.now() - startRef.current;
      setTime(elapsed);
      setState("done");
      if (!best || elapsed < best) setBest(elapsed);
    } else {
      start();
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const getBg = () => {
    switch (state) {
      case "waiting": return "hsl(240 12% 8%)";
      case "ready": return "hsl(0 70% 30%)";
      case "go": return "hsl(150 100% 30%)";
      case "done": return "hsl(240 12% 8%)";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {best && (
        <p className="font-display text-xs text-muted-foreground tracking-wider">
          BEST: <span className="text-neon-green">{best}ms</span>
        </p>
      )}
      <button
        onClick={handleClick}
        className="w-full h-48 rounded-2xl font-display font-bold tracking-wider transition-all duration-300 border-cosmic text-foreground"
        style={{ backgroundColor: getBg() }}
      >
        {state === "waiting" && (time === -1 ? "TOO EARLY! TAP TO RETRY" : "TAP TO START")}
        {state === "ready" && "WAIT..."}
        {state === "go" && "TAP NOW!"}
        {state === "done" && `${time}ms — TAP TO RETRY`}
      </button>
    </div>
  );
};

export default ReactionTime;
