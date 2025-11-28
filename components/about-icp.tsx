"use client"
import { Building2, Globe, Zap } from "lucide-react"

export function AboutICP() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-slate-100 border border-slate-300 rounded-full mb-6">
            <p className="text-slate-700 text-sm font-medium">Land Ports Authority of India</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">
            Integrated Check Posts (ICPs) & Yatri Subidha
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Modernizing border crossing infrastructure for seamless international travel
          </p>
        </div>

        {/* Context Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Border Context */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">India's Land Borders</h3>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed">
              India shares over 15,000 kilometers of international land border with seven countries: Afghanistan,
              Bangladesh, Bhutan, China, Myanmar, Nepal, and Pakistan. These borders have multiple designated entry and
              exit points for cross-border movement of persons, goods, and vehicles.
            </p>
          </div>

          {/* Challenge Context */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Building2 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Infrastructure Challenges</h3>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed">
              For many years, inadequate infrastructure at designated border checkpoints hindered regional trade and
              passenger movement. Support facilities like warehouses, parking lots, banks, and hotels were either
              inadequate or absent, with no single agency coordinating various government authorities.
            </p>
          </div>
        </div>

        {/* ICP Solution */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 rounded-2xl p-12 border border-emerald-200 mb-12">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-emerald-600 p-3 rounded-lg mt-1">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">The ICP Solution (2003)</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                The Committee of Secretaries recommended establishing Integrated Check Posts (ICPs) to address these
                challenges. ICPs house all regulatory agencies in a single sanitized complex with state-of-the-art
                infrastructure including warehouses, examination sheds, parking bays, and weighbridges. This centralized
                approach enables coordinated functioning of various government authorities and service providers for
                efficient cross-border movement of passengers and goods.
              </p>
            </div>
          </div>
        </div>

        {/* ICP Benefits */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
            <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7 text-emerald-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Centralized Complex</h4>
            <p className="text-slate-600">All regulatory agencies and support facilities in one location</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
            <div className="bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-7 h-7 text-teal-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Coordinated Services</h4>
            <p className="text-slate-600">Single agency coordination for efficient operations</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-7 h-7 text-blue-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Modern Facilities</h4>
            <p className="text-slate-600">State-of-the-art infrastructure for seamless travel</p>
          </div>
        </div>

        {/* YYatri Subidha Connection */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Yatri Subidha at ICP Petrapole</h3>
          <p className="text-lg text-emerald-50 max-w-3xl mx-auto leading-relaxed">
            Yatri Subidha is the digital queuing system deployed at ICP Petrapole (West Bengal) to implement the ICP
            vision. It leverages modern technology to streamline the border crossing process, reduce congestion, and
            provide passengers with a predictable, efficient travel experience while supporting the Land Ports
            Authority's mission to facilitate seamless cross-border movement.
          </p>
        </div>
      </div>
    </section>
  )
}
