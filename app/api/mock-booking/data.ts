// ...existing code...
export type Booking = {
  booking_number: string
  customer_name: string
  mobile_number?: string
  passport_number?: string
  trip: string
  slot_date_time?: string
  status: string
  payment?: {
    method: string
    amount: number
    paid_at?: string
    transaction_number?: string
    payment_date?: string
  }
  checked_by?: string
  checked_at?: string
}

export const bookings: Booking[] = [
  {
    booking_number: "BKG1001",
    customer_name: "Rahul Sen",
    mobile_number: "+91-9876543210",
    passport_number: "E1234567",
    trip: "CityA → CityB",
    slot_date_time: "2025-12-01T09:00:00Z",
    status: "booked",
    payment: {
      method: "UPI",
      amount: 450.0,
      paid_at: "2025-11-20T10:00:00Z",
      transaction_number: "TXN-UTR-1001",
      payment_date: "2025-11-20",
    },
  },
  {
    booking_number: "BKG1002",
    customer_name: "Anita Roy",
    mobile_number: "+91-9123456780",
    passport_number: "P7654321",
    trip: "CityA → CityC",
    slot_date_time: "2025-12-02T14:30:00Z",
    status: "booked",
    payment: {
      method: "Card",
      amount: 600.0,
      paid_at: "2025-11-21T11:30:00Z",
      transaction_number: "TXN-CC-2002",
      payment_date: "2025-11-21",
    },
    checked_by: "operator-ui",
    checked_at: "2025-11-22T09:15:00Z",
  },
]
// ...existing code...