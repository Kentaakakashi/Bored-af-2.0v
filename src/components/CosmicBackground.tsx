import { useEffect, useRef, useCallback } from "react";

const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const orbsRef = useRef<Array<{ x: number; y: number; targetX: number; targetY: number; size: number; hue: number; speed: number }>>([]);

  const initOrbs = useCallback(() => {
    orbsRef.current = Array.from({ length: 5 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
      size: 80 + Math.random() * 120,
      hue: Math.random() * 360,
      speed: 0.01 + Math.random() * 0.02,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    initOrbs();

    // Stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: 0.1 + Math.random() * 0.3,
      twinkleSpeed: 0.005 + Math.random() * 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // Shooting stars
    let shootingStars: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number }> = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("resize", resize);

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.fillStyle = "rgba(5, 5, 15, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const opacity = 0.3 + Math.sin(star.twinklePhase) * 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${opacity})`;
        ctx.fill();

        // Parallax
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Shooting stars
      if (frame % 180 === 0 && Math.random() > 0.5) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          vx: 3 + Math.random() * 4,
          vy: 3 + Math.random() * 4,
          life: 0,
          maxLife: 40 + Math.random() * 30,
        });
      }

      shootingStars = shootingStars.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const alpha = 1 - s.life / s.maxLife;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8);
        ctx.strokeStyle = `rgba(150, 220, 255, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        return s.life < s.maxLife;
      });

      // Floating orbs near mouse
      orbsRef.current.forEach((orb) => {
        orb.targetX += (mouseRef.current.x - orb.targetX) * 0.02;
        orb.targetY += (mouseRef.current.y - orb.targetY) * 0.02;
        orb.x += (orb.targetX - orb.x) * orb.speed;
        orb.y += (orb.targetY - orb.y) * orb.speed;
        orb.hue = (orb.hue + 0.3) % 360;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size);
        gradient.addColorStop(0, `hsla(${orb.hue}, 100%, 60%, 0.15)`);
        gradient.addColorStop(0.5, `hsla(${orb.hue + 40}, 100%, 50%, 0.05)`);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    // Initial full clear
    ctx.fillStyle = "rgb(5, 5, 15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("resize", resize);
    };
  }, [initOrbs]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default CosmicBackground;
