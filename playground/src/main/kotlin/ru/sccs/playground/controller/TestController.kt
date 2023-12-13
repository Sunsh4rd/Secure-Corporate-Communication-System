package ru.sccs.playground.controller

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import ru.sccs.playground.controller.YaTest
import ru.sccs.playground.service.TestService

@RestController
@Tag(name = "Test", description = "Test methods")
class TestController(private val testService: TestService) : YaTest {

    private val logger: Logger = LogManager.getLogger(this::class.java)

    @GetMapping("/test")
    @Operation(summary = "Test operation")
    fun getTest(): ResponseEntity<String> {
        logger.trace("TRACE")
        logger.debug("DEBUG")
        logger.info("INFO")
        logger.warn("WARN")
        logger.error("ERROR")
        logger.fatal("FATAL {}; {}", "w", 123)
        return ResponseEntity.ok("hey")
    }

    override fun getSome(): ResponseEntity<String> {
        TODO("Not yet implemented")
    }
}