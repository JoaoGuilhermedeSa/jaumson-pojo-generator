import React, { useState } from "react";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";

const PojoGeneratorFrontend = () => {
  const [schemaInput, setSchemaInput] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setGeneratedCode("");

    try {
      const response = await fetch("http://localhost:8080/generate/java", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: schemaInput,
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const result = await response.text();
      setGeneratedCode(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">POJO Generator</h1>
      <Textarea
        rows={12}
        placeholder="Paste your JSON schema here..."
        value={schemaInput}
        onChange={(e) => setSchemaInput(e.target.value)}
      />
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate POJO"}
      </Button>
      {error && <div className="text-red-500">Error: {error}</div>}
      {generatedCode && (
        <pre className="bg-gray-900 text-white p-4 rounded overflow-auto">
          <code>{generatedCode}</code>
        </pre>
      )}
    </div>
  );
};

export default PojoGeneratorFrontend;