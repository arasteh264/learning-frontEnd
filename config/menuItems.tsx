import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const sidebarMenuItemsWithSubmenus = [
  {
    key: "/dashboard",
    icon: <AppstoreOutlined />,
    label: "داشبورد اصلی",
  },
  {
    key: "settings-group",
    icon: <SettingOutlined />,
    label: "تنظیمات",
    children: [
      {
        key: "/dashboard/settings/profile",
        label: "پروفایل",
        icon: <UserOutlined />,
      },
      {
        key: "/dashboard/settings/account",
        label: "حساب کاربری",
        icon: <SettingOutlined />,
      },
    ],
  },
  {
    key: "/dashboard/users",
    icon: <UserOutlined />,
    label: "کاربران",
  },
];
