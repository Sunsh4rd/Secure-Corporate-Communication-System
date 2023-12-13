FROM gradle:8.2.1-jdk17-alpine as builder
WORKDIR /app
COPY . /app/.
RUN ./gradlew clean build --no-daemon

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/build/libs/sccs-server-0.0.1-SNAPSHOT.jar /app/sccs-server-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/app/sccs-server-0.0.1-SNAPSHOT.jar"]
