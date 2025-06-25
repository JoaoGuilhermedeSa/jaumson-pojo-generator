import React, { useState } from "react";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";

const PojoGeneratorFrontend = () => {
  const [schemaInput, setSchemaInput] = useState("");
  const [generatedClasses, setGeneratedClasses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generateConstructors, setGenerateConstructors] = useState(true);
  const [generateGettersAndSetters, setGenerateGettersAndSetters] = useState(true);
  const [className, setClassName] = useState("MyClass");
  const [packageName, setPackageName] = useState("com.example");
  const [format, setFormat] = useState<"json" | "yaml">("json"); 

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setGeneratedClasses([]);

    try {
      const url = new URL(`http://localhost:8080/api/java/${format}`);
      url.searchParams.append("generateConstructors", generateConstructors.toString());
      url.searchParams.append("generateGettersAndSetters", generateGettersAndSetters.toString());
      url.searchParams.append("className", className);
      url.searchParams.append("packageName", packageName);

      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": getFormat(),
        },
        body: schemaInput,
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const result = await response.json();
      if (!result.classes || !Array.isArray(result.classes)) {
        throw new Error("Invalid response format: expected { classes: string[] }");
      }

      setGeneratedClasses(result.classes);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const getFormat = () => {
    if (format == "yaml") {
      return "application/yaml"
    }
    return "application/json"
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">POJO Generator</h1>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap">
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

          <label>
            Format:
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as "json" | "yaml")}
              className="border rounded p-2 ml-2"
            >
              <option value="json">JSON</option>
              <option value="yaml">YAML</option>
            </select>
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

      <Textarea
        rows={12}
        placeholder={`Paste your ${format.toUpperCase()} schema here...`}
        value={schemaInput}
        onChange={(e) => setSchemaInput(e.target.value)}
      />

      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate POJO"}
      </Button>

      {error && <div className="text-red-500">Error: {error}</div>}

      {generatedClasses.length > 0 && (
        <div className="space-y-6">
          {generatedClasses.map((clazz, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-white bg-gray-800 px-4 py-2 rounded-t">
                Class {index + 1}
              </h2>
              <pre className="bg-black text-green-300 p-4 rounded-b overflow-x-auto whitespace-pre-wrap">
                <code>{clazz}</code>
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PojoGeneratorFrontend;