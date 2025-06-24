export default function TestPage() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Tailwind CSS Test
        </h1>
        <p className="text-gray-600">
          If you can see this styled properly, Tailwind is working!
        </p>
        <div className="mt-4 space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Blue Button
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Red Button
          </button>
        </div>
      </div>
    </div>
  );
} 