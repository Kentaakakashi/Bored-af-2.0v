import { useState } from "react";

const PasswordGame = () => {
  const [password, setPassword] = useState("");
  const rules = [
    { id: 1, text: "At least 8 characters", check: (p: string) => p.length >= 8 },
    { id: 2, text: "Contains a number", check: (p: string) => /\d/.test(p) },
    { id: 3, text: "Contains an uppercase letter", check: (p: string) => /[A-Z]/.test(p) },
    { id: 4, text: "Contains a special character (!@#$)", check: (p: string) => /[!@#$%^&*]/.test(p) },
    { id: 5, text: "Contains an emoji", check: (p: string) => /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}]/u.test(p) },
    { id: 6, text: "Digits sum to 25+", check: (p: string) => { const sum = p.split("").reduce((a, c) => a + (parseInt(c) || 0), 0); return sum >= 25; } },
    { id: 7, text: "Contains the word 'cosmic'", check: (p: string) => p.toLowerCase().includes("cosmic") },
  ];

  const passedCount = rules.filter((r) => r.check(password)).length;
  const allPassed = passedCount === rules.length;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs text-muted-foreground text-center">Create a password that satisfies ALL rules!</p>

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="glass rounded-xl px-4 py-3 w-full text-sm font-body text-foreground border-cosmic bg-transparent outline-none focus:box-glow-cyan"
        placeholder="Type your password..."
      />

      <div className="w-full space-y-2">
        {rules.map((rule) => {
          const passed = rule.check(password);
          return (
            <div
              key={rule.id}
              className={`flex items-center gap-2 text-xs transition-all duration-300 ${passed ? "text-neon-green" : "text-muted-foreground"}`}
            >
              <span className="text-sm">{passed ? "✅" : "⬜"}</span>
              <span className={passed ? "line-through opacity-60" : ""}>{rule.text}</span>
            </div>
          );
        })}
      </div>

      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "hsl(240 10% 15%)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(passedCount / rules.length) * 100}%`,
            background: allPassed
              ? "hsl(150 100% 50%)"
              : `linear-gradient(90deg, hsl(190 100% 50%), hsl(320 100% 60%))`,
          }}
        />
      </div>

      {allPassed && (
        <p className="font-display text-sm text-neon-green glow-cyan" style={{ animation: "scale-in 0.3s ease-out" }}>
          🎉 UNBREAKABLE PASSWORD!
        </p>
      )}
    </div>
  );
};

export default PasswordGame;
