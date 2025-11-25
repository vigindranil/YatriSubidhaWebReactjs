import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Dessert as Passport } from "lucide-react"

interface ScannedPassInfoProps {
  data: {
    reference: string
    passenger: string
    passport: string
    date: string
    time: string
    type: string
  }
}

export function ScannedPassInfo({ data }: ScannedPassInfoProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-slate-500" />
            <p className="text-xs font-semibold text-slate-600">PASSENGER</p>
          </div>
          <p className="font-bold text-slate-900">{data.passenger}</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Passport className="w-4 h-4 text-slate-500" />
            <p className="text-xs font-semibold text-slate-600">PASSPORT</p>
          </div>
          <p className="font-mono font-bold text-slate-900">{data.passport}</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <p className="text-xs font-semibold text-slate-600">DATE</p>
          </div>
          <p className="font-bold text-slate-900">{data.date}</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <p className="text-xs font-semibold text-slate-600">TIME</p>
          </div>
          <p className="font-bold text-slate-900">{data.time}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <p className="text-xs font-semibold text-slate-600 mb-2">REFERENCE</p>
        <p className="font-mono font-bold text-lg text-slate-900">{data.reference}</p>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <Badge className="bg-emerald-600 text-white capitalize mb-2">{data.type}</Badge>
        <p className="text-xs text-slate-600">
          Travel Type: <span className="font-semibold text-slate-900 capitalize">{data.type}</span>
        </p>
      </div>
    </div>
  )
}
