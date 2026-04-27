import { Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import EditProfileModal from "./modals/editProfileModal";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/user";

type ProfileItemProps = {
  label: string;
  value: string;
  onEdit?: () => void;
  hasBorder?: boolean;
};

function ProfileItem({ label, value, onEdit, hasBorder }: ProfileItemProps) {
  return (
    <div
      className={`w-full flex items-center justify-between px-4 py-4 ${
        hasBorder ? "border-r border-gray-200" : ""
      }`}
    >
      <EditOutlined
        onClick={onEdit}
        className="text-gray-500 cursor-pointer hover:text-blue-500 text-lg"
      />

      <div className="flex flex-col gap-2 text-right">
        <span className="text-gray-500">: {label}</span>
        <span className="font-semibold">{value}</span>
      </div>
    </div>
  );
}

export default function ProfileInfo() {
    const { data, isLoading, error } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: getUserProfile,
  });
  const userData = data?.data;
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = (data: any) => {
  
    setIsModalOpen(true);
  };
  return (
    <div className="w-[50%] border border-gray-200 rounded-lg flex items-center justify-center">
      <div className="w-full flex flex-col ">
        <div className="flex items-center justify-between px-2 gap-5 border-b border-gray-200">
          <ProfileItem
  label="کد ملی"
  value={userData?.nationalId || "-"}
  hasBorder={true}
/>

<ProfileItem
  label="نام و نام خانوادگی"
  value={`${userData?.name || ""} ${userData?.lastName || ""}`}
  hasBorder={false}
  onEdit={() =>
    openModal({
      name: userData?.name || "",
      lastName: userData?.lastName || "",
      nationalId: userData?.nationalId || "",
      phone: userData?.phone || "",
      email: userData?.email || "",
      day: "1",
      month: "1",
      year: "1370",
    })
  }
/>
        </div>
        <div className="flex items-center justify-between px-2 gap-5 border-b border-gray-200">
 <ProfileItem
  label="شماره موبایل"
  value={userData?.phone || "-"}
  hasBorder={true}
/>

<ProfileItem
  label="ایمیل"
  value={userData?.email || "-"}
  hasBorder={false}
/>
        </div>
        <div className="flex items-center justify-between px-2 gap-5 ">
<ProfileItem
  label="تاریخ تولد"
  value="-"
  hasBorder={true}
/>          <ProfileItem label="شغل" value="دانشجو" hasBorder={false} />
        </div>
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
        onOk={(formData) => {
          console.log(formData);
          setIsModalOpen(false);
        }}
        />
    </div>
  );
}
