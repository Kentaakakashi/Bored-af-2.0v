import { useState } from "react";

const TruthOrDare = () => {
  const TRUTHS = [
    "What's the most embarrassing song on your playlist?",
    "What's your biggest irrational fear?",
    "What's the weirdest thing you've googled?",
    "Have you ever pretended to like a gift?",
    "What's your most unpopular opinion?",
    "What's the longest you've gone without showering?",
    "What's your secret talent nobody knows about?",
    "What's the last lie you told?",
    "What's your guilty pleasure TV show?",
    "Have you ever stalked someone on social media?",
  ];

  const DARES = [
    "Do your best robot dance for 10 seconds",
    "Speak in an accent for the next 2 minutes",
    "Send a random emoji to the last person you texted",
    "Make the ugliest face you can and hold it for 5 seconds",
    "Try to lick your elbow",
    "Sing the chorus of the last song you listened to",
    "Do 10 jumping jacks right now",
    "Talk in slow motion for 30 seconds",
    "Compliment yourself in a mirror",
    "Do an impression of a celebrity",
  ];

  const [mode, setMode] = useState<"choose" | "truth" | "dare">("choose");
  const [text, setText] = useState("");

  const pick = (type: "truth" | "dare") => {
    const list = type === "truth" ? TRUTHS : DARES;
    setText(list[Math.floor(Math.random() * list.length)]);
    setMode(type);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {mode === "choose" ? (
        <>
          <p className="text-sm text-muted-foreground text-center">Choose your fate...</p>
          <div className="flex gap-3">
            <button
              onClick={() => pick("truth")}
              className="glass rounded-2xl px-8 py-6 font-display text-sm tracking-wider transition-all hover:scale-105 active:scale-95 border-cosmic text-neon-cyan"
              style={{ boxShadow: "0 0 25px hsl(190 100% 50% / 0.2)" }}
            >
              🤔<br />TRUTH
            </button>
            <button
              onClick={() => pick("dare")}
              className="glass rounded-2xl px-8 py-6 font-display text-sm tracking-wider transition-all hover:scale-105 active:scale-95 border-cosmic text-neon-magenta"
              style={{ boxShadow: "0 0 25px hsl(320 100% 60% / 0.2)" }}
            >
              😈<br />DARE
            </button>
          </div>
        </>
      ) : (
        <div className="text-center" style={{ animation: "scale-in 0.3s ease-out" }}>
          <p className={`font-display text-xs tracking-widest mb-3 ${mode === "truth" ? "text-neon-cyan" : "text-neon-magenta"}`}>
            {mode.toUpperCase()}
          </p>
          <p className="text-sm text-foreground leading-relaxed mb-6 px-4">{text}</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setMode("choose")}
              className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic"
            >
              DONE
            </button>
            <button
              onClick={() => pick(mode)}
              className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-muted-foreground hover:scale-105 transition-all border-cosmic"
            >
              ANOTHER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TruthOrDare;
