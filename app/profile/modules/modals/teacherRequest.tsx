import { Modal, Input, Select } from "antd";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestForTeacher } from "@/services/teacher";
import { toast } from "react-toastify";
import { getCategoryList } from "@/services/category";

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

  // mutation
  const requestMutation = useMutation({
    mutationFn: (payload: any) => requestForTeacher(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
      toast.success("درخواست با موفقیت ارسال شد");
      onClose();
      setFormData({ bio: "", expertise: [] });
    },

    onError: (err: any) => {
      toast.error(err.response.data.message || "خطا رخ داد");
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
      centered
    >
      <div className="flex flex-col gap-3">

        <span className="text-gray-500 text-sm">بیو</span>
        <Input
          value={formData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          placeholder="بیو شما"
        />

        <span className="text-gray-500 text-sm">تخصص‌ها</span>
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="مثلاً React, Nodejs"
          value={formData.expertise}
          onChange={(values) => handleChange("expertise", values)}
        />

      </div>
    </Modal>
  );
}