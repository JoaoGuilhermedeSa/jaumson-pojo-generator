import React, { useState } from "react";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";

const PojoGeneratorFrontend = () => {
  const [schemaInput, setSchemaInput] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generateConstructors, setGenerateConstructors] = useState(true);
  const [generateGettersAndSetters, setGenerateGettersAndSetters] = useState(true);
  const [className, setClassName] = useState("MyClass");
  const [packageName, setPackageName] = useState("com.example");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setGeneratedCode("");


    try {
      const url = new URL("http://localhost:8080/api/java");
      url.searchParams.append("generateConstructors", generateConstructors.toString());
      url.searchParams.append("generateGettersAndSetters", generateGettersAndSetters.toString())
      url.searchParams.append("className", className);
      url.searchParams.append("packageName", packageName);
      const response = await fetch(url.toString(), {
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <label>
              Class Name:
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="border rounded p-2 ml-2"
              />
            </label>

            <label>
              Package Name:
              <input
                type="text"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="border rounded p-2 ml-2"
              />
            </label>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={generateConstructors}
                onChange={(e) => setGenerateConstructors(e.target.checked)}
                className="mr-2"
              />
              Generate Constructors
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={generateGettersAndSetters}
                onChange={(e) => setGenerateGettersAndSetters(e.target.checked)}
                className="mr-2"
              />
              Generate Getters/Setters
            </label>
          </div>
        </div>

      </div>

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
        <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "#111", color: "white", padding: "1rem", borderRadius: "0.5rem" }}>
          <code>{generatedCode}</code>
        </pre>
      )}
    </div>
  );
};

export default PojoGeneratorFrontend;
