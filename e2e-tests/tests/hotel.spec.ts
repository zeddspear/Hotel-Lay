import { test, expect } from "@playwright/test";
import path from "path";
const BASE_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("test@gmail.com");
  await page.locator("[name=password]").fill("test123");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("User Signed In")).toBeVisible();
});

test.skip("should allow user to add hotel", async ({ page }) => {
  await page.goto(`${BASE_URL}add-hotel`);

  await expect(page.getByRole("heading", { name: "Add Hotel" })).toBeVisible();

  await page.locator("[name=name]").fill("Test");
  await page.locator("[name=city]").fill("Test City");
  await page.locator("[name=country]").fill("Test Country");
  await page
    .locator("[name=description]")
    .fill("This is Description for test hotel");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption("[name=starRating]", "4");
  await page.getByText("Budget").click();
  await page.getByText("Free WiFi").click();
  await page.getByText("Spa").click();
  await page.locator("[name=adultCount]").fill("3");
  await page.locator("[name=childCount]").fill("2");

  await page.setInputFiles('input[type="file"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Hotel Submitted")).toBeVisible();
});

test.skip("Should not allow user to add hotel if user have a hotel with same name already", async ({
  page,
}) => {
  await page.goto(`${BASE_URL}add-hotel`);

  await expect(page.getByRole("heading", { name: "Add Hotel" })).toBeVisible();

  await page.locator("[name=name]").fill("Test");
  await page.locator("[name=city]").fill("Test City");
  await page.locator("[name=country]").fill("Test Country");
  await page
    .locator("[name=description]")
    .fill("This is Description for test hotel");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption("[name=starRating]", "4");
  await page.getByText("Budget").click();
  await page.getByText("Free WiFi").click();
  await page.getByText("Spa").click();
  await page.locator("[name=adultCount]").fill("3");
  await page.locator("[name=childCount]").fill("2");

  await page.setInputFiles('input[type="file"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("This user already have a hotel  with this name")
  ).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${BASE_URL}my-hotels`);

  await expect(
    page.getByRole("heading", { name: "Avari Hotel" })
  ).toBeVisible();
  await expect(
    page.getByText("Situated on the beautiful tree lined Mall Boulevard,")
  ).toBeVisible();
  await expect(page.getByText("Lahore, Pakistan")).toBeVisible();
  await expect(page.getByText("Luxury").nth(1)).toBeVisible();
  await expect(page.getByText("2 adults, 1 children")).toBeVisible();
  await expect(page.getByText("Rs.15000 per night")).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).all
  ).toBeTruthy();
});
