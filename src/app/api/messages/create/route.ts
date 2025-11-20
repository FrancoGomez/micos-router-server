import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.ticketId || !body.message_id) {
      return NextResponse.json(
        { error: "ticketId and message_id are required" },
        { status: 400 }
      );
    }

    const msg = await prisma.ticketMessage.create({
      data: body,
    });

    return NextResponse.json({ ok: true, msg });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}