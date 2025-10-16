export function Inventory() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
        <p className="mt-2 text-gray-600">
          View and manage your inventory of hobby items.
        </p>
      </div>

      {/* Inventory List */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory</h2>
        <div className="text-gray-500 text-center py-8">
          <p>No inventory items found</p>
          <p className="text-sm mt-1">
            Start by adding some items to your inventory
          </p>
        </div>
      </div>
    </div>
  );
}
