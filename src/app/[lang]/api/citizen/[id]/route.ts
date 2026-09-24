import { NextResponse } from "next/server";
import { getUserData } from "@/components/utils/actions";

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

    const result = await getUserData(id);

    if (!result?.data) {
      return NextResponse.json(
        {
          error: "Citizen not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[API /citizen/[id]]", error);

    return NextResponse.json(
      {
        error: "خطا در دریافت داده‌ها",
      },
      { status: 500 }
    );
  }
}