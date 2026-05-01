import { Button, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const getTeacherColumns = (
  onEdit: (record: any) => void,
  handleDelete: (id: string) => void
) => [
  {
    title: "نام استاد",
    dataIndex: "teacherName",
    key: "teacherName",
  },

  {
    title: "ایمیل استاد",
    dataIndex: "teacherEmail",
    key: "teacherEmail",
  },

  {
    title: "توضیحات",
    dataIndex: "bio",
    key: "bio",
    render: (bio: string) => bio || "—",  // نمایش "—" در صورت عدم وجود bio
  },

  {
    title: "وضعیت تایید",
    dataIndex: "isVerified",
    key: "isVerified",
    render: (isVerified: boolean) =>
      isVerified ? (
        <Tag color="green">تایید شده</Tag>
      ) : (
        <Tag color="red">تایید نشده</Tag>
      ),
  },

  {
    title: "دوره‌ها",
    dataIndex: "courses",
    key: "courses",
    render: (courses: any[]) =>
      courses.length > 0 ? (
        courses.map((course, index) => (
          <Tag color="blue" key={index}>
            {course.title}
          </Tag>
        ))
      ) : (
        "—"
      ),  // نمایش دوره‌ها
  },

  {
    title: "تخصص‌ها",
    dataIndex: "expertise",
    key: "expertise",
    render: (expertise: any[]) =>
      expertise.length > 0 ? (
        expertise.map((exp, index) => (
          <Tag color="purple" key={index}>
            {exp}
          </Tag>
        ))
      ) : (
        "—"
      ),  // نمایش تخصص‌ها
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
          title="آیا از حذف این استاد مطمئن هستید؟"
          okText="بله"
          cancelText="نه"
          onConfirm={() => handleDelete(record.teacherId || record.id)}
        >
          <Button danger type="text" icon={<DeleteOutlined />} />
        </Popconfirm>
      </div>
    ),
  },
];