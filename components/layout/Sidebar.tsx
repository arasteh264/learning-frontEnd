'use client';
import React from 'react';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation'; // برای App Router
import { sidebarMenuItemsWithSubmenus } from '@/config/menuItems';
import SubMenu from 'antd/es/menu/SubMenu';

const { Sider } = Layout;
// const { SubMenu } = Menu; // اگر نیاز به SubMenu دارید، این خط را از کامنت دربیاورید

const Sidebar = () => {
  const pathname = usePathname();




  // پیدا کردن آیتم فعلی برای هایلایت کردن
  // این بخش برای زمانی است که فقط از Menu.Item استفاده می‌کنید.
  // اگر از SubMenu استفاده می‌کنید، منطق کمی پیچیده‌تر می‌شود.
  // let selectedKey = pathname;
  // if (!menuItems.find(item => item.key === pathname)) {
  //   selectedKey = '/dashboard'; // مقدار پیش‌فرض در صورت عدم تطابق
  // }

  return (
    <Sider
      width={256}
      className="min-h-screen  text-gray-100"
    >
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h2 className="text-2xl font-bold ">سبز لرن</h2>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[pathname]} 
        className=""
        style={{ border: 'none' }}
      >
        {sidebarMenuItemsWithSubmenus.map((item) => (
  
          item.children ? (
            <SubMenu
              key={item.key}
              icon={item.icon}
              title={item.label}
              theme='light'
            >
              {item.children.map((child) => (
                <Menu.Item key={child.key} icon={child.icon} className='!bg-none'>
                  <Link href={child.key}>{child.label}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon} className='!bg-none'>
              <Link href={item.key}>{item.label}</Link>
            </Menu.Item>
          )
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
