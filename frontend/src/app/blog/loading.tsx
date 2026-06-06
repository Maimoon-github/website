import Container from "@/components/layout/Container";

export default function Loading() {
  return (
    <Container className="pt-32 pb-24">
      <div className="flex flex-col gap-12 animate-pulse">
        <div className="space-y-4">
          <div className="h-4 w-32 bg-white/5 rounded-full" />
          <div className="h-16 w-2/3 bg-white/5 rounded-2xl" />
        </div>
        
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white/5 rounded-3xl" />
          ))}
        </div>
      </div>
    </Container>
  );
}
