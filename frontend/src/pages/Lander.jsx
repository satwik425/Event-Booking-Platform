import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, ArrowRight, Zap, MapPin, CalendarDays, Users } from "lucide-react";

// --- Floating particle background ---
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

// --- Feature pill ---
const FeaturePill = ({ icon: Icon, label, delay }) => (
  <div
    className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-300 animate-fadeUp"
    style={{ animationDelay: delay }}
  >
    <Icon size={14} className="text-white" />
    {label}
  </div>
);

// --- Stat card ---
const StatCard = ({ value, label, delay }) => (
  <div
    className="flex flex-col items-center animate-fadeUp"
    style={{ animationDelay: delay }}
  >
    <span className="text-4xl font-black tracking-tight text-white">{value}</span>
    <span className="text-gray-500 text-sm mt-1">{label}</span>
  </div>
);

const Lander = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white overflow-hidden relative">
      {/* Ambient glow blobs */}
      <div
        className="fixed top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      <ParticleCanvas />

      {/* NAV */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-xl p-1.5">
            <Ticket size={18} className="text-black" />
          </div>
          <span className="font-bold text-lg tracking-tight">Eventify</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-200"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-white text-black hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20 flex flex-col items-center text-center">

        {/* Badge */}
        <div
          className="mb-8 inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-400 animate-fadeUp"
          style={{ animationDelay: "0.05s" }}
        >
          <Zap size={13} className="text-white" />
          Book smarter. Experience more.
        </div>

        {/* Headline */}
        <h1
          className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-6 animate-fadeUp"
          style={{ animationDelay: "0.1s" }}
        >
          Your Next
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #888888 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Great Event
          </span>
          <br />
          Awaits.
        </h1>

        {/* Sub */}
        <p
          className="text-gray-400 text-lg max-w-xl leading-relaxed mb-10 animate-fadeUp"
          style={{ animationDelay: "0.18s" }}
        >
          Discover concerts, tech meetups, workshops, and more — all in one
          place. Book your seat in seconds.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-16 animate-fadeUp"
          style={{ animationDelay: "0.26s" }}
        >
          <button
            onClick={() => navigate("/register")}
            className="flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-200 shadow-2xl text-base"
          >
            Create Account
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-2 bg-white/5 border border-white/15 text-white font-medium px-8 py-4 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-200 text-base"
          >
            Sign In
          </button>
        </div>

        {/* Feature pills */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-20 animate-fadeUp"
          style={{ animationDelay: "0.34s" }}
        >
          <FeaturePill icon={CalendarDays} label="Live event listings" delay="0.36s" />
          <FeaturePill icon={MapPin} label="Location-based discovery" delay="0.4s" />
          <FeaturePill icon={Users} label="Seat management" delay="0.44s" />
          <FeaturePill icon={Ticket} label="Instant booking" delay="0.48s" />
        </div>

        {/* Divider */}
        <div className="w-full max-w-3xl border-t border-white/5 mb-16" />

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-12 animate-fadeUp"
          style={{ animationDelay: "0.5s" }}
        >
          <StatCard value="500+" label="Events listed" delay="0.52s" />
          <StatCard value="12k+" label="Tickets booked" delay="0.56s" />
          <StatCard value="200+" label="Cities covered" delay="0.6s" />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Eventify. All rights reserved.
      </footer>

      {/* Inline keyframe animations */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 0.6s ease forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Lander;