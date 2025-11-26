import { NextResponse } from "next/server"
import { bookings } from "../data"

export async function GET(_req: Request, context: any) {
  const params = await context.params
  const bn = params?.bookingNumber
  if (!bn) return new NextResponse("Missing booking number", { status: 400 })

  const found = bookings.find((b) => b.booking_number === bn)
  if (!found) return new NextResponse("Booking not found", { status: 404 })
  return NextResponse.json(found)
}