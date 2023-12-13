plugins {
    java
    id("org.springframework.boot") version "3.1.4"
    id("io.spring.dependency-management") version "1.1.3"
}

group = "ru.sccs"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.security:spring-security-messaging")
    implementation("com.auth0:java-jwt:4.4.0")
//    implementation("io.jsonwebtoken:jjwt-api:0.12.3")
//    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.3")
//    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.3")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-configuration-processor:3.1.4")
    implementation("org.springframework.boot:spring-boot-starter-websocket")
	implementation("org.liquibase:liquibase-core")
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    runtimeOnly("org.postgresql:postgresql")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
//    testImplementation("org.springframework.security:spring-security-test")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.2.0")
    implementation("org.springdoc:springdoc-openapi-starter-common:2.2.0")
    implementation("org.mapstruct:mapstruct:1.5.5.Final")
    annotationProcessor("org.mapstruct:mapstruct-processor:1.5.5.Final")
    implementation("org.springframework.boot:spring-boot-starter-log4j2:3.1.4")
    implementation("org.hibernate.validator:hibernate-validator:8.0.1.Final")
    modules {
        module("org.springframework.boot:spring-boot-starter-logging") {
            replacedBy("org.springframework.boot:spring-boot-starter-log4j2")
        }
    }
}

tasks {
    java {
        compileJava {
            options.compilerArgs.add("-Amapstruct.defaultComponentModel=spring")
        }
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
