"use client"
import { useEffect, useRef } from "react"

interface AdvancedCaptchaProps {
  captchaCode: string
  onRefresh: () => void
}

export function AdvancedCaptcha({ captchaCode, onRefresh }: AdvancedCaptchaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = 300
    const height = 80

    // Clear canvas with random gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, "#f0f9ff")
    gradient.addColorStop(1, "#f0fdf4")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Add noise lines
    for (let i = 0; i < 8; i++) {
      ctx.strokeStyle = `rgba(100, 150, 200, ${Math.random() * 0.3})`
      ctx.beginPath()
      ctx.moveTo(Math.random() * width, Math.random() * height)
      ctx.lineTo(Math.random() * width, Math.random() * height)
      ctx.stroke()
    }

    // Add random circles/dots
    for (let i = 0; i < 15; i++) {
      ctx.fillStyle = `rgba(100, 150, 200, ${Math.random() * 0.4})`
      ctx.beginPath()
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2 + 1, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw text with distortion
    ctx.font = "bold 48px Arial"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#064e3b"

    const letters = captchaCode.split("")
    const letterWidth = width / (letters.length + 1)

    letters.forEach((letter, index) => {
      ctx.save()

      // Calculate position
      const x = letterWidth * (index + 1)
      const y = height / 2

      // Apply transformations
      ctx.translate(x, y)
      ctx.rotate((Math.random() - 0.5) * 0.4) // Random rotation
      ctx.scale(1 + (Math.random() - 0.5) * 0.3, 1 + (Math.random() - 0.5) * 0.3) // Random scale

      // Add shadow effect
      ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
      ctx.shadowBlur = 3
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2

      // Draw letter
      ctx.fillText(letter, 0, 0)

      ctx.restore()
    })

    // Add additional security grid
    ctx.strokeStyle = "rgba(100, 150, 200, 0.15)"
    ctx.lineWidth = 1
    for (let i = 0; i < width; i += 30) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
  }, [captchaCode])

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-2">CAPTCHA Verification</label>
          <canvas
            ref={canvasRef}
            width={300}
            height={80}
            className="w-full border-2 border-slate-300 rounded bg-white select-none cursor-not-allowed"
            style={{ userSelect: "none", WebkitUserSelect: "none" } as any}
          />
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="mt-8 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition"
          title="Refresh CAPTCHA"
        >
          ↻
        </button>
      </div>
      <p className="text-xs text-slate-500 text-center">
        CAPTCHA is distorted for security. Enter exactly as shown above.
      </p>
    </div>
  )
}
