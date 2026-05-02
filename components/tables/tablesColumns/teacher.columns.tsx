import { Button, Popconfirm, Tag, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";

export const getTeacherColumns = (
  onEdit: (record: any) => void,
  handleDelete: (id: string) => void,
   onVerify: (id: string) => void
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

    {/* تایید استاد */}
    {!record.isVerified && (
      <Popconfirm
        title="آیا این استاد تایید شود؟"
        okText="بله"
        cancelText="نه"
        onConfirm={() => onVerify(record._id)}
      >
        <Tooltip title="تایید استاد">
          <Button
            type="text"
            icon={<CheckOutlined style={{ color: "green" }} />}
          />
        </Tooltip>
      </Popconfirm>
    )}

    {/* EDIT */}
    <Tooltip title="ویرایش">
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => onEdit(record)}
      />
    </Tooltip>

    {/* DELETE */}
    <Popconfirm
      title="آیا از حذف این استاد مطمئن هستید؟"
      okText="بله"
      cancelText="نه"
      onConfirm={() => handleDelete(record._id)}
    >
      <Tooltip title="حذف">
        <Button danger type="text" icon={<DeleteOutlined />} />
      </Tooltip>
    </Popconfirm>

  </div>
)
}
];