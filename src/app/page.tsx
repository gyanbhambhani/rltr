"use client";

import { LazyMotion, domAnimation, m as motion, useScroll, useTransform, useSpring, MotionConfig, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ---- Motion presets --------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ---- Utilities -------------------------------------------------------------
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// ---- Fancy UI bits ---------------------------------------------------------
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500"
    />
  );
}

function MagneticButton({ children, className, ...props }: { children: React.ReactNode; className?: string; onClick?: () => void; type?: "button" | "submit" }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const mx = useSpring(0, { stiffness: 150, damping: 15 });
  const my = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      mx.set(relX * 0.15);
      my.set(relY * 0.2);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ x: mx, y: my, boxShadow: hover ? "0 10px 30px rgba(59,130,246,0.35)" : "0 6px 18px rgba(15, 23, 42, 0.1)" }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-medium text-white",
        "bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
      <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-200 [mask:linear-gradient(white,transparent)] hover:opacity-100" />
    </motion.button>
  );
}

function GhostButton({ children, className, ...props }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-6 py-3 text-base font-medium text-slate-900 backdrop-blur",
        "hover:border-slate-400 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 120, damping: 12 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 12 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y - rect.height / 2) / rect.height) * -10;
      const ry = ((x - rect.width / 2) / rect.width) * 10;
      rotateX.set(rx);
      rotateY.set(ry);
    };
    const onLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl", className)}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>{children}</div>
    </motion.div>
  );
}

function AnimatedKPI({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 70%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [8, 0]);
  return (
    <motion.div ref={ref} style={{ opacity, y }} className="glass rounded-xl p-6 text-center">
      <div className="text-3xl font-light text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </motion.div>
  );
}

// ---- Page -----------------------------------------------------------------
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.8]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Decorative orbs parallax positions
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]);

  const HeroMock = useMemo(
    () => (
      <div className="relative mx-auto mt-6 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-xl backdrop-blur">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-50">
          {/* Replace with your demo video or gif */}
          <Image src="/vercel.svg" alt="Demo" fill className="object-contain p-12 opacity-40" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/30 via-transparent to-transparent" />
        </div>
      </div>
    ),
    []
  );

  return (
    <LazyMotion features={domAnimation}> 
      <MotionConfig reducedMotion={reduce ? "always" : "never"}>
                <ScrollProgressBar />

                <div ref={containerRef} className="min-h-screen bg-white">
          {/* Premium background with subtle patterns */}
          <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />

          {/* Hero Section */}
          <motion.section
            id="hero"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="relative flex min-h-[80vh] items-center justify-center px-4 sm:px-6 lg:px-8 py-16"
          >
            <div className="mx-auto max-w-6xl text-center">
                            <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <span className="inline-block size-2 rounded-full bg-emerald-500" />
                AI-Powered • Enterprise Ready • Bank-Level Security
              </motion.div>

              <motion.h1 variants={fadeUp} className="mb-6 text-4xl font-light leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                The future of <span className="text-blue-600">real estate</span> is here
              </motion.h1>

                            <motion.p variants={fadeUp} className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-600">
                Generate offers in seconds, predict market trends with 95% accuracy, and close deals 3x faster with our enterprise-grade platform.
              </motion.p>
              
              <motion.p variants={fadeUp} className="mx-auto mb-8 text-sm text-slate-500">
                Built by realtors, for realtors
              </motion.p>

                                               <motion.div variants={fadeUp} className="mb-12 flex flex-wrap items-center justify-center gap-6">
                  <Link href="/dashboard">
                    <MagneticButton onClick={() => scrollToSection("features")}>
                      Explore Platform
                    </MagneticButton>
                  </Link>
                  <GhostButton onClick={() => scrollToSection("cta")}>
                    Request Demo
                  </GhostButton>
                </motion.div>

                            {/* Enterprise KPI bar */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mx-auto mb-2 grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4">
                <div className="text-center">
                  <div className="text-3xl font-light text-slate-900 mb-2">3x</div>
                  <div className="text-sm font-medium text-slate-700">Faster deal closure</div>
                  <div className="text-xs text-slate-500">Industry average</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-slate-900 mb-2">95%</div>
                  <div className="text-sm font-medium text-slate-700">Market prediction accuracy</div>
                  <div className="text-xs text-slate-500">AI-powered insights</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-slate-900 mb-2">99.99%</div>
                  <div className="text-sm font-medium text-slate-700">Enterprise uptime</div>
                  <div className="text-xs text-slate-500">Bank-level security</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-slate-900 mb-2">$2.5T</div>
                  <div className="text-sm font-medium text-slate-700">Market opportunity</div>
                  <div className="text-xs text-slate-500">Real estate industry</div>
                </div>
              </motion.div>
            </div>
            
            {/* Scroll down arrow */}
            <motion.div 
              variants={fadeUp}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex flex-col items-center text-slate-400">
                <span className="text-xs mb-2">Scroll</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-6 h-6"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </motion.section>

          {/* Logos Section */}
          <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <motion.div variants={fadeUp} className="relative mx-auto flex max-w-5xl items-center justify-center gap-16 opacity-70">
                {/* Example marquee */}
                <div className="flex flex-wrap items-center justify-center gap-16">
                  {["/vercel.svg"].map((src, i) => (
                    <Image key={i} src={src} alt="Logo" width={110} height={35} />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

                      {/* Enterprise Features Section */}
            <motion.section id="features" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="py-8">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <motion.div variants={fadeUp} className="mb-12 text-center">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Enterprise Platform
                  </div>
                  <h2 className="mb-4 text-4xl font-light text-slate-900 sm:text-5xl lg:text-6xl">The complete real estate operating system</h2>
                  <p className="mx-auto max-w-2xl text-base text-slate-600">Everything you need to dominate the market.</p>
                </motion.div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                  {[
                    {
                      title: "AI-Powered Transaction Hub",
                      description: "Generate offers in seconds with AI that learns from millions of transactions. Real-time collaboration and automated workflows.",
                      stats: "10x faster offer generation",
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )
                    },
                    {
                      title: "Predictive Market Intelligence",
                      description: "Access real-time market data, predictive analytics, and AI-driven insights that give you a 95% accuracy rate on market trends and property valuations.",
                      stats: "95% prediction accuracy",
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      )
                    },
                    {
                      title: "Enterprise Security & Compliance",
                      description: "Bank-level security with end-to-end encryption, granular access controls, and comprehensive audit trails. Trusted by Fortune 500 companies.",
                      stats: "99.99% uptime guarantee",
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )
                    },
                  ].map((f) => (
                    <motion.div key={f.title} variants={fadeUp} className="group relative">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                          {f.icon}
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-blue-600 to-purple-600 transition-all group-hover:w-32" />
                      </div>
                      <h3 className="mb-3 text-xl font-medium text-slate-900">{f.title}</h3>
                      <p className="mb-3 text-sm leading-relaxed text-slate-600">{f.description}</p>
                      <div className="text-xs font-semibold text-blue-600">{f.stats}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

           

           

                      {/* Enterprise CTA */}
            <motion.section id="cta" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={staggerContainer} className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <motion.div variants={fadeUp} className="text-center">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                    Join the Revolution
                  </div>
                  <h2 className="mb-6 text-4xl font-light text-white sm:text-5xl lg:text-6xl">Ready to dominate the market?</h2>
                  <p className="mx-auto mb-12 max-w-3xl text-lg text-slate-300">Join Fortune 500 brokerages already using RLTR to close deals faster and smarter than ever before.</p>
                  
                  <div className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-400 mb-2">$2.5T</div>
                      <div className="text-slate-300">Market Opportunity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-400 mb-2">500%</div>
                      <div className="text-slate-300">Average ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-400 mb-2">3x</div>
                      <div className="text-slate-300">Faster Closings</div>
                    </div>
                  </div>

                  <form className="mx-auto flex max-w-lg flex-col gap-4 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="email"
                      required
                      placeholder="enterprise@brokerage.com"
                      className="flex-1 rounded-lg border border-slate-600 bg-slate-800/50 px-6 py-3 text-base text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    />
                    <button type="submit" className="rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700">
                      Request Demo
                    </button>
                  </form>
                  <p className="mt-6 text-sm text-slate-400">Enterprise-grade security • Bank-level encryption • 24/7 Support</p>
                </motion.div>
              </div>
            </motion.section>
         </div>
       </MotionConfig>
     </LazyMotion>
  );
}
