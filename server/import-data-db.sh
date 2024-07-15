#!/bin/bash

DB_NAME="clothing_store"
DB_USER="postgres"
DB_PASSWORD="root"
DB_HOST="postgres" 

echo "----------------------------------------------------------------------------------------------------"
echo "****************************************************************************************************"
echo "----------------------------------------------------------------------------------------------------"

echo "-----BEGIN DATABASE CREATION-----"


# Retry logic to connect and import data
max_retries=10
retry_count=0
until PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -p 5432 -d $DB_NAME -c "SELECT 1;" >/dev/null 2>&1 || [ $retry_count -eq $max_retries ]; do
    echo "Waiting for PostgreSQL to become available..."
    sleep 5
    ((retry_count++))
done

if [ $retry_count -eq $max_retries ]; then
    echo "Failed to connect to PostgreSQL after $max_retries retries. Exiting..."
    exit 1
fi

if ! psql -lqt -U $DB_USER | cut -d \| -f 1 | grep -qw $DB_NAME; then
  echo "Creating database $DB_NAME..."
  PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;"
else
  echo "Database $DB_NAME already exists."
fi

echo "-----END DATABASE CREATION-----"

echo "----------------------------------------------------------------------------------------------------"
echo "****************************************************************************************************"
echo "----------------------------------------------------------------------------------------------------"

echo "-----BEGIN IMPORTING TEST DATA-----"


# Import test data
PGPASSWORD=$DB_PASSWORD psql -d $DB_NAME -U $DB_USER -h $DB_HOST -f ./src/main/resources/database1.sql
PGPASSWORD=$DB_PASSWORD psql -d $DB_NAME -U $DB_USER -h $DB_HOST -f ./src/main/resources/database2.sql
PGPASSWORD=$DB_PASSWORD psql -d $DB_NAME -U $DB_USER -h $DB_HOST -f ./src/main/resources/database3.sql

echo "-----END IMPORTING TEST DATA-----"

echo "----------------------------------------------------------------------------------------------------"
echo "****************************************************************************************************"
echo "----------------------------------------------------------------------------------------------------"
