'use client';

import React from 'react';
import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { sidebarMenuItemsWithSubmenus } from '@/config/menuItems';

const { Sider } = Layout;

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

if (pathname === "/auth/login" || pathname === "/auth/register") return null;
  const selectedKey = '/' + pathname.split('/')[1];

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
      width={260}
      className="min-h-screen bg-white border-l border-gray-100"
    >
      {/* لوگو */}
      <div className="flex items-center justify-center h-16 border-b border-gray-100">
        <h2 className="text-xl font-bold text-white">
          سبز لرن
        </h2>
      </div>

      {/* منو */}
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={items}
        style={{
          border: 'none',
          height: '100%',
        }}
      />
    </Sider>
  );
}