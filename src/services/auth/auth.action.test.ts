import { loginAction, Register } from "./auth.services";
import { signIn } from "next-auth/react";
import serverApiClient from "../interseptor/http.server";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("../interseptor/http.server", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

describe("auth.services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

describe("loginAction", () => {
  it("should return success when credentials are valid", async () => {
    (serverApiClient.post as jest.Mock).mockResolvedValue({
      data: {
        data: {
          id: 1,
          name: "Mohammad",
          accessToken: "token123",
          user: { role: "student" },
        },
      },
    });
    (signIn as jest.Mock).mockResolvedValue({ error: undefined });

    const result = await loginAction({
      identifier: "test@test.com",
      password: "123456",
    });

    expect(result).toEqual({ ok: true });
    expect(signIn).toHaveBeenCalledWith(
      "credentials",
      expect.objectContaining({
        redirect: false,
        user: expect.stringContaining('"accessToken":"token123"'),
      }),
    );
  });

  it("should fail when token is missing", async () => {
    (serverApiClient.post as jest.Mock).mockResolvedValue({
      data: { data: {} },
    });

    const result = await loginAction({
      identifier: "test@test.com",
      password: "123456",
    });

    expect(result).toEqual({
      ok: false,
      error: "توکن دریافت نشد",
    });
    expect(signIn).not.toHaveBeenCalled();
  });

  it("should fail when signIn returns an error", async () => {
    (serverApiClient.post as jest.Mock).mockResolvedValue({
      data: {
        data: {
          id: 1,
          name: "Mohammad",
          accessToken: "token123",
          user: { role: "student" },
        },
      },
    });
    (signIn as jest.Mock).mockResolvedValue({ error: "CredentialsSignin" });

    const result = await loginAction({
      identifier: "test@test.com",
      password: "123456",
    });

    expect(result).toEqual({
      ok: false,
      error: "ورود ناموفق بود",
    });
  });

  it("should throw when the request fails", async () => {
    (serverApiClient.post as jest.Mock).mockRejectedValue(
      new Error("Network Error"),
    );

    await expect(
      loginAction({ identifier: "test@test.com", password: "123456" }),
    ).rejects.toThrow("Network Error");

    expect(signIn).not.toHaveBeenCalled();
  });
});

  describe("Register", () => {
    it("should register user successfully", async () => {
      (serverApiClient.post as jest.Mock).mockResolvedValue({
        data: {
          data: {
            id: 1,
            name: "Mohammad",
            email: "test@test.com",
          },
        },
      });

      const result = await Register({
        userName: "09934520609",
        name: "mohammad",
        email: "arasteh@gmail.com",
        phone: "09934520609",
        password: "123456789",
        confirmPassword: "123456789",
      });

      expect(result).toEqual({
        id: 1,
        name: "Mohammad",
        email: "test@test.com",
      });

      expect(serverApiClient.post).toHaveBeenCalledWith("/auth/register", {
        userName: "09934520609",
        name: "mohammad",
        email: "arasteh@gmail.com",
        phone: "09934520609",
        password: "123456789",
      });
    });

    it("should throw a normalized error when register fails", async () => {
      (serverApiClient.post as jest.Mock).mockRejectedValue({
        isAxiosError: true,
        response: { data: { message: "ایمیل قبلاً ثبت شده" } },
      });

      await expect(
        Register({
          userName: "09934520609",
          name: "mohammad",
          email: "arasteh@gmail.com",
          phone: "09934520609",
          password: "123456789",
          confirmPassword: "123456789",
        }),
      ).rejects.toThrow("ایمیل قبلاً ثبت شده");
    });
  });
});