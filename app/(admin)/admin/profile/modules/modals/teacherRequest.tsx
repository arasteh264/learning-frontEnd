import { Modal, Input, Select } from "antd";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestForTeacher } from "@/src/services/teacher";
import { toast } from "react-toastify";
import { getCategoryList } from "@/src/services/category";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TeacherRequestModal({ open, onClose }: Props) {
  const queryClient = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: ["category"],
    queryFn: getCategoryList,
  });

  const [formData, setFormData] = useState({
    bio: "",
    expertise: [] as string[],
  });

  const requestMutation = useMutation({
    mutationFn: (payload: any) => requestForTeacher(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
      toast.success("درخواست با موفقیت ارسال شد");
      onClose();
      setFormData({ bio: "", expertise: [] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "خطا رخ داد");
    },
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    requestMutation.mutate({
      bio: formData.bio,
      expertise: formData.expertise,
    });
  };

  return (
    <Modal
      title="درخواست تدریس"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="ارسال درخواست"
      cancelText="بستن"
      okButtonProps={{
        className: "!bg-[#1EB35B] !border-[#1EB35B] hover:!bg-[#17914a]",
        loading: requestMutation.isPending,
      }}
      centered
    >
      <div className="flex flex-col gap-3 pt-1">
        <span className="text-gray-400 text-sm leading-6">
          چند خط درباره خودتان و حوزه تخصصی‌تان بنویسید تا تیم ما درخواست شما
          را بررسی کند.
        </span>

        <div className="flex flex-col gap-1">
          <span className="text-sm text-[#1C2B27]">بیو</span>
          <Input.TextArea
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            placeholder="درباره تجربه و سابقه تدریس خود بنویسید"
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm text-[#1C2B27]">تخصص‌ها</span>
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="مثلاً React, Nodejs"
            value={formData.expertise}
            onChange={(values) => handleChange("expertise", values)}
          />
        </div>
      </div>
    </Modal>
  );
}