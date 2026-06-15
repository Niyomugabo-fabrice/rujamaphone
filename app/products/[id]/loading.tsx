export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 h-12 w-44 rounded-lg bg-gray-200 animate-pulse" />
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
            <div className="aspect-square rounded-xl bg-gray-200 animate-pulse" />
            <div className="space-y-6">
              <div className="flex gap-2">
                <div className="h-7 w-20 rounded bg-gray-200 animate-pulse" />
                <div className="h-7 w-24 rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="h-10 w-4/5 rounded bg-gray-200 animate-pulse" />
              <div className="h-8 w-44 rounded bg-gray-200 animate-pulse" />
              <div className="space-y-3 border-y border-gray-200 py-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-5 rounded bg-gray-200 animate-pulse" />
                ))}
              </div>
              <div className="h-14 rounded-xl bg-gray-200 animate-pulse" />
              <div className="h-14 rounded-xl bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
