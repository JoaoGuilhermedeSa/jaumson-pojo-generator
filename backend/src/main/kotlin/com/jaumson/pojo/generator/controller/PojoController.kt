package com.jaumson.pojo.generator.controller

import com.fasterxml.jackson.databind.JsonNode
import com.jaumson.pojo.generator.factory.GeneratorFactory
import com.jaumson.pojo.generator.model.GenerationOptions
import com.jaumson.pojo.generator.model.PojoResponse
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class PojoController(private val generatorFactory: GeneratorFactory) {

    @PostMapping("/java")
    fun getPojo(@RequestBody schema: JsonNode, options: GenerationOptions): PojoResponse {
        return PojoResponse(arrayOf(generatorFactory.getGenerator().generate(schema, options)));
    }
}