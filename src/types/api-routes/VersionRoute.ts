import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1"; // مقدار پیش‌فرض صفحه ۱

  try {
    const response = await fetch(
      `https://api.rgb.irpsc.com/api/calendar?type=version&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`خطا در دریافت اطلاعات: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data.data); // ارسال فقط آرایه نسخه‌ها
  } catch (error) {
    console.error("خطا در دریافت داده از API:", error);
    return NextResponse.json([], { status: 500 }); // در صورت خطا، یک آرایه خالی برمی‌گردانیم
  }
}
