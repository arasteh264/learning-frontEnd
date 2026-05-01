import { Modal, Input, Button, Upload, message, Select } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { getCategoryList } from "@/services/category";
import { useQuery } from "@tanstack/react-query";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
};

export default function TeacherRequestModal({ open, onClose, onSubmit }: Props) {
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: getCategoryList,
  });

  const [formData, setFormData] = useState({
    categoryIds: [] as number[], 
    teachingTopic: "",
    bio: "",
    expertise: "",
    resume: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCategoryChange = (values: number[]) => {
    setFormData((prev) => ({ ...prev, categoryIds: values }));
  };



  const categories = data?.data ?? data ?? []; 

  // const addMutation = useMutation({
  //   mutationFn: (newCategory: CategoryForm) => addCategory(newCategory),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["category"] });
  //     toast.success("دسته‌بندی با موفقیت اضافه شد.");
  //     setOpen(false);
  //   },
  //   onError: (err: any) => {
  //     toast.error(`خطا در افزودن دسته‌بندی: ${err.message || "خطای نامشخص"}`);
  //   },
  // });
  const onSubmit = (formData) => {
  // if (editing?._id) {
  //   updateMutation.mutate({ newCategory: formData, id: editing?._id });
  // } else {
  //   addMutation.mutate(formData);
  }
};
  return (
    <Modal
      title="درخواست تدریس"
      open={open}
      onCancel={onClose}
      width={350}
      okText="ارسال درخواست"
      cancelText="بستن"
      centered
      onOk={() => onSubmit(formData)}
    >
      <div className="flex flex-col gap-3">
        <span className="text-gray-500 text-sm">دسته‌بندی‌های تخصصی :</span>

        <Select
          mode="multiple"
          allowClear
          placeholder="چند دسته انتخاب کنید"
          style={{ width: "100%" }}
          value={formData.categoryIds}
          onChange={handleCategoryChange}
        >
          {categories.map((item: any) => (
            
            <Select.Option key={item._id} value={item._id}>
              {item.title}
            </Select.Option>
          ))}
        </Select>

        <span className="text-gray-500 text-sm">موضوع تدریسی</span>
        <Input
          value={formData.teachingTopic}
          onChange={(e) => handleInputChange(e, "teachingTopic")}
          placeholder="موضوع تدریسی"
        />

        <span className="text-gray-500 text-sm">بیو</span>
        <Input
          value={formData.bio}
          onChange={(e) => handleInputChange(e, "bio")}
          placeholder="بیو"
        />

        <span className="text-gray-500 text-sm">تخصص (Expertise)</span>
        <Input
          value={formData.expertise}
          onChange={(e) => handleInputChange(e, "expertise")}
          placeholder="تخصص"
        />

        {/* <span className="text-gray-500 text-sm">رزومه</span> */}
        {/* <Upload
          name="resume"
          accept=".pdf,.doc,.docx"
          showUploadList={false}
          onChange={handleFileChange}
        >
          <Button icon={<UploadOutlined />}>بارگذاری رزومه</Button>
        </Upload> */}
      </div>
    </Modal>
  );
}
