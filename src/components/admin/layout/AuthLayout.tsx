// src/components/base/auth-layout.tsx
"use client";
import React from "react";
import Logo from "@/src/components/base/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  message?: string;
}

export default function AuthLayout({ children, message }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-gradient-to-br from-brand to-brand-dark items-center justify-center">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        <div className="relative z-10 flex flex-col items-center gap-10 px-10 text-center">
          <Logo variant="reversed" className="scale-300" />
          <p className="text-white/80 text-lg leading-7 max-w-xs">
            {message ??
              "هر چیزی که یاد می‌گیری رو یادداشت کن، مرور کن و هیچ‌وقت فراموشش نکن."}
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="auth-card w-full max-w-md bg-surface p-8 rounded-3xl shadow-lg border border-border">
          <div className="flex md:hidden justify-center mb-6">
            <Logo />
          </div>
          {children}
        </div>
      </div>

      <style jsx>{`
        .auth-card {
          animation: fadeUp 0.5s ease-out both;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(60px);
          background: rgba(255, 255, 255, 0.18);
          animation: float 9s ease-in-out infinite;
        }
        .blob-1 {
          width: 280px;
          height: 280px;
          top: -60px;
          right: -60px;
          animation-delay: 0s;
        }
        .blob-2 {
          width: 220px;
          height: 220px;
          bottom: -40px;
          left: -40px;
          background: rgba(255, 255, 255, 0.12);
          animation-delay: 2.5s;
        }
        .blob-3 {
          width: 160px;
          height: 160px;
          top: 40%;
          left: 15%;
          background: rgba(255, 255, 255, 0.1);
          animation-delay: 5s;
        }
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -24px) scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}