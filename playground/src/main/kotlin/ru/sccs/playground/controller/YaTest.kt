package ru.sccs.playground.controller

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping

@Tag(name = "Test", description = "Test methods")
interface YaTest {

    @GetMapping("/")
    @Operation(summary = "YAtest operation")
    fun getSome(): ResponseEntity<String>
}