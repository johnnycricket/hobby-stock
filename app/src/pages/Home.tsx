import { gql, useQuery } from "@apollo/client";

const GET_HELLO = gql`
  query GetHello {
    hello
  }
`;

export function Home() {
  const { data, loading, error } = useQuery(GET_HELLO);

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome to Hobby Stock
        </h1>

        <div className="space-y-4">
          <p className="text-lg text-gray-600">
            Your personal inventory management system for hobby items.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Backend Status</h2>
            {loading && (
              <p className="text-gray-500">Connecting to backend...</p>
            )}
            {error && (
              <p className="text-red-600">
                Backend connection failed: {error.message}
              </p>
            )}
            {data && (
              <p className="text-green-600">
                ✅ Backend connected: {data.hello}
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <a href="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </a>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
