'use client';
import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, Row, Col, message, Avatar } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { blue, red, green } from '@ant-design/colors';
import { useForm, Controller } from 'react-hook-form'; // Import useForm and Controller

const { Title } = Typography;

// داده‌های اولیه پروفایل (می‌تواند از API دریافت شود)
const initialUserProfile = {
  id: '12345',
  name: 'علی رضایی',
  email: 'ali.rezaei@example.com',
  phon: '09121234567',
  role: 'کاربر',
};

function ProfilePage() {
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [isEditing, setIsEditing] = useState(false);

  // راه‌اندازی react-hook-form
  const {
    handleSubmit,
    control, // برای استفاده با کامپوننت‌های غیرمتنی (مثل آنت دیزاین)
    reset,
    setValue,
    formState: { errors, isSubmitting }, // errors حاوی خطاها، isSubmitting برای وضعیت ارسال
  } = useForm({
    defaultValues: initialUserProfile, // مقدار پیش‌فرض فرم
    // mode: 'onChange', // می‌توانید mode اعتبارسنجی را تنظیم کنید (onChange, onBlur, onSubmit)
  });

  // بارگذاری اطلاعات کاربر در فرم هنگام ورود به حالت ویرایش
  useEffect(() => {
    if (isEditing) {
      // تنظیم مقادیر فرم با اطلاعات فعلی کاربر
      setValue('name', userProfile.name);
      setValue('email', userProfile.email);
      setValue('phon', userProfile.phon);
      // اگر نقش هم قابل ویرایش بود، اینجا اضافه می‌شد: setValue('role', userProfile.role);
    }
  }, [isEditing, userProfile, setValue]);

  // تابع مدیریت ارسال فرم (ذخیره تغییرات)
  const onSubmit = async (data:any) => {
    console.log('Updating profile with:', data);
    // شبیه‌سازی تاخیر API
    await new Promise(resolve => setTimeout(resolve, 1000));

    setUserProfile({ ...userProfile, ...data }); // به‌روزرسانی state محلی
    setIsEditing(false); // خروج از حالت ویرایش
    message.success('اطلاعات پروفایل با موفقیت ذخیره شد!');
  };

  // تابع برای لغو ویرایش
  const handleCancel = () => {
    setIsEditing(false);
    reset(initialUserProfile); // بازنشانی فرم به مقادیر اولیه اصلی
  };

  // تابع برای فعال کردن حالت ویرایش
  const handleEdit = () => {
    setIsEditing(true);
    // مقادیر فرم با useEffect تنظیم می‌شوند
  };

  return (
    <div className="w-full bg-white text-center">
    <div className='flex justify-around'>
              <Card
        className="w-full  mx-auto shadow-xl rounded-2xl overflow-hidden flex justify-around"
        bodyStyle={{ padding: '0' }}
      >
              <div className="text-center mb-4">
              <Avatar size={50} icon={<UserOutlined />} className="bg-white text-blue-500 mb-3" />
            </div>

            <div className='flex items-center'>
    <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">نام کامل</p>
                    <p className="text-base text-gray-800">{userProfile.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ایمیل</p>
                    <p className="text-base text-gray-800">{userProfile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">شماره تماس</p>
                    <p className="text-base text-gray-800">{userProfile.phon}</p>
                  </div>
                </div>
            </div>
            </Card>
    </div>
    </div>
  );
}

export default ProfilePage;
