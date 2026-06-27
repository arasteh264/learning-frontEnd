 type SelectOption = {
  value: string;
  label: string;
};
export const toSelectOptions = <
  T extends { id: string | number; name?: string; title?: string }
>(
  data: T[],
  labelKey: "name" | "title"
) => {
  return data.map((item) => ({
    value: String(item.id), 
    label: item[labelKey] ?? "",
  }));
};