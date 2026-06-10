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
      key: "/admin/teachers",
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
    key: "settings-group-stie",
    icon: <SettingOutlined />,
    label: "تنظیمات سایت",
    children: [
      {
        key: "/admin/announcement",
        label: "اطلاعیه تخفیف",
        icon: <TagOutlined  />,
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
