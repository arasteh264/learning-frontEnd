import { Code, Layout, Server } from "lucide-react";

export const navItems = [
  {
    title: "مقالات",
    href: "/blog",
  },

  {
    title: "درباره ما",
    href: "/about",
  },
  {
    title: "دوره های آموزشی",
    href: "/courses",
    megaMenu: [
      {
        title: "فرانت اند",
        href: "/courses/front-end",
        icon: Layout,
        courses: [
          { title: "آموزش HTML", href: "/course/html-tutorial" },
          { title: "آموزش CSS", href: "/course/css-tutorial" },
          { title: "آموزش TailwindCSS", href: "/course/tailwind-css" },
          {
            title: "آموزش جاوااسکریپت",
            href: "/course/java-script-zero-to-hero",
          },
        ],
      },

      {
        title: "بک اند",
        href: "/courses/back-end",
        icon: Server,
        courses: [
          { title: "آموزش PHP", href: "/course/php" },
          { title: "آموزش NodeJs", href: "/course/node-ex" },
          { title: "آموزش NestJS", href: "/course/nestjs" },
        ],
      },

      {
        title: "برنامه نویسی",
        href: "/courses/programming",
        icon: Code,
        courses: [
          { title: "آموزش پایتون", href: "/course/python" },
          { title: "آموزش C", href: "/course/c-lang" },
          { title: "آموزش Go", href: "/course/golang" },
        ],
      },
    ],
  },
];
