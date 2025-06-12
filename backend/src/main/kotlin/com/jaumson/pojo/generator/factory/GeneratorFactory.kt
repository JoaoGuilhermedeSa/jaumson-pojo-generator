package com.jaumson.pojo.generator.factory

import com.jaumson.pojo.generator.service.PojoGenerator
import com.jaumson.pojo.generator.service.impl.JavaPojoGenerator
import org.springframework.stereotype.Service

@Service
class GeneratorFactory(private val javaPojoGenerator: JavaPojoGenerator) {

    fun getGenerator(language: String = "java"): PojoGenerator {
        return javaPojoGenerator
    }
}