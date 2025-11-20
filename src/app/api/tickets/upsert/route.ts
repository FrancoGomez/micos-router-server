import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.message_id_original) {
      return NextResponse.json(
        { error: "message_id_original is required" },
        { status: 400 }
      );
    }

    const ticket = await prisma.ticket.upsert({
      where: { message_id_original: body.message_id_original },
      update: body,
      create: body,
    });

    return NextResponse.json({ ok: true, ticket });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}