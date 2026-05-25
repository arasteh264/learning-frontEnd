"use client";

import Link from "next/link";

export default function Footer() {
  return (
<footer className=" container-custom text-right py-5 mt-10">
  <div className=" bg-[#242424] py-5 flex justify-end md:justify-between flex-wrap   gap-x-5 xl:gap-x-12 rounded-xl px-5">

        {/* About */}
        <div className="flex flex-col gap-y-3 sm:gap-y-6 w-full lg:w-70 xl:w-90 mb-5">
          <span className="font-demibold text-caption text-xs xl:text-t3 text-white">
            درباره ما
          </span>

          <p className="font-regular text-label text-xs text-gray-300 leading-6">
            شروع هرچیزی سخته، ولی وقتی مسیر درستی رو انتخاب کنی، با خیال راحت و بدون استرس میتونی از مسیر لذت ببری.
            ما در سبزلرن، توی سفر به دنیای برنامه نویسی کنارت هستیم تا باهم رشد کنیم.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-y-3 sm:gap-y-6 ">
          <h3 className="font-demibold text-caption text-xs xl:text-t3 text-white">
            لینک های مفید
          </h3>

          <ul className="flex flex-col gap-y-2.5">
            {[
              { href: "/terms-conditions/", label: "قوانین مقررات" },
              { href: "/support", label: "تیکت پشتیبانی" },
              { href: "/about", label: "درباره ما" },
              { href: "/contact", label: "تماس با ما" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white inline-flex items-center gap-x-1.5 font-regular text-label  text-[10px]"
                >

                  {item.label}
                                      <span className="text-[#1eb35b] text-xl">-</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses */}
        <div className="flex flex-col gap-y-3 sm:gap-y-6">
          <h3 className="font-demibold text-caption text-xs xl:text-t3 text-white">
            دوره های پیشنهادی
          </h3>

          <ul className="flex flex-col gap-y-2.5">
            {[
              { href: "/course/css", label: "آموزش CSS" },
              { href: "/course/html", label: "آموزش HTML" },
              { href: "/course/javascript", label: "آموزش جاوااسکریپت" },
              { href: "/course/python", label: "آموزش پایتون" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white inline-flex items-center gap-x-1.5 font-regular text-label  text-[10px]"
                >

                  {item.label}
                                      <span className="text-[#1eb35b] text-xl">-</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-y-3 pt-3 w-full sm:w-70 xl:w-80">
          <h3 className="font-demibold text-caption text-sm xl:text-t3 text-white">
            ارتباط با ما
          </h3>

          <div className="flex flex-col justify-between h-full gap-y-8">

            {/* info */}
            <div className="flex flex-col gap-y-3 text-label text-xs text-white">
              <div className="flex justify-between flex-wrap gap-x-3 gap-y-1.5">
                <a className=" hover:text-brand" href="https://t.me/sabzlearn_support">
                  @sabzlearn_support
                </a>
                                <span >پشتیبان تلگرام</span>
              </div>

              <div className="flex justify-between flex-wrap gap-x-3 gap-y-1.5">
                <a className=" hover:text-brand" href="mailto:info@sabzlearn.ir">
                  info@sabzlearn.ir
                </a>
                                <span>ایمیل</span>

              </div>
            </div>

            {/* social */}
            <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-1.5 text-white">


              <div className="flex gap-x-2.5">
                {[
                  {
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                    className: "bg-white/10",
                  },
                  {
                    href: "https://instagram.com",
                    label: "Instagram",
                    className: "bg-white/10",
                  },
                  {
                    href: "https://t.me",
                    label: "Telegram",
                    className: "bg-brand",
                  },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    className={`flex items-center justify-center size-10 text-white rounded-md hover:bg-brand transition-colors ${item.className}`}
                  >
                    {item.label[0]}
                  </a>
                ))}
              </div>
                            <span className="text-label text-xs text-secondary-dark">
                شبکه های اجتماعی
              </span>
            </div>

          </div>
        </div>


              <div className="flex justify-end bg-[#fdfffd44]  py-5  flex-wrap   text-white text-label sm:text-caption  mt-5 rounded-2xl">
        <p>
          کلیه حقوق برای <span className="text-brand">سبزلرن</span> محفوظ است.
        </p>

        <p className="dir-ltr text-sm opacity-80 ">
          Built pixel by pixel by Hamidreza
        </p>
      </div>
      </div>



    </footer>
  );
}