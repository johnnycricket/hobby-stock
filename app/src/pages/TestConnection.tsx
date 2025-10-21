import { useState } from "react";

export function TestConnection() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testGraphQL = async () => {
    setLoading(true);
    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: "{ hello }",
        }),
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">GraphQL Connection Test</h2>
      <button
        onClick={testGraphQL}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Testing..." : "Test GraphQL Connection"}
      </button>

      {result && (
        <div className="mt-4">
          <h3 className="font-semibold">Result:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
