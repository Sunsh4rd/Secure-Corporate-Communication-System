package ru.sccs.server.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class APIDocumentationConfig {

    @Bean
    public OpenAPI documentationConfig() {
        return new OpenAPI()
                .info(new Info()
                        .title("Playground")
                        .description("Playground APIs")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Sunsh4rd")
                                .email("ssoslickk@gmail.com")));
    }
}
