import apiClient from "../interseptor/http.client";
import serverApiClient from "../interseptor/http.server";
import {
  getAllArticles,
  getLatestArticles,
  getArticleById,
  createArticleApi,
  updateArticleApi,
  removeArticle,
  getArticlesByCategory,
} from "./article";

jest.mock("../interseptor/http.client", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("../interseptor/http.server", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

const mockArticle = {
  id: "1",
  title: "تست",
  content: "محتوا",
  cover: "cover.jpg",
  slug: "test",
  author_id: "10",
  status: "published" as const,
  created_at: "2026-01-01",
  updated_at: "2026-01-01",
};

describe("article.services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllArticles (server)", () => {
    it("should fetch articles without status filter", async () => {
      (serverApiClient.get as jest.Mock).mockResolvedValue({
        data: { data: [mockArticle] },
      });

      const result = await getAllArticles();

      expect(result).toEqual([mockArticle]);
      expect(serverApiClient.get).toHaveBeenCalledWith("/article", {
        params: { status: undefined },
      });
    });

    it("should pass status filter when provided", async () => {
      (serverApiClient.get as jest.Mock).mockResolvedValue({
        data: { data: [mockArticle] },
      });

      await getAllArticles("draft");

      expect(serverApiClient.get).toHaveBeenCalledWith("/article", {
        params: { status: "draft" },
      });
    });
  });

  describe("getLatestArticles", () => {
    it("should use default limit of 8", async () => {
      (serverApiClient.get as jest.Mock).mockResolvedValue({
        data: { data: [mockArticle] },
      });

      await getLatestArticles();

      expect(serverApiClient.get).toHaveBeenCalledWith("/article/latest", {
        params: { limit: 8 },
      });
    });

    it("should respect a custom limit", async () => {
      (serverApiClient.get as jest.Mock).mockResolvedValue({
        data: { data: [] },
      });

      await getLatestArticles(3);

      expect(serverApiClient.get).toHaveBeenCalledWith("/article/latest", {
        params: { limit: 3 },
      });
    });
  });

  describe("getArticleById (client)", () => {
    it("should fetch a single article by id", async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: { data: mockArticle },
      });

      const result = await getArticleById("1");

      expect(result).toEqual(mockArticle);
      expect(apiClient.get).toHaveBeenCalledWith("/article/1");
    });

    it("should throw when the request fails", async () => {
      (apiClient.get as jest.Mock).mockRejectedValue(new Error("Not found"));

      await expect(getArticleById("999")).rejects.toThrow("Not found");
    });
  });

  describe("createArticleApi", () => {
    it("should post FormData with multipart header", async () => {
      (apiClient.post as jest.Mock).mockResolvedValue({
        data: { data: mockArticle },
      });

      const formData = new FormData();
      formData.append("title", "تست");

      const result = await createArticleApi(formData);

      expect(result).toEqual(mockArticle);
      expect(apiClient.post).toHaveBeenCalledWith("/article", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    });
  });

  describe("updateArticleApi", () => {
    it("should put FormData to the correct id", async () => {
      (apiClient.put as jest.Mock).mockResolvedValue({
        data: { data: mockArticle },
      });

      const formData = new FormData();
      const result = await updateArticleApi({ id: "1", data: formData });

      expect(result).toEqual(mockArticle);
      expect(apiClient.put).toHaveBeenCalledWith("/article/1", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    });
  });

  describe("removeArticle", () => {
    it("should call delete with the correct id", async () => {
      (apiClient.delete as jest.Mock).mockResolvedValue({});

      await removeArticle("1");

      expect(apiClient.delete).toHaveBeenCalledWith("/article/1");
    });
  });

  describe("getArticlesByCategory", () => {
    it("should pass category, page, and limit as params", async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: { data: [mockArticle] },
      });

      const result = await getArticlesByCategory("cat-1", 2, 9);

      expect(result).toEqual([mockArticle]);
      expect(apiClient.get).toHaveBeenCalledWith("/article", {
        params: { category: "cat-1", page: 2, limit: 9 },
      });
    });
  });
});