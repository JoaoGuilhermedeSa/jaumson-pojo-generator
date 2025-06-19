package com.jaumson.pojo.generator.model

class GenerationOptions(
    val generateConstructors: Boolean,
    val generateGettersAndSetters: Boolean,
    val className: String?,
    val packageName: String?
)