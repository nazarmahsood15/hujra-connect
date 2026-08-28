import { NextRequest, NextResponse } from "next/server";
import { BOOKINGS, getBookings, WORKERS } from "@/lib/mock-data";
import type { Booking } from "@/types";

export async function GET() {
  const bookings = await getBookings();
  return NextResponse.json({ bookings });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const worker = WORKERS.find((w) => w.id === body.workerId);
    if (!worker) {
      return NextResponse.json({ error: "Worker not found" }, { status: 404 });
    }

    const newBooking: Booking = {
      id: `bk-${Date.now().toString().slice(-6)}`,
      workerId: worker.id,
      workerName: worker.name,
      workerCategory: worker.category,
      customerId: body.customerId || "u-cust1",
      customerName: body.customerName || "Customer",
      customerPhone: body.customerPhone || "0300-1234567",
      serviceTitle: body.serviceTitle || `${worker.category} Standard Service`,
      status: "in_progress",
      type: body.type || "scheduled",
      amount: Number(body.amount) || worker.hourlyRate * 3,
      city: body.city || worker.city,
      address: body.address || "Local Address",
      scheduledDate: body.scheduledDate || "Today",
      isDiaspora: Boolean(body.isDiaspora),
      diasporaSenderCountry: body.diasporaSenderCountry,
      notes: body.notes,
      createdAt: new Date().toISOString(),
      escrow: {
        amount: Number(body.amount) || worker.hourlyRate * 3,
        currency: body.isDiaspora ? "USD" : "PKR",
        status: "funds_held",
        paymentMethod: body.paymentMethod || "JazzCash",
        paymentRef: `ESC-${Date.now().toString().slice(-8)}`,
        heldAt: new Date().toISOString(),
      },
    };

    BOOKINGS.unshift(newBooking);
    return NextResponse.json({ booking: newBooking, message: "Booking created and escrow funds held" }, { status: 201 });
  } catch (error) {
    console.error("Booking post error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
