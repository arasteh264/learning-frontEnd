"use client";
import React from "react";

interface LayoutProp {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<LayoutProp> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={{ background: "#F7F4EF" }}
    >
      {/* ───── LEFT PANEL — image + branding ───── */}
      <div className="relative hidden md:flex md:w-[52%] flex-col overflow-hidden">
        {/* photo */}
        <img
          src="/images/young-man.webp"
          alt="auth visual"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* warm tint overlay — lets image breathe */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,86,46,0.45) 0%, rgba(180,140,80,0.15) 60%, transparent 100%)",
          }}
        />

    
      </div>


      <div
        className="flex flex-1 flex-col items-center justify-center px-5 py-10 md:py-14"
        style={{ background: "#F7F4EF" }}
      >
        <div
          className="absolute top-6 left-6 hidden md:block"
          style={{ opacity: 0.12 }}
        >
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex gap-2 mb-2">
              {[0, 1, 2].map((col) => (
                <div
                  key={col}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#8B7355" }}
                />
              ))}
            </div>
          ))}
        </div>

        <div
          className="w-full max-w-sm"
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(139,115,85,0.10)",
            padding: "2.2rem 2rem",
          }}
        >
          {children}
        </div>

        <p
          className="mt-6 text-center text-xs"
          style={{
            color: "#B5A898",
            fontFamily: "Vazirmatn, sans-serif",
            maxWidth: "280px",
            lineHeight: "1.7",
          }}
        >
          با ورود یا ثبت‌نام، با{" "}
          <a
            href="#"
            style={{ color: "#8B7355", textDecoration: "underline" }}
          >
            شرایط استفاده
          </a>{" "}
          و{" "}
          <a
            href="#"
            style={{ color: "#8B7355", textDecoration: "underline" }}
          >
            سیاست حریم خصوصی
          </a>{" "}
          موافقت می‌کنید.
        </p>
      </div>
    </div>
  );
};