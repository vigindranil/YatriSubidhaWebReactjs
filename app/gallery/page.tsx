"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { useState } from "react"
import { ImageIcon, MapPin, Users } from "lucide-react"

export default function GalleryPage() {
  const [showLogin, setShowLogin] = useState(false)

  const galleryImages = [
    {
      title: "ICP Petrapole Terminal",
      description: "Modern passenger terminal at ICP Petrapole, West Bengal",
      category: "Infrastructure",
    },
    {
      title: "QR Scanning Counter",
      description: "Efficient QR code scanning system for rapid processing",
      category: "Technology",
    },
    {
      title: "Passenger Queue Management",
      description: "Organized and streamlined passenger queuing system",
      category: "Operations",
    },
    {
      title: "Digital Pass Sample",
      description: "Color-coded digital pass with QR code",
      category: "Services",
    },
    {
      title: "Border Crossing Portal",
      description: "Main gateway at ICP Petrapole",
      category: "Infrastructure",
    },
    {
      title: "Customs Counter",
      description: "Modern customs clearance counter",
      category: "Operations",
    },
  ]

  return (
    <>
      <Navigation onLoginClick={() => setShowLogin(true)} />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Photo Gallery</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Visual insights into YYatri Subidha portal infrastructure and operations at ICP Petrapole
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                className="group overflow-hidden rounded-lg border border-slate-200 hover:shadow-lg transition"
              >
                {/* Placeholder Image */}
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 h-56 flex items-center justify-center relative">
                  <ImageIcon className="w-12 h-12 text-emerald-400" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
                </div>
                {/* Image Info */}
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">{image.title}</h3>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">{image.category}</span>
                  </div>
                  <p className="text-sm text-slate-600">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
              <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Location</h3>
              <p className="text-sm text-slate-600">
                ICP Petrapole, West Bengal - India's largest integrated check post
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
              <Users className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Annual Traffic</h3>
              <p className="text-sm text-slate-600">Processes over 5 lakh international passengers annually</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
              <ImageIcon className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Technology</h3>
              <p className="text-sm text-slate-600">State-of-the-art QR scanning and digital pass system</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}
