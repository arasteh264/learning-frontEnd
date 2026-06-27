import { Modal, Input, Select } from "antd";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { requestForTeacher, TeacherRequestPayload } from "@/src/services/teacher";
import { toast } from "react-toastify";
import { ApiError } from "@/src/types/globalType";


type Props = {
  open: boolean;
  onClose: () => void;
};

type TeacherFormData = TeacherRequestPayload & {
  expertise: string[];
};



export default function TeacherRequestModal({ open, onClose }: Props) {
  const [formData, setFormData] = useState<TeacherFormData>({
    bio: "",
    phone: "",
    email: "",
    expertise: [],
  });

  const requestMutation = useMutation({
    mutationFn: (payload: TeacherFormData) => requestForTeacher(payload),
    onSuccess: () => {
      toast.success("درخواست با موفقیت ارسال شد");
      onClose();
      setFormData({ bio: "", phone: "", email: "", expertise: [] });
    },
    onError: (err: ApiError) => {
      toast.error(err?.response?.data?.message || "خطا رخ داد");
    },
  });

  const handleChange = <K extends keyof TeacherFormData>(
    field: K,
    value: TeacherFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    requestMutation.mutate(formData);
  };

  return (
    <Modal title="درخواست تدریس" open={open} onCancel={onClose}
      onOk={handleSubmit} okText="ارسال درخواست" cancelText="بستن"
      okButtonProps={{
        className: "!bg-[#1EB35B] !border-[#1EB35B] hover:!bg-[#17914a]",
        loading: requestMutation.isPending,
      }} centered>
      <div className="flex flex-col gap-3 pt-1">
        <span className="text-gray-400 text-sm leading-6">
          چند خط درباره خودتان و حوزه تخصصی‌تان بنویسید
        </span>

        <div className="flex flex-col gap-1">
          <span className="text-sm text-[#1C2B27]">بیو</span>
          <Input.TextArea value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            placeholder="درباره تجربه و سابقه تدریس خود بنویسید" rows={3} />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm text-[#1C2B27]">تخصص‌ها</span>
          <Select mode="tags" style={{ width: "100%" }}
            placeholder="مثلاً React, Nodejs"
            value={formData.expertise}
            onChange={(values: string[]) => handleChange("expertise", values)} />
        </div>
      </div>
    </Modal>
  );
}