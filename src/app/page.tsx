"use client";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { ArrowRight, Code, MessageCircle, Zap, FileText, Star, Shield, Zap as Speed } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-[#000] via-[#000] to-[#3c2e67] font-[family-name:var(--font-geist-sans)] overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full flex-1 flex flex-col items-center justify-center pt-28 pb-20 animate-fade-in">
        <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-4xl px-4">
          
          <h1 className="text-5xl  sm:text-7xl font-extrabold bg-gradient-to-r from-[#7dd3fc] via-[#a78bfa] to-[#ec4899] bg-clip-text text-transparent animate-fade-in-up">
            Unleash Your Ideas with <span className="flex items-center justify-center gap-0"> <Image
            className=""
            src="/logo.png"
            alt="Zuno logo"
            width={80}
            height={40}
            priority
          />uno</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 animate-fade-in-up delay-100 max-w-2xl">
            Transform your vision into reality with Zuno’s AI-driven platform. Harness AI chat and real-time code generation to create and export stunning web apps effortlessly.
          </p>
          <div className="flex gap-6 justify-center mt-6 animate-fade-in-up delay-200">
            <Button
              size="lg"
              className="px-10 py-4 text-xl bg-gradient-to-r from-[#21546b] to-[#6a4cc2] text-white shadow-xl hover:scale-105 transition-transform duration-300"
              asChild
            >
              <a href="/Thinkpad" className="flex items-center gap-2">
                Start Creating <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-4 text-xl border-gray-300 text-gray-200 hover:bg-gray-800 hover:scale-105 transition-transform duration-300"
              asChild
            >
              <a href="#features">Discover Zuno</a>
            </Button>
          </div>
        </div>
        {/* Animated background shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/4 top-10 w-[800px] h-[800px] bg-gradient-to-br from-[#ec489933] via-[#a78bfa33] to-[#7dd3fc33] rounded-full blur-3xl opacity-50 animate-pulse-slow" />
          <div className="absolute right-1/4 bottom-20 w-[600px] h-[600px] bg-gradient-to-br from-[#7dd3fc33] via-[#a78bfa33] to-[#ec489933] rounded-full blur-3xl opacity-50 animate-pulse-slow delay-1000" />
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="w-full max-w-6xl mx-auto py-20 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up"
      >
        <div className="bg-gray-900/80 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 border border-gray-700 hover:scale-105 transition-transform duration-300">
          <Code className="w-10 h-10 text-[#7dd3fc]" />
          <h3 className="font-semibold text-xl text-white">AI-Powered Coding</h3>
          <p className="text-gray-400 text-center">
            Leverage advanced AI to generate, review, and optimize your code effortlessly.
          </p>
        </div>
        <div className="bg-gray-900/80 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 border border-gray-700 hover:scale-105 transition-transform duration-300">
          <MessageCircle className="w-10 h-10 text-[#a78bfa]" />
          <h3 className="font-semibold text-xl text-white">AI Chat</h3>
          <p className="text-gray-400 text-center">
            Interact with our AI assistant to brainstorm ideas and get instant coding guidance.
          </p>
        </div>
        <div className="bg-gray-900/80 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 border border-gray-700 hover:scale-105 transition-transform duration-300">
          <Zap className="w-10 h-10 text-[#ec4899]" />
          <h3 className="font-semibold text-xl text-white">Real-time Code Generation</h3>
          <p className="text-gray-400 text-center">
            Watch your ideas turn into code instantly with Zuno’s AI-driven engine.
          </p>
        </div>
        <div className="bg-gray-900/80 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 border border-gray-700 hover:scale-105 transition-transform duration-300">
          <FileText className="w-10 h-10 text-[#7dd3fc]" />
          <h3 className="font-semibold text-xl text-white">Easy Project Export</h3>
          <p className="text-gray-400 text-center">
            Download your entire project as a ZIP file with one click for ultimate portability.
          </p>
        </div>
      </section>

      {/* What is Zuno Section */}
      <section className="w-full max-w-5xl mx-auto py-20 px-4 text-center animate-fade-in-up">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#7dd3fc] via-[#a78bfa] to-[#ec4899] bg-clip-text text-transparent">
          What is Zuno?
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Zuno is a AI-powered platform designed to empower developers, designers, and creators. Build stunning web applications with real-time AI code generation, interactive AI chat, and effortless project export.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-6xl mx-auto py-20 px-4 animate-fade-in-up">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-[#ec4899] via-[#a78bfa] to-[#7dd3fc] bg-clip-text text-transparent">
          How Zuno Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-gray-900/70 rounded-2xl shadow-xl p-8 border border-gray-700">
            <span className="text-5xl mb-4">💡</span>
            <h3 className="font-semibold text-xl mb-2 text-white">Describe Your Vision</h3>
            <p className="text-gray-400 text-center">
              Input your project ideas or prompts in natural language using Zuno’s Thinkpad.
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-900/70 rounded-2xl shadow-xl p-8 border border-gray-700">
            <span className="text-5xl mb-4">⚡</span>
            <h3 className="font-semibold text-xl mb-2 text-white">Build & Collaborate</h3>
            <p className="text-gray-400 text-center">
              Zuno’s AI generates code and UI, with real-time editing and AI-driven assistance.
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-900/70 rounded-2xl shadow-xl p-8 border border-gray-700">
            <span className="text-5xl mb-4">🚀</span>
            <h3 className="font-semibold text-xl mb-2 text-white">Export & Share</h3>
            <p className="text-gray-400 text-center">
              Download your project as a ZIP or share it with a link for instant showcasing.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Zuno Section */}
      <section className="w-full max-w-6xl mx-auto py-20 px-4 animate-fade-in-up">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-[#7dd3fc] via-[#a78bfa] to-[#ec4899] bg-clip-text text-transparent">
          Why Choose Zuno?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900/80 rounded-2xl shadow-xl p-8 border border-gray-700 flex flex-col items-center text-center">
            <Star className="w-12 h-12 text-[#7dd3fc] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Unmatched AI Innovation</h3>
            <p className="text-gray-400">
              Zuno’s AI engine delivers cutting-edge code generation and interactive chat, making development faster and smarter.
            </p>
          </div>
          <div className="bg-gray-900/80 rounded-2xl shadow-xl p-8 border border-gray-700 flex flex-col items-center text-center">
            <Shield className="w-12 h-12 text-[#a78bfa] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Secure & Reliable</h3>
            <p className="text-gray-400">
              Your projects are safe with Zuno’s robust security measures and reliable infrastructure.
            </p>
          </div>
          <div className="bg-gray-900/80 rounded-2xl shadow-xl p-8 border border-gray-700 flex flex-col items-center text-center">
            <Speed className="w-12 h-12 text-[#ec4899] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Blazing Fast Performance</h3>
            <p className="text-gray-400">
              Experience lightning-fast code generation and project exports, optimized for efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="w-full max-w-6xl mx-auto py-20 px-4 animate-fade-in-up"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-[#7dd3fc] via-[#a78bfa] to-[#ec4899] bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="rounded-2xl border shadow-xl p-8 flex flex-col items-center bg-gray-900/80 transition-transform hover:scale-105 border-[#7dd3fc]/50 ring-2 ring-[#7dd3fc]/20">
            <h3 className="text-2xl font-semibold mb-2 text-white bg-[#7dd3fc] px-4 py-1 rounded-full">
              Free
            </h3>
            <div className="text-4xl font-bold my-4 text-[#7dd3fc]">Free</div>
            <div className="text-lg mb-4 text-gray-400">50,000 tokens</div>
            <ul className="mb-6 space-y-2 w-full text-gray-300">
              <li className="flex items-center text-sm">
                <span className="mr-2 text-[#7dd3fc]">•</span>50,000 tokens included
              </li>
              <li className="flex items-center text-sm">
                <span className="mr-2 text-[#7dd3fc]">•</span>Basic AI access
              </li>
              <li className="flex items-center text-sm">
                <span className="mr-2 text-[#7dd3fc]">•</span>Community support
              </li>
            </ul>
            <Button className="w-full mt-auto bg-gray-700 text-gray-300" variant="outline" disabled>
              Current Plan
            </Button>
          </div>
          {/* Pro Plan */}
          <div className="rounded-2xl border shadow-xl p-8 flex flex-col items-center bg-gray-900/80 transition-transform hover:scale-105 border-[#a78bfa]/50">
            <h3 className="text-2xl font-semibold mb-2 text-white bg-[#a78bfa] px-4 py-1 rounded-full">
              Pro
            </h3>
            <div className="text-4xl font-bold my-4 text-[#a78bfa]">₹9</div>
            <div className="text-lg mb-4 text-gray-400">500,000 tokens</div>
            <ul className="mb-6 space-y-2 w-full text-gray-300">
              <li className="flex items-center text-sm">
                <span className="mr-2 text-[#a78bfa]">•</span>500,000 tokens included
              </li>
              <li className="flex items-center text-sm">
                <span className="mr-2 text-[#a78bfa]">•</span>Priority AI access
              </li>
              <li className="flex items-center text-sm">
                <span className="mr-2 text-[#a78bfa]">•</span>Email support
              </li>
            </ul>
            <Button className="w-full mt-auto bg-[#a78bfa] text-white hover:bg-[#a78bfa]/80" asChild>
              <a href="/main/pricing">Buy Now</a>
            </Button>
          </div>
          {/* Ultimate Plan */}
          <div className="rounded-2xl border shadow-xl p-8 flex flex-col items-center bg-gray-900/80 transition-transform hover:scale-105 border-[#ec4899]/50">
            <h3 className="text-2xl font-semibold mb-2 text-white bg-[#ec4899] px-4 py-1 rounded-full">
              Ultimate
            </h3>
            <div className="text-4xl font-bold my-4 text-[#ec4899]">₹29</div>
            <div className="text-lg mb-4 text-gray-400">2,000,000 tokens</div>
            <ul className="mb-6 space-y-2 w-full text-gray-300">
              <li className="flex items-center text-sm">
                <span className="mr-2 text-[#ec4899]">•</span>2,000,000 tokens included
              </li>
              <li className="flex items-center text-sm">
                <span className="mr-2 text-[#ec4899]">•</span>Fastest AI access
              </li>
              <li className="flex items-center text-sm">
                <span className="mr-2 text-[#ec4899]">•</span>Premium support
              </li>
            </ul>
            <Button className="w-full mt-auto bg-[#ec4899] text-white hover:bg-[#ec4899]/80" asChild>
              <a href="/main/pricing">Buy Now</a>
            </Button>
          </div>
        </div>
        <div className="text-xs text-center text-gray-400 mt-8">
          Payment integration coming soon. For more details, see{" "}
          <a href="/main/pricing" className="underline hover:text-[#a78bfa]">
            full pricing
          </a>
          .
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 flex flex-col items-center gap-4 bg-gray-900/50 animate-fade-in-up">
        {/* <div className="flex gap-8 text-gray-300">
          <Link className="hover:underline underline-offset-4 hover:text-[#a78bfa]" href="/docs">
            Documentation
          </Link>
          <Link className="hover:underline underline-offset-4 hover:text-[#a78bfa]" href="/support">
            Support
          </Link>
          <Link className="hover:underline underline-offset-4 hover:text-[#a78bfa]" href="/blog">
            Blog
          </Link>
        </div> */}
        <span className="text-xs text-gray-400">
          © {new Date().getFullYear()} Zuno. All rights reserved.
        </span>
        <span className="text-xs text-gray-400">
          Code and crafted by <Link className="hover:underline" href="https://www.linkedin.com/in/khushramnani/">@Khush Ramnani</Link>
        </span>
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%,
            100% {
            opacity: 0.5;
          }
          to50% {
            opacity: 0.8;
          }
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out 0.1s both;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}