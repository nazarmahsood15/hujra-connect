import { NextRequest, NextResponse } from "next/server";
import { BOOKINGS, getBookingById } from "@/lib/mock-data";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = await getBookingById(id);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }
  return NextResponse.json({ booking });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = BOOKINGS.find((b) => b.id === id);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const body = await req.json();
  if (body.status) {
    booking.status = body.status;
  }
  if (body.releaseEscrow && booking.escrow) {
    booking.escrow.status = "released";
    booking.escrow.releasedAt = new Date().toISOString();
    booking.status = "completed";
  }
  if (body.workProof) {
    booking.workProof = {
      beforePhotos: body.workProof.beforePhotos || [],
      afterPhotos: body.workProof.afterPhotos || [],
      completionNotes: body.workProof.completionNotes || "",
      gpsCheckInTime: body.workProof.gpsCheckInTime || "GPS verified on site",
      submittedAt: new Date().toISOString(),
    };
    booking.status = "work_submitted";
  }

  return NextResponse.json({ booking, message: "Booking updated" });
}
