"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactService } from "@/services/contact.service"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    const result = await ContactService.submitMessage(formData)

    if (result.success) {
      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } else {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="py-20 text-center animate-in zoom-in duration-500 glass p-8 md:p-12 rounded-3xl border-white/10">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white">Transmission Received</h2>
        <p className="text-gray-400 mb-8 max-w-xs mx-auto">Your link request has been successfully indexed. Expect a response shortly.</p>
        <Button variant="glass" onClick={() => setStatus("idle")}>New Transmission</Button>
      </div>
    )
  }

  return (
    <div className="glass p-8 md:p-12 rounded-3xl border-white/10 relative overflow-hidden animate-in fade-in slide-in-from-right duration-1000">
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-500 ml-1">Agent Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-accent-purple transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-500 ml-1">Email Protocol</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-accent-purple transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-gray-500 ml-1">Link Subject</label>
          <input
            required
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-accent-purple transition-colors"
            placeholder="Project Inquiry"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-gray-500 ml-1">Payload Content</label>
          <textarea
            required
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-accent-purple transition-colors resize-none"
            placeholder="Describe your vision..."
          />
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 text-red-500 text-sm animate-in fade-in">
            <AlertCircle className="w-4 h-4" /> Link failed. Node offline or validation error.
          </div>
        )}

        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-5 text-lg flex items-center justify-center gap-3"
        >
          {status === "loading" ? "Encrypting..." : <>Initialize Link <Send className="w-5 h-5" /></>}
        </Button>
      </form>
    </div>
  )
}
