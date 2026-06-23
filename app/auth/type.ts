export type LoginInputs = {
  username: string;
  password: string;
  remember: boolean;
};
export type Inputs = {
  username: string;
  password: string;
  remember: boolean;
};
type RegisterType = {
  readonly userName: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
export const TOKEN = {
  primary: "#8B7355",
  primaryHover: "#6B5640",
  primaryLight: "#F0EAE0",
  text: "#3D3029",
  textMuted: "#9C8877",
  border: "#E5DDD4",
  inputBg: "#FAF8F5",
  error: "#D95C3A",
  font: "Vazirmatn, -apple-system, sans-serif",
};

export const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "10px 40px 10px 14px",
  borderRadius: "10px",
  fontSize: "14px",
  fontFamily: TOKEN.font,
  background: TOKEN.inputBg,
  border: `1.5px solid ${TOKEN.border}`,
  color: TOKEN.text,
  direction: "rtl",
  outline: "none",
};