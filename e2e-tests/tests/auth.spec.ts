import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173/";

test("should allow the user to sign in and sign out", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("test@gmail.com");
  await page.locator("[name=password]").fill("test123");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("User Signed In")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign Out" })).toBeVisible();

  await page.getByRole("link", { name: "Sign Out" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(BASE_URL);

  await page.getByRole("link", { name: "Register" }).click();

  await expect(
    page.getByRole("heading", { name: "Create An Account" })
  ).toBeVisible();

  await page.locator("[name=firstname]").fill("test");
  await page.locator("[name=lastname]").fill("test");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("test123");
  await page.locator("[name=confirmPassword]").fill("test123");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("User Registered")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign Out" })).toBeVisible();
});

test("should not allow user to register if it already exists", async ({
  page,
}) => {
  await page.goto(BASE_URL);

  await page.getByRole("link", { name: "Register" }).click();

  await expect(
    page.getByRole("heading", { name: "Create An Account" })
  ).toBeVisible();

  await page.locator("[name=firstname]").fill("test2");
  await page.locator("[name=lastname]").fill("test2");
  await page.locator("[name=email]").fill("test2@gmail.com");
  await page.locator("[name=password]").fill("test123");
  await page.locator("[name=confirmPassword]").fill("test123");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("User already exists with this email").nth(1)
  ).toBeVisible();
});
