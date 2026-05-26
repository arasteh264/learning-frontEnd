export const categories = [
  { id: 19, label: "HTML & CSS" },
  { id: 1, label: "ارتقای مهارت ها" },
  { id: 2, label: "امنیت" },
  { id: 21, label: "برنامه نویسی" },
  { id: 3, label: "بک اند" },
  { id: 4, label: "پایتون" },
  { id: 5, label: "پی اچ پی" },
  { id: 15, label: "جاوااسکریپت" },
  { id: 6, label: "دسکتاپ" },
  { id: 17, label: "ری اکت جی اس" },
  { id: 7, label: "سیستم عامل" },
  { id: 8, label: "شبکه" },
  { id: 9, label: "فرانت اند" },
  { id: 10, label: "فلاتر" },
  { id: 11, label: "مهارت های نرم" },
  { id: 20, label: "موبایل و آی او اس" },
  { id: 12, label: "نود جی اس" },
  { id: 13, label: "هوش مصنوعی" },
  { id: 18, label: "وردپرس" },
  { id: 16, label: "ویو جی اس" },
];
export const updateSortOptions = [
  { id: "default", label: "پیشفرض" },
  { id: "popular", label: "پرطرفدار ترین" },
  { id: "newest", label: "جدید ترین" },
  { id: "latest", label: "آخرین آپدیت" },
]
export const courses = [
  {
    id: 1,
    title: "آموزش React از صفر تا ورود به بازار کار",
    href: "/course/react",
    image: "/slider/1.webp",
    description:
      "یادگیری React به صورت پروژه محور و کاملاً کاربردی برای ورود به بازار کار.",
    author: {
      name: "محمدامین سعیدی راد",
      avatar: "/slider/1.webp",
    },
    rating: 4.8,
    students: 300,
    price: 1875000,
    oldPrice: 6250000,
    discount: 70,
  },
  {
    id: 2,
    title: "Next.js حرفه‌ای برای پروژه‌های واقعی",
    href: "/course/nextjs",
    image: "/slider/2.webp",
    description: "ساخت اپلیکیشن‌های SSR و Fullstack با Next.js",
    author: {
      name: "علی رضایی",
      avatar: "/slider/2.webp",
    },
    rating: 4.7,
    students: 300,
    price: 1990000,
    oldPrice: 4000000,
    discount: 50,
  },
  {
    id: 3,
    title: "JavaScript پیشرفته",
    href: "/course/js",
    image: "/slider/3.webp",
    description: "درک عمیق از JS و مفاهیم پیشرفته",
    author: {
      name: "سارا محمدی",
      avatar: "/slider/3.webp",
    },
    rating: 4.6,
    students: 300,
    price: 1500000,
    oldPrice: 3000000,
    discount: 50,
  },
  {
    id: 4,
    title: "TypeScript از صفر تا حرفه‌ای",
    href: "/course/ts",
    image: "/slider/4.webp",
    description: "تایپ‌اسکریپت برای پروژه‌های واقعی",
    author: {
      name: "رضا کریمی",
      avatar: "/slider/4.webp",
    },
    rating: 4.9,
    students: 300,
    price: 2200000,
    oldPrice: 5000000,
    discount: 60,
  },
];


import {
  CalendarDays,
  Clock3,
  MonitorPlay,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export const courseDetails = {
  breadcrumb: [
    { title: "خانه", href: "/" },
    { title: "دوره ها", href: "/courses" },
    { title: "وردپرس", href: "/courses/wordpress" },
  ],

  hero: {
    title: "آموزش جامع توسعه وردپرس",

    description:
      "آموزش وردپرس یکی از بهترین مسیرها برای ورود به دنیای طراحی سایت است، چرا که وردپرس پرکاربردترین و محبوب‌ترین سیستم مدیریت محتوا است که در دنیای طراحی سایت حرف اول را می‌زند.",

    image:
      "/slider/4.webp",

    discountTitle: "50% تخفیف شگفت انگیز",

    countdown: {
      hours: 6,
      minutes: 4,
      seconds: 52,
    },

    oldPrice: 7500000,
    price: 3750000,
  },

  stats: [
    {
      id: 1,
      title: "منتشر شده",
      label: "وضعیت دوره",
      icon: TrendingUp,
    },

    {
      id: 2,
      title: "33 ساعت",
      label: "مدت زمان دوره",
      icon: Clock3,
    },

    {
      id: 3,
      title: "214",
      label: "تعداد ثبت نامی",
      icon: Users,
    },

    {
      id: 4,
      title: "5",
      label: "امتیاز دوره",
      icon: Star,
    },

    {
      id: 5,
      title: "1405/03/01",
      label: "بروزرسانی شده",
      icon: CalendarDays,
    },

    {
      id: 6,
      title: "فقط آنلاین",
      label: "نحوه مشاهده",
      icon: MonitorPlay,
    },
  ],
};



export const courseSessionsMock = [
  {
    id: 1,
    title: "جلسه ۱: مقدمه و آشنایی با دوره",
    duration: "12 دقیقه",
    isFree: true,
  },
  {
    id: 2,
    title: "جلسه ۲: نصب ابزارهای مورد نیاز",
    duration: "18 دقیقه",
    isFree: true,
  },
  {
    id: 3,
    title: "جلسه ۳: ساخت اولین پروژه",
    duration: "35 دقیقه",
    isFree: false,
  },
  {
    id: 4,
    title: "جلسه ۴: مفاهیم پایه React",
    icon: "Layers",
    isFree: false,
  },
  {
    id: 5,
    title: "جلسه ۵: مدیریت state در پروژه واقعی",
    duration: "50 دقیقه",
    isFree: false,
  },
];
export const courseComments = [
  {
    id: "1",
    user: {
      name: "Taha_DevLab",
      role: "دانشجو",
      avatar: "/slider/1.webp",
    },
    date: "1405/02/03",
    content:
      "میخواستم بدونم دوره روی حالت منتشر شده هست ولی یک سری سرفصل ها خالیه!!! آیا دوره آپدیت میشه ؟",
    reply: {
      user: {
        name: "معین باغشیخی",
        role: "مدرس",
        avatar: "/slider/1.webp",
      },
      date: "1405/02/05",
      content: "بله. دوره همچنان آپدیت میشه تا سرفصل های باقی مونده تکمیل بشن",
    },
  },

  {
    id: "2",
    user: {
      name: "Ali_React",
      role: "دانشجو",
      avatar: "/slider/1.webp",
    },
    date: "1405/02/10",
    content:
      "این دوره برای کسی که صفره مناسبه یا باید قبلش JS قوی بلد باشیم؟",
    reply: null,
  },

  {
    id: "3",
    user: {
      name: "Sara_Web",
      role: "دانشجو",
      avatar: "/slider/1.webp",
    },
    date: "1405/02/12",
    content:
      "پروژه‌های واقعی هم داخل دوره هست یا فقط آموزش تئوریه؟",
    reply: {
      user: {
        name: "مدرس",
        role: "مدرس",
        avatar: "/slider/1.webp",
      },
      date: "1405/02/13",
      content:
        "بله، کل دوره پروژه‌محوره و چندین پروژه واقعی مثل قالب فروشگاهی و افزونه اختصاصی داریم.",
    },
  },

  {
    id: "4",
    user: {
      name: "FrontEnd_Builder",
      role: "دانشجو",
      avatar: "/slider/1.webp",
    },
    date: "1405/02/15",
    content: "آپدیت‌ها رایگان هستن یا باید دوباره خرید کنیم؟",
    reply: null,
  },
];