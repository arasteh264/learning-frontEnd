import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  BookOutlined,
  TagsOutlined,
  PlayCircleOutlined,
  TeamOutlined,
  ProfileOutlined,
  TagOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  SwapOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

export const sidebarMenuItemsWithSubmenus = [
  {
    key: "/dashboard",
    icon: <AppstoreOutlined />,
    label: "داشبورد اصلی",
  },

  {
    key: "user-group",
    icon: <SettingOutlined />,
    label: "کاربران",
    children: [
      {
        key: "/admin/users",
        icon: <TeamOutlined />,
        label: "لیست کاربران",
      },
      {
        key: "/admin/teacher",
        label: "لیست اساتید",
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: "courses-group",
    icon: <BookOutlined />,
    label: "دوره ها",
    children: [
      {
        key: "/admin/courses",
        icon: <ProfileOutlined />,
        label: "مدیریت دوره‌ها",
      },

      {
        key: "/admin/categories",
        icon: <TagsOutlined />,
        label: "دسته‌بندی دوره‌ها",
      },

      {
        key: "/admin/sessions",
        icon: <PlayCircleOutlined />,
        label: "جلسات دوره‌ها",
      },
    ],
  },
  {
    key: "content-group",
    icon: <FileTextOutlined />,
    label: "محتوا",
    children: [
      {
        key: "/admin/article",
        icon: <FileTextOutlined />,
        label: "مقاله‌ها",
      },
    ],
  },
  {
    key: "settings-group-stie",
    icon: <SettingOutlined />,
    label: "تنظیمات سایت",
    children: [
      {
        key: "/admin/announcement",
        label: "اطلاعیه تخفیف",
        icon: <TagOutlined />,
      },
    ],
  },
  {
  key: "payments-group",
  icon: <CreditCardOutlined />,
  label: "پرداخت‌ها",
  children: [
    {
      key: "/admin/payments/transactions",
      label: "تراکنش‌ها",
      icon: <SwapOutlined />,
    },
    {
      key: "/admin/payments/orders",
      label: "سفارش‌ها",
      icon: <ShoppingCartOutlined />,
    },
  ],
},
  {
    key: "settings-group",
    icon: <SettingOutlined />,
    label: "تنظیمات",
    children: [
      {
        key: "/admin/profile",
        label: "پروفایل",
        icon: <UserOutlined />,
      },
      {
        key: "/admin/settings/account",
        label: "حساب کاربری",
        icon: <SettingOutlined />,
      },
    ],
  },
];
