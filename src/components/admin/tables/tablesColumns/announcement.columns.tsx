import { Button, Popconfirm, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "jalali-moment";
export const getannouncementColumns = (
  onEdit: any,
  onDelete: any,
  onToggleStatus:any
) => [
{
  title: "تاریخ پایان",
  dataIndex: "end_date",
  key: "end_date",
  render: (date: any) => {
    if (!date) return "—";
    const persianDigits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
    const formatted: string = moment.utc(date)
      .local()
      .locale("fa")
      .format("YYYY/MM/DD HH:mm");
    return formatted.replace(/\d/g, (d) => persianDigits[Number(d)] as string);
  }
},
  {
    title: "متن اعلان",
    dataIndex: "text",
    key: "text",
  },
{
  title: "تغییر وضعیت",
  key: "toggle_status",
  render: (_: any, record: any) => (
    <Button
      type={record.is_active ? "default" : "primary"}
      size="small"
      onClick={() => onToggleStatus(record)}
      style={{
        backgroundColor: record.is_active ? "#52c41a" : "#ff4d4f",
        borderColor: record.is_active ? "#52c41a" : "#ff4d4f",
        color: "#fff",
        fontWeight: 600,
        borderRadius: 5,
        padding: "0 14px",
      }}
    >
      {record.is_active ? "فعال" : "غیرفعال"}
    </Button>
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
          onClick={() => onEdit(record)}
        />

        <Popconfirm
          title="آیا از حذف این دسته‌بندی مطمئن هستید؟"
          okText="بله"
          cancelText="نه"
          onConfirm={() => onDelete(record)}
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