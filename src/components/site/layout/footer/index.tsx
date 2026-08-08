"use client";

import Link from "next/link";
import { Send, Mail } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import Logo from "@/src/components/base/logo";

const usefulLinks = [
  { href: "/terms-conditions/", label: "قوانین مقررات" },
  { href: "/support", label: "تیکت پشتیبانی" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

const suggestedCourses = [
  { href: "/course/css", label: "آموزش CSS" },
  { href: "/course/html", label: "آموزش HTML" },
  { href: "/course/javascript", label: "آموزش جاوااسکریپت" },
  { href: "/course/python", label: "آموزش پایتون" },
];

const socials = [
  { href: "https://linkedin.com", label: "لینکدین", icon: FaLinkedinIn },
  { href: "https://instagram.com", label: "اینستاگرام", icon: FaInstagram },
  { href: "https://t.me", label: "تلگرام", icon: FaTelegramPlane },
];

export default function Footer() {
  return (
    <footer className="container-custom text-right py-5 mt-10">
      <div className="bg-[#1E1B4B] rounded-2xl px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 xl:gap-16">
          <div className="flex flex-col gap-y-5">
            <Logo variant="reversed" />
            <p className="text-xs sm:text-sm text-white/60 leading-7">
              شروع هرچیزی سخته، ولی وقتی مسیر درستی رو انتخاب کنی، با خیال راحت
              و بدون استرس می‌تونی از مسیر لذت ببری. یاددادی همراه توئه تا چیزی
              که یاد می‌گیری رو یادداشت کنی، مرور کنی و هیچ‌وقت فراموش نکنی.
            </p>
          </div>

          <div className="flex flex-col gap-y-5">
            <h3 className="text-xs sm:text-sm font-demibold text-white">
              لینک‌های مفید
            </h3>
            <ul className="flex flex-col gap-y-3">
              {usefulLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-[13px] text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-y-5">
            <h3 className="text-xs sm:text-sm font-demibold text-white">
              دوره‌های پیشنهادی
            </h3>
            <ul className="flex flex-col gap-y-3">
              {suggestedCourses.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-[13px] text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-y-5">
            <h3 className="text-xs sm:text-sm font-demibold text-white">
              ارتباط با ما
            </h3>

            <div className="flex flex-col gap-y-3 text-xs sm:text-[13px]">
              <a
                href="https://t.me/yaddadi_support"
                className="flex items-center gap-x-2 text-white/60 hover:text-white transition-colors"
              >
                <Send className="size-4 text-brand" />
                @yaddadi_support
              </a>
              <a
                href="mailto:info@yaddadi.ir"
                className="flex items-center gap-x-2 text-white/60 hover:text-white transition-colors"
              >
                <Mail className="size-4 text-brand" />
                info@yaddadi.ir
              </a>
            </div>

            <div className="flex flex-col gap-y-3">
              <span className="text-[11px] text-white/40">
                شبکه‌های اجتماعی
              </span>
              <div className="flex gap-x-2.5">
                {socials.map(({ href, label, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center size-9 rounded-lg bg-white/5 text-white hover:bg-brand transition-colors"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-white/50">
          <p>
            کلیه حقوق برای{" "}
            <span className="text-brand font-demibold">یاددادی</span> محفوظ است.
          </p>
          <p className="dir-ltr opacity-70">
            Built pixel by pixel by arasteh264
          </p>
        </div>
      </div>
    </footer>
  );
}
