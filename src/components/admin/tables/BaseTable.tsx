import { Table } from "antd";

type Props = {
  columns: any;
  data: any[];
  loading?: boolean;
  total?: number;
  page?: number;
  pageSize?: number;
  onChangePage?: (page: number) => void;
};

export default function BaseTable({
  columns,
  data,
  loading,
  total = 0,
  page = 1,
  pageSize = 10,
  onChangePage,
}: Props) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading ?? false}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: false,
          position: ["bottomCenter"],
          onChange: (p) => onChangePage?.(p),
        }}
      />
    </div>
  );
}