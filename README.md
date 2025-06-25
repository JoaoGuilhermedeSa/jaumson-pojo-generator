# POJO Generator

This project is a Kotlin-based Spring Boot API that generates POJO classes from a given JSON Schema. The output classes are currently generated in Java, following conventions similar to other projects, including field declarations, getters/setters, and constructors.

## 🛠 Technologies Used

- **Kotlin 2.1.0**
- **Spring Boot 4.0.0**
- **Jackson (for JSON parsing)**
- **Maven**

## 📦 Features

- Converts JSON Schema to Java class definitions
- Maps schema types (`string`, `number`, `object`, etc.) to appropriate Java types
- Supports generation of:
  - Private fields
  - Getters and setters
  - Default constructor
  - All-arguments constructor
- Easily extensible to support other output languages (via `PojoGenerator` interface)

## ▶️ How to Run

1. **Clone the repository or extract the ZIP:**
   ```bash
   unzip pojo-generator.zip
   cd pojo-generator
   ```

2. **Build the project using Maven:**
   ```bash
   ./mvnw clean install
   ```

3. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

The application will start at `http://localhost:8080`.

## 🧪 How to Test


**Endpoint:** `POST http://localhost:8080/api/java/json`

**Request body:**
```json
{
  "type": "object",
  "properties": {
    "foo": { "type": "string" },
    "bar": { "type": "integer" }
  }
}
```

**Endpoint:** `POST http://localhost:8080/api/java/yaml`

**Request body:**
```yaml
type: object
properties:
  foo:
    type: string
  bar:
    type: integer
```