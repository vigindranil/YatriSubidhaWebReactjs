"use client"
import { Navigation } from "@/components/navigation"
import type React from "react"

import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <>
      <Navigation onLoginClick={() => setShowLogin(true)} />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're here to help. Get in touch with our support team for any queries or assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Email */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-semibold text-slate-900">Email</h3>
                </div>
                <p className="text-slate-600 text-sm">support@yatrisubidha.gov.in</p>
                <p className="text-slate-500 text-xs mt-1">Response within 24 hours</p>
              </div>

              {/* Phone */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-semibold text-slate-900">Phone</h3>
                </div>
                <p className="text-slate-600 text-sm font-medium">+91 (0) XXX-XXXX-XXXX</p>
                <p className="text-slate-500 text-xs mt-1">Mon-Fri, 9 AM - 6 PM IST</p>
              </div>

              {/* WhatsApp */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-semibold text-slate-900">WhatsApp</h3>
                </div>
                <p className="text-slate-600 text-sm font-medium">+91 XXXX-XXXX-XXXX</p>
                <p className="text-slate-500 text-xs mt-1">Quick responses available</p>
              </div>

              {/* Address */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-semibold text-slate-900">Address</h3>
                </div>
                <p className="text-slate-600 text-sm">
                  ICP Petrapole
                  <br />
                  West Bengal, India
                </p>
              </div>

              {/* Working Hours */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-semibold text-slate-900">Working Hours</h3>
                </div>
                <p className="text-slate-600 text-sm">
                  <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                  <br />
                  <strong>Saturday:</strong> 10:00 AM - 4:00 PM
                  <br />
                  <strong>Sunday:</strong> Closed
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="+91 XXXX-XXXX-XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Issue</option>
                    <option value="technical">Technical Support</option>
                    <option value="pass">Digital Pass Help</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white w-full flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "What are your response times?",
                  a: "Email responses within 24 hours, phone support during working hours, WhatsApp for urgent queries.",
                },
                {
                  q: "Do you have a physical office?",
                  a: "Our main office is at ICP Petrapole. You can also reach us through our online support channels.",
                },
                {
                  q: "Can I visit the office?",
                  a: "Yes, you can visit during working hours. Please call ahead for scheduled appointments.",
                },
                {
                  q: "Do you provide on-site support?",
                  a: "Yes, we have support staff available at the terminal for real-time assistance.",
                },
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-1">{faq.q}</h3>
                  <p className="text-slate-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}
