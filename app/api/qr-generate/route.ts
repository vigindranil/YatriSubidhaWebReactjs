import QRCode from "qrcode"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json()

    const qrCode = await QRCode.toDataURL(JSON.stringify(data), {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    })

    return NextResponse.json({ qrCode })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}
