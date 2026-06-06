import { cn } from "@/lib/utils"

interface ComparisonTableProps {
  headers: string[]
  rows: string[][]
  className?: string
}

export default function ComparisonTable({
  headers,
  rows,
  className,
}: ComparisonTableProps) {
  return (
    <div className={cn("overflow-x-auto my-8", className)}>
      <table className="w-full border-collapse glass rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-white/5 border-b border-white/10">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-6 py-4 text-left text-sm font-bold uppercase tracking-widest text-accent-light"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                "border-b border-white/5 last:border-0",
                i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
              )}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4 text-sm text-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
