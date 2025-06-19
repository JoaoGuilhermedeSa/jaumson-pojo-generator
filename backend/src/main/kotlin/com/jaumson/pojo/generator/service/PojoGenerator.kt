package com.jaumson.pojo.generator.service

import com.fasterxml.jackson.databind.JsonNode
import com.jaumson.pojo.generator.model.GenerationOptions


interface PojoGenerator {
    fun generate(schema: JsonNode, options: GenerationOptions): String
}