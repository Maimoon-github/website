export default function Loading() {
  return (
    <div className="flex flex-col lg:flex-row animate-pulse">
      <div className="hidden lg:block w-80 h-screen sticky top-0 border-r border-white/5 pt-32 px-6">
        <div className="h-4 w-24 bg-white/5 rounded-full mb-8" />
        <div className="space-y-4">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="h-10 w-full bg-white/5 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="flex-1 p-12 lg:p-24 space-y-12">
        <div className="h-20 w-1/2 bg-white/5 rounded-2xl" />
        <div className="h-4 w-3/4 bg-white/5 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-48 bg-white/5 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
