# Etapa de construcción: usamos Maven para compilar el código
FROM maven:3.9.0-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa de ejecución: usamos un entorno Java ligero
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Spring Boot usa el puerto 8080 por defecto
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]