package com.jaumson.pojo.generator.model

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import jakarta.servlet.http.HttpServletRequest
class PojoResponse(
    val classes: Array<String>
)