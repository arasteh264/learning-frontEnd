export type LayoutProp = {
  children: React.ReactNode;
};
export type ApiResponse<T> = {
  data: T;
  message?: string;
  status: number;
};
export interface ApiError {
  message: string;
  status?: number;
  response?: {
    data?: {
      message?: string;
    };
  };
}
