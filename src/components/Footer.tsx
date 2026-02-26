import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="relative z-10 py-10 text-center">
    <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
      <span>Made with</span>
      <Heart
        size={16}
        className="text-neon-magenta fill-neon-magenta"
        style={{ animation: "heartbeat 1.5s ease-in-out infinite" }}
      />
      <span>to destroy boredom</span>
    </div>
    <p className="text-xs text-muted-foreground/50 mt-2 font-display tracking-widest">
      ∞ FUN GUARANTEED
    </p>
  </footer>
);

export default Footer;
