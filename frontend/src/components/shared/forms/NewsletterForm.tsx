"use client"

export default function NewsletterForm() {
  return (
    <form className="flex" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Agent Email"
        className="bg-white/5 border border-white/10 rounded-l-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-purple w-full"
      />
      <button className="bg-accent-purple text-white px-4 py-3 rounded-r-xl font-bold text-sm hover:bg-accent-purple/90 transition-colors">
        Link
      </button>
    </form>
  )
}
