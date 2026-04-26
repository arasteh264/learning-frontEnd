import { Button, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const getSessionColumns = (
  onEdit: (record: any) => void,
  handleDelete: (id: string) => void
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
    dataIndex: "course",
    key: "course",
    render: (course: any) =>
      course?.title ? course.title : "—",
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
      <a
        href={video}
        target="_blank"
        className="text-blue-500 hover:underline"
      >
        مشاهده
      </a>
    ),
  },

  {
    title: "عملیات",
    key: "actions",
    render: (_: any, record: any) => (
      <div className="flex gap-2">

        {/* EDIT */}
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
        />

        {/* DELETE */}
        <Popconfirm
          title="آیا از حذف این جلسه مطمئن هستید؟"
          okText="بله"
          cancelText="نه"
          onConfirm={() => handleDelete(record._id || record.id)}
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