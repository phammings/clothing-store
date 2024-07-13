# Use the official Maven image to build the app with Java 8
FROM maven:3.6.3-jdk-8 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Use the official OpenJDK image to run the app with Java 8
FROM openjdk:8-jre-slim

WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Copy SQL files from local directory into the Docker image
COPY --from=build /app/target/*.jar app.jar
COPY --from=build /app/src ./src
COPY import-data-db.sh .
COPY entrypoint.sh .

RUN chmod +x import-data-db.sh entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["./entrypoint.sh"]
