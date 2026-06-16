'use client';

import React from 'react';
import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { sidebarMenuItemsWithSubmenus } from '@/src/config/menuItems';

const { Sider } = Layout;

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/auth/login" || pathname === "/auth/register") return null;

  const selectedKey = pathname;

  const items = sidebarMenuItemsWithSubmenus.map((item) => {
    if (item.children) {
      return {
        key: item.key,
        icon: item.icon,
        label: item.label,
        children: item.children.map((child) => ({
          key: child.key,
          icon: child.icon,
          label: child.label,
          onClick: () => router.push(child.key),
        })),
      };
    }

    return {
      key: item.key,
      icon: item.icon,
      label: item.label,
      onClick: () => router.push(item.key),
    };
  });

  return (
    <Sider
      width={280}
      className="min-h-screen border-l border-gray-200"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
      }}
    >
      <div className="flex items-center gap-2 px-5 h-16 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400" />
        <span className="text-white font-semibold text-base tracking-wide">
          سبز لرن
        </span>
      </div>
<Menu
  mode="inline"
  items={items}
  selectedKeys={[selectedKey]}
  onClick={(e) => router.push(e.key)}
  style={{
    background: "transparent",
    border: "none",
    padding: "12px 8px",
    color: "#cbd5e1",
  }}
  className="custom-sidebar-menu"
/>
    </Sider>
  );
}