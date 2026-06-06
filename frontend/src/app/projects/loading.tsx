import Container from "@/components/layout/Container";

export default function Loading() {
  return (
    <Container className="pt-32 pb-24">
      <div className="flex flex-col gap-12 animate-pulse">
        <div className="space-y-4">
          <div className="h-4 w-32 bg-white/5 rounded-full" />
          <div className="h-16 w-1/2 bg-white/5 rounded-2xl" />
          <div className="h-6 w-3/4 bg-white/5 rounded-xl" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 bg-white/5 rounded-3xl" />
          ))}
        </div>
      </div>
    </Container>
  );
}
