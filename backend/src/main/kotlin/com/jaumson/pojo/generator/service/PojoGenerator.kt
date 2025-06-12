package com.jaumson.pojo.generator.service

import com.fasterxml.jackson.databind.JsonNode

interface PojoGenerator {
    fun generate(schema: JsonNode, className: String = "MyObject", pkg: String = "com.example"): String
}