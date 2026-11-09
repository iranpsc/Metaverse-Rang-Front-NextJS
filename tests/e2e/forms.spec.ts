import { expect, test } from "@playwright/test";

test.describe("contact form UI and input validation @ui", () => {
  test("validates required fields and rejects malformed email and phone values", async ({ page }) => {
    await page.goto("/fa/contact", { waitUntil: "domcontentloaded" });

    const form = page.locator("form").filter({
      has: page.locator('input[name="name"]'),
    }).first();

    await expect(form).toBeVisible();

    // Empty submission must show validation messages without making a request.
    await form.locator('button[type="submit"]').click();

    for (const message of [
      "نام الزامی است",
      "ایمیل الزامی است",
      "شماره تماس الزامی است",
      "عنوان پیام الزامی است",
      "متن پیام الزامی است",
    ]) {
      await expect(form.getByText(message)).toBeVisible();
    }

    await form.locator('input[name="name"]').fill("کاربر آزمایشی");
    await form.locator('input[name="email"]').fill("not-an-email");
    await form.locator('input[name="phoneNo"]').fill("12abc");
    await form.locator('input[name="title"]').fill("تست فرم");
    await form.locator('textarea[name="message"]').fill("پیام آزمایشی");

    await form.locator('button[type="submit"]').click();

    await expect(form.getByText("فرمت ایمیل نادرست است")).toBeVisible();
    await expect(form.getByText("شماره تماس فقط باید عدد باشد")).toBeVisible();

    // Correcting the values clears their field-level validation errors.
    await form.locator('input[name="email"]').fill("qa@example.test");
    await form.locator('input[name="phoneNo"]').fill("09120000000");

    await expect(form.getByText("فرمت ایمیل نادرست است")).toHaveCount(0);
    await expect(form.getByText("شماره تماس فقط باید عدد باشد")).toHaveCount(0);

    // The honeypot remains hidden from normal users.
    await expect(form.locator('input[name="website"]')).toBeHidden();
  });
});
