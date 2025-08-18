"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: "Features", sectionId: "features" },
  ];

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'glass px-4 py-2 max-w-md rounded-full shadow-lg' 
            : 'flex items-center justify-between w-full max-w-7xl px-8'
        }`}
      >
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'gap-4' : 'gap-32'
        }`}>
          <Link 
            href="/"
            className={`font-semibold text-slate-900 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-white transition-colors ${
              isScrolled ? 'text-lg' : 'text-2xl'
            }`}
          >
            RLTR
          </Link>
          
          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center transition-all duration-300 ${
            isScrolled ? 'gap-1' : 'gap-12'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.sectionId)}
                className={`rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-white transition-colors ${
                  isScrolled ? 'px-3 py-1 text-sm' : 'px-8 py-4 text-lg'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className={`hidden md:flex items-center transition-all duration-300 ${
            isScrolled ? 'gap-1' : 'gap-6'
          }`}>
            <Link 
              href="/login"
              className={`rounded-full text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-white transition-colors ${
                isScrolled ? 'px-3 py-1' : 'px-4 py-2'
              }`}
            >
              Sign In
            </Link>
            <Link 
              href="/signup"
              className={`bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-white transition-colors ${
                isScrolled ? 'px-3 py-1' : 'px-4 py-2'
              }`}
            >
              Sign Up
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 glass rounded-2xl p-4"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="w-full text-left px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Link 
                href="/login"
                className="w-full text-left px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-white transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/signup"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl text-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-white transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </header>
  );
}



