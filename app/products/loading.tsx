export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-10 w-52 rounded-lg bg-gray-200 animate-pulse" />
        <div className="mt-8 grid lg:grid-cols-4 gap-6">
          <div className="hidden lg:block h-[520px] rounded-xl bg-gray-200 animate-pulse" />
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-xl bg-white border border-gray-200">
                <div className="aspect-square bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 rounded bg-gray-200 animate-pulse" />
                  <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse" />
                  <div className="h-6 w-1/2 rounded bg-gray-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
