import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  BookOutlined,
  TagsOutlined,
  PlayCircleOutlined,
  TeamOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

export const sidebarMenuItemsWithSubmenus = [
  {
    key: "/dashboard",
    icon: <AppstoreOutlined />,
    label: "داشبورد اصلی",
  },

  {
    key: "courses-group",
    icon: <BookOutlined />,
    label: "دوره ها",
    children: [
      {
        key: "/courses",
        icon: <ProfileOutlined />,
        label: "مدیریت دوره‌ها",
      },

      {
        key: "/categories",
        icon: <TagsOutlined />,
        label: "دسته‌بندی دوره‌ها",
      },

      {
        key: "/sessions",
        icon: <PlayCircleOutlined />,
        label: "جلسات دوره‌ها",
      },
    ],
  },

  {
    key: "settings-group",
    icon: <SettingOutlined />,
    label: "تنظیمات",
    children: [
      {
        key: "/profile",
        label: "پروفایل",
        icon: <UserOutlined />,
      },
      {
        key: "/settings/account",
        label: "حساب کاربری",
        icon: <SettingOutlined />,
      },
    ],
  },

  {
  key: "user-group",
  icon: <SettingOutlined />,
  label: "کاربران",
  children: [
    {
      key: "/users",
      icon: <TeamOutlined />,  
      label: "لیست کاربران",
    },
    {
      key: "/teacher",
      label: "لیست اساتید",
      icon: <UserOutlined />,  
    },
  ],
}
];
