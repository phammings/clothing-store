#!/bin/sh

# Run the import data script
./import-data-db.sh

# Start the Spring Boot application
exec java -jar app.jar
