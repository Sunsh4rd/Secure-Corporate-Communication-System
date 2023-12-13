package ru.sccs.playground.config

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Contact
import io.swagger.v3.oas.models.info.Info
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class APIDocumentationConfig {

    @Bean
    fun documentationConfig() =
        OpenAPI()
            .info(Info()
                .title("Title")
                .description("Desc")
                .version("1.0.0")
                .contact(Contact()
                    .name("Me")
                    .email("Email")
                )
            )
}