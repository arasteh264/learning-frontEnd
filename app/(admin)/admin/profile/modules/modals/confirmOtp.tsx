import { Modal, Input } from "antd";
import { useState } from "react";
 
type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
};
 
export default function ConfirmOtp({ open, onClose, onSubmit }: Props) {
  const [otp, setOtp] = useState("");
 
  return (
    <Modal
      title="تایید شماره موبایل"
      open={open}
      onCancel={onClose}
      width={350}
      okText="تایید"
      cancelText="بستن"
      centered
      okButtonProps={{
        className: "!bg-[#1EB35B] !border-[#1EB35B] hover:!bg-brand",
      }}
      onOk={() => onSubmit(otp)}
    >
      <div className="flex flex-col gap-3 pt-1">
        <span className="text-gray-400 text-sm">
          کد ارسال شده را وارد کنید
        </span>
 
        <Input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          placeholder="کد تایید"
          className="text-center tracking-widest"
        />
      </div>
    </Modal>
  );
}