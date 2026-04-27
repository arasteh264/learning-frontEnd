"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/user";
import { UserOutlined, PoweroffOutlined  } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from 'next/navigation';
import Link from "next/link";
const HeaderDashborad = () => {
  const [userData, setUserData] = useState<UserProfileType>();
const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserProfile();

        setUserData(response.data);
      } catch (error) {
        console.error("خطا در دریافت داده:", error);
      } finally {
      }
    };

    fetchData();
  }, []);


 const handleLogout = () => {
  localStorage.removeItem("accessToken")
  router.push('/login');
  };

  return (
    <header className="bg-white shadow py-4 px-4 sm:px-6 lg:px-8 border-b border-b-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out" // کلاس‌های Tailwind
            onClick={handleLogout}
            danger></Button>
<Link href={"/profile"}>
          <Button
            type="primary"
            icon={<UserOutlined />}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out" // کلاس‌های Tailwind
           
          ></Button>
          </Link>
        </div>
        <div>
          {/* {userData && userData.name ? (
            <div className="flex gap-4">
              <span>نام : {userData.name} </span>
            </div>
          ) : (
            <span>کاربر مهمان</span>
          )} */}
        </div>
      </div>
    </header>
  );
};

export default HeaderDashborad;
