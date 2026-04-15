'use client';
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/user";

const HeaderDashborad = () => {

const [userData, setUserData] = useState();

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

  return (
    <header className="bg-white shadow py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">داشبورد</h1>
        {/* اینجا می‌توانید لوگو، نام کاربر، دکمه خروج و ... قرار دهید */}
        <div>
   {/* {userData && userData.neme ? (
            <span>{userData.neme} </span>
          ) : (
            <span>کاربر مهمان</span> // یا هر متن پیش‌فرض دیگری
          )} */}
          {/* <button>خروج</button> */}
        </div>
      </div>
    </header>
  );
};

export default HeaderDashborad;
