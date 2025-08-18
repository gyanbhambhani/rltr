"use client";

import { useState } from "react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-slate-200 mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <button 
              onClick={() => scrollToSection("hero")}
              className="text-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-white"
            >
              RLTR
            </button>
            <p className="mt-3 max-w-sm text-slate-600">
              AI powered deal intelligence for realtors. Draft offers, coordinate escrow, and keep clients looped in without the busywork.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-medium text-slate-900">Product</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><button onClick={() => scrollToSection("features")} className="text-slate-600 hover:text-slate-900">Features</button></li>
                <li><button onClick={() => scrollToSection("how-it-works")} className="text-slate-600 hover:text-slate-900">How it works</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-900">Company</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a className="text-slate-600 hover:text-slate-900" href="#">About</a></li>
                <li><a className="text-slate-600 hover:text-slate-900" href="#">Careers</a></li>
                <li><a className="text-slate-600 hover:text-slate-900" href="#">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-900">Support</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><button onClick={() => scrollToSection("faq")} className="text-slate-600 hover:text-slate-900">FAQ</button></li>
                <li><a className="text-slate-600 hover:text-slate-900" href="#">Privacy</a></li>
                <li><a className="text-slate-600 hover:text-slate-900" href="#">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} RLTR</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-slate-700">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-slate-700">Terms</a>
            <a href="#" className="text-slate-500 hover:text-slate-700">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}



