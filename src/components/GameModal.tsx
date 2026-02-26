import { type ReactNode } from "react";
import { X } from "lucide-react";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  gradient: string;
}

const GameModal = ({ isOpen, onClose, title, children, gradient }: GameModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fade-in 0.3s ease-out" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative glass-strong rounded-3xl w-full max-w-lg max-h-[85vh] overflow-auto border-cosmic"
        style={{ animation: "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Header glow */}
        <div
          className="absolute top-0 left-0 right-0 h-32 opacity-20 rounded-t-3xl pointer-events-none"
          style={{ background: gradient }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between p-6 pb-2">
          <h2 className="font-display font-bold text-lg tracking-wider text-foreground">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="glass rounded-full p-2 transition-all hover:scale-110 active:scale-90 text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-6 pt-2">{children}</div>
      </div>
    </div>
  );
};

export default GameModal;
