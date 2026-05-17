import { Button, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const getSessionColumns = (
  onEdit: (record: any) => void,
  handleDelete: (id: string) => void,
  onPreview?: (video: string) => void
) => [
  {
    title: "عنوان جلسه",
    dataIndex: "title",
    key: "title",
  },

  {
    title: "مدت زمان",
    dataIndex: "time",
    key: "time",
  },

  {
    title: "دوره",
    dataIndex: "courseName",
    key: "courseName",
  },

  {
    title: "وضعیت",
    dataIndex: "free",
    key: "free",
    render: (free: number) =>
      free === 0 ? (
        <Tag color="green">رایگان</Tag>
      ) : (
        <Tag color="gold">غیر رایگان</Tag>
      ),
  },
{
  title: "ویدیو",
  dataIndex: "video",
  key: "video",
  render: (video: string) => (
    <span
      className="text-blue-500 cursor-pointer hover:underline"
      onClick={() => onPreview?.(video)}
    >
      مشاهده ویدیو
    </span>
  ),
},

  {
    title: "عملیات",
    key: "actions",
    render: (_: any, record: any) => (
      <div className="flex gap-2">

        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(record.id)}
        />

        <Popconfirm
          title="آیا از حذف این جلسه مطمئن هستید؟"
          okText="بله"
          cancelText="نه"
          onConfirm={() => handleDelete(record.id || record.id)}
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