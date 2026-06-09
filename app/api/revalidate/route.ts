import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { secret, slug } = body;

    // 1. Validar el secret
    if (secret !== process.env.WP_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Validar que venga el slug
    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 },
      );
    }

    // 3. Revalidar el tag (bajo demanda)
    revalidateTag(slug, "max");

    // 4. Responder
    return NextResponse.json({
      revalidated: true,
      slug,
      message: `Tag '${slug}' revalidado correctamente`,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 },
    );
  }
}
