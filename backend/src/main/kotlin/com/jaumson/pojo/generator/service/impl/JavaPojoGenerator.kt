package com.jaumson.pojo.generator.service.impl

import com.fasterxml.jackson.databind.JsonNode
import com.jaumson.pojo.generator.model.GenerationOptions
import com.jaumson.pojo.generator.service.PojoGenerator
import org.springframework.stereotype.Component

@Component
class JavaPojoGenerator : PojoGenerator {

    private val typeMap = mapOf(
        "string" to "String",
        "number" to "Double",
        "integer" to "Integer",
        "boolean" to "Boolean",
        "object" to "Object",
        "array" to "List<Object>",
        "null" to "Object",
        "any" to "Object"
    )

    override fun generate(schema: JsonNode, options: GenerationOptions): String {
        var className = options.className ?: "MyClass";
        var pkg = options.packageName ?: "com.example";
        val sb = StringBuilder("package $pkg;\n\n")
            sb.append( "public class $className {\n")
        val props = schema["properties"] ?: return ""

        sb.append("\n")
        generateAttributes(sb, props);
        if (options.generateConstructors) {
            generateConstructors(className, sb, props);
        }
        if (options.generateGettersAndSetters) {
            generateGettersAndSetters(sb, props);
        }
        sb.append("}\n")
        return sb.toString()
    }

    private fun generateConstructors(className: String, sb: StringBuilder, props: JsonNode) {
        val fields = mutableListOf<Pair<String, String>>()

        props.fields().forEach { (name, prop) ->
            val type = prop["type"]?.asText() ?: "any"
            val javaType = typeMap[type] ?: "Object"
            fields.add(name to javaType)
        }

        sb.append("\n    public $className() { }\n\n")

        sb.append("    public $className(")
        sb.append(fields.joinToString(", ") { "${it.second} ${it.first}" })
        sb.append(") {\n")
        fields.forEach { (name, _) -> sb.append("        this.$name = $name;\n") }
        sb.append("    }\n\n")

    }

    private fun generateGettersAndSetters(sb: StringBuilder, props: JsonNode) {
        props.fields().forEach { (name, prop) ->
            val type = prop["type"]?.asText() ?: "any"
            val javaType = typeMap[type] ?: "Object"
            val capitalized = name.replaceFirstChar { it.uppercase() }
            sb.append("    public $javaType get$capitalized() {\n      return $name;\n    }\n")
            sb.append("    public void set$capitalized($javaType $name) {\n      this.$name = $name;\n    }\n")
        }
        sb.append("\n")
    }

    private fun generateAttributes(sb: StringBuilder, props: JsonNode) {
        props.fields().forEach { (name, prop) ->
            val type = prop["type"]?.asText() ?: "any"
            val javaType = typeMap[type] ?: "Object"
            val capitalized = name.replaceFirstChar { it.uppercase() }
            sb.append("    private $javaType $name;\n")
        }
        sb.append("\n")

    }
}