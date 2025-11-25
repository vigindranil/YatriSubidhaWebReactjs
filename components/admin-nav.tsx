import { Button } from "@/components/ui/button"
import { Settings, Users, Bell, LogOut } from "lucide-react"

export function AdminNav() {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AS</span>
          </div>
          <span className="font-bold text-xl text-white">Atri Admin</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300">
            <Users className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300">
            <Settings className="w-5 h-5" />
          </button>
          <Button variant="ghost" className="text-red-400 hover:bg-red-900/20 gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
