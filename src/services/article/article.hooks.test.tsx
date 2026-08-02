import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useCategories, useArticlesByCategory } from "./article";
import apiClient from "../interseptor/http.client";

jest.mock("../interseptor/http.client", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useCategories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return categories", async () => {
    const mockCategories = [{ id: "1", title: "برنامه‌نویسی" }];
    (apiClient.get as jest.Mock).mockResolvedValue({
      data: { data: mockCategories },
    });

    const { result } = renderHook(() => useCategories(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockCategories);
    expect(apiClient.get).toHaveBeenCalledWith("/category");
  });
});

describe("useArticlesByCategory", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not fetch when categoryId is empty", () => {
    const { result } = renderHook(() => useArticlesByCategory(""), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe("idle");
    expect(apiClient.get).not.toHaveBeenCalled();
  });

  it("should fetch the first page with pageParam = 1", async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({
      data: { data: [{ id: "1" }] },
    });

    const { result } = renderHook(() => useArticlesByCategory("cat-1", 9), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiClient.get).toHaveBeenCalledWith("/article", {
      params: { category: "cat-1", page: 1, limit: 9 },
    });
  });

  it("should mark hasNextPage true when a full page is returned", async () => {
    const fullPage = Array.from({ length: 9 }, (_, i) => ({ id: `${i}` }));
    (apiClient.get as jest.Mock).mockResolvedValue({
      data: { data: fullPage },
    });

    const { result } = renderHook(() => useArticlesByCategory("cat-1", 9), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.hasNextPage).toBe(true);
  });

  it("should mark hasNextPage false when the last page is not full", async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({
      data: { data: [{ id: "1" }, { id: "2" }] },
    });

    const { result } = renderHook(() => useArticlesByCategory("cat-1", 9), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.hasNextPage).toBe(false);
  });
});