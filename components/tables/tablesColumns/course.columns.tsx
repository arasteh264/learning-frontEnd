import { Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const getCourseColumns = (
  onEdit?: any,
  onDelete?: any,
  onPreview?: (cover: string) => void
) => [
  {
    title: "عنوان دوره",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "مدرس",
    dataIndex: "creator",
    key: "creator",
  },
    {
    title: "دسته بندی",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "قیمت",
    dataIndex: "price",
    key: "price",
  },
    {
    title: "تخفیف",
    dataIndex: "discount",
    key: "discount",
  },
{
  title: "کاور",
  dataIndex: "cover",
  key: "cover",
  render: (cover: string) => (
    <span
      className="text-blue-500 cursor-pointer hover:underline"
      onClick={() => onPreview?.(cover)}
    >
      پیش‌نمایش
    </span>
  ),
},
  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
    render: (status: boolean) =>
      status ? "فعال" : "غیرفعال",
  },
  {
    title: "عملیات",
    key: "actions",
    render: (_: any, record: any) => (
      <div className="flex gap-2">
        
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
        />

        <Popconfirm
          title="حذف دوره؟"
          okText="بله"
          cancelText="نه"
          onConfirm={() => onDelete(record.id)}
        >
          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
          />
        </Popconfirm>

      </div>
    ),
  },
  
];