const AmbientVisualizer = () => {
  const bars = 24;

  return (
    <div className="flex items-end justify-center gap-[3px] h-16 px-4">
      {Array.from({ length: bars }, (_, i) => {
        const delay = i * 0.1;
        const maxH = 20 + Math.random() * 40;
        return (
          <div
            key={i}
            className="w-[3px] rounded-full"
            style={{
              height: `${maxH}%`,
              background: `linear-gradient(to top, hsl(190 100% 50% / 0.8), hsl(${190 + i * 6} 100% 60% / 0.3))`,
              animation: `pulse-glow 1.5s ease-in-out ${delay}s infinite alternate`,
            }}
          />
        );
      })}
    </div>
  );
};

export default AmbientVisualizer;
