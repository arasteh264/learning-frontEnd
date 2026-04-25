import { Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import EditProfileModal from "./modals/editProfileModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    nationalId: "",
    phone: "",
    email: "",
    // birthDate: "",
    lastName: "",
     day: "1",
  month: "1",
  year: "1300",
  });
  const openModal = (data: typeof formData) => {
    setFormData(data);
    setIsModalOpen(true);
  };
  return (
    <div className="w-[50%] border border-gray-200 rounded-lg flex items-center justify-center">
      <div className="w-full flex flex-col ">
        <div className="flex items-center justify-between px-2 gap-5 border-b border-gray-200">
          <ProfileItem label="کد ملی" value="1234567890" hasBorder={true} />
          <ProfileItem
            label="نام و نام خانوادگی"
            value="علی رضایی"
            hasBorder={false}
            onEdit={() =>
              openModal({
                name: "علی",
                lastName: "رضایی",
                nationalId: "1234567890",
                phone: "09123456789",
                email: "test@gmail.com",
                // birthDate: "1370/01/01",
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
            value="09123456789"
            hasBorder={true}
          />
          <ProfileItem label="ایمیل" value="test@gmail.com" hasBorder={false} />
        </div>
        <div className="flex items-center justify-between px-2 gap-5 ">
          <ProfileItem label="تاریخ تولد" value="1370/01/01" hasBorder={true} />
          <ProfileItem label="شغل" value="دانشجو" hasBorder={false} />
        </div>
      </div>
      <EditProfileModal
        open={isModalOpen}
        data={formData}
        onCancel={() => setIsModalOpen(false)}
        onOk={(data) => {
          console.log(data);
          setIsModalOpen(false);
        }}
        onChange={setFormData}
      />
    </div>
  );
}
