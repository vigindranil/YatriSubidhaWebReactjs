import { NextResponse } from "next/server"
import { bookings } from "../../data"

export async function POST(req: Request, context: any) {
  const params = await context.params
  const bn = params?.bookingNumber
  if (!bn) return new NextResponse("Missing booking number", { status: 400 })

  const payload = await req.json().catch(() => ({}))
  const operator = payload.operator ?? "unknown"
  const idx = bookings.findIndex((b) => b.booking_number === bn)
  if (idx === -1) return new NextResponse("Booking not found", { status: 404 })

  bookings[idx].status = "checked"
  bookings[idx].checked_by = operator
  bookings[idx].checked_at = new Date().toISOString()

  return NextResponse.json(bookings[idx])
}