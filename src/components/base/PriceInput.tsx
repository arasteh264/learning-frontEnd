import { Input } from "antd";

type Props = {
  value: string | number;
  onChange: (value: string) => void;
};

export const PriceInput = ({ value, onChange }: Props) => {
const formatNumber = (value: any) => {
  if (!value) return "";

  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

  return (
    <Input
      type="text"
      value={formatNumber(value)}
      onChange={(e) => {
        const rawValue = e.target.value.replace(/,/g, "");

        if (/^\d*$/.test(rawValue)) {
          onChange(rawValue);
        }
      }}
    />
  );
};