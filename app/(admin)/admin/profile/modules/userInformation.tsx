import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  EditOutlined,
  CameraOutlined,
  IdcardOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { getUserProfile } from "@/src/services/user";
import EditProfileModal from "./modals/editProfileModal";
import TeacherRequestModal from "./modals/teacherRequest";
import Image from "next/image";

type ProfileFieldProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function ProfileField({ icon, label, value }: ProfileFieldProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="w-9 h-9 rounded-full bg-[#EAF1EB] flex items-center justify-center text-[#1EB35B] text-base shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="font-medium text-[#1C2B27] text-sm truncate">
          {value}
        </span>
      </div>
    </div>
  );
}

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "مدیر",
  TEACHER: "استاد",
  STUDENT: "دانشجو",
  USER: "دانشجو",
};

export default function ProfileInfo() {
  const { data, isLoading } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: getUserProfile,
  });
  const userData = data?.data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openModal = () => setIsModalOpen(true);
  const openTeacherModal = () => setIsTeacherModalOpen(true);
  const closeTeacherModal = () => setIsTeacherModalOpen(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const initials = userData?.name ? userData.name.trim().charAt(0) : "?";
  const roleLabel = userData?.role
    ? ROLE_LABELS[userData.role] || userData.role
    : "دانشجو";

  return (
    <section className="w-full h-full flex flex-col items-center px-4 py-8 gap-6">
      <div className="w-full max-w-2xl flex flex-col items-center text-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={handleAvatarClick}
            className="w-24 h-24 rounded-full overflow-hidden bg-[#EAF1EB] flex items-center justify-center text-3xl font-medium text-[#1EB35B] border-2 border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1EB35B]/40"
            aria-label="آپلود عکس پروفایل"
          >
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="عکس پروفایل"
                width={200}
                height={200}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              initials
            )}
          </button>
          <span
            onClick={handleAvatarClick}
            className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-[#1EB35B] flex items-center justify-center text-white text-sm cursor-pointer border-2 border-white"
          >
            <CameraOutlined />
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-[#1C2B27]">
            {isLoading
              ? "در حال بارگذاری..."
              : `${userData?.name || ""} ${userData?.lastName || ""}`.trim() ||
                "کاربر مهمان"}
          </h1>
          <span className="inline-flex items-center gap-1 self-center text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
            <CrownOutlined className="text-[11px]" />
            {roleLabel}
          </span>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <button
            onClick={openModal}
            className="flex items-center gap-1.5 text-sm text-[#1EB35B] hover:text-[#17914a] font-medium transition-colors"
          >
            <EditOutlined />
            ویرایش اطلاعات
          </button>
          <span className="text-sm font-medium text-[#1C2B27]">
            اطلاعات شناسایی
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-gray-100">
          <div className="sm:border-l border-gray-100">
            <ProfileField
              icon={<IdcardOutlined />}
              label="کد ملی"
              value={userData?.nationalId || "ثبت نشده"}
            />
          </div>
          <ProfileField
            icon={<PhoneOutlined />}
            label="شماره موبایل"
            value={userData?.phone || "ثبت نشده"}
          />
          <div className="sm:border-l border-gray-100">
            <ProfileField
              icon={<MailOutlined />}
              label="ایمیل"
              value={userData?.email || "ثبت نشده"}
            />
          </div>
          <ProfileField
            icon={<CalendarOutlined />}
            label="تاریخ تولد"
            value="ثبت نشده"
          />
        </div>
      </div>

      <div className="w-full max-w-2xl bg-[#FBF5E9] border border-[#EFE0BC] rounded-2xl px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-0.5 text-right">
          <span className="text-sm font-medium text-[#7A5A1E]">
            به تیم اساتید ما بپیوندید
          </span>
          <span className="text-xs text-[#9A8048]">
            اگر تخصص خاصی دارید، می‌تونید درخواست تدریس بدید
          </span>
        </div>
        <button
          onClick={openTeacherModal}
          className="shrink-0 bg-[#C9974E] hover:bg-[#B8853D] text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
        >
          ارسال درخواست
        </button>
      </div>

      <EditProfileModal
        open={isModalOpen}
        data={{
          name: userData?.name || "",
          lastName: userData?.lastName || "",
          nationalId: userData?.nationalId || "",
          phone: userData?.phone || "",
          email: userData?.email || "",
          day: "1",
          month: "1",
          year: "1370",
        }}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      />

      <TeacherRequestModal
        open={isTeacherModalOpen}
        onClose={closeTeacherModal}
      />
    </section>
  );
}
