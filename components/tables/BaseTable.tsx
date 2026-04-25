import { Table } from "antd";

type Props = {
  columns: any;
  data: any[];
  loading?: boolean;
};

export default function BaseTable({ columns, data, loading }: Props) {
  return (
    <Table
    
      direction="rtl"
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
}