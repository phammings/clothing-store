#!/bin/bash

DB_NAME="clothing_store"
DB_USER="postgres"
DB_PASSWORD="root"

echo "----------------------------------------------------------------------------------------------------"
echo "****************************************************************************************************"
echo "----------------------------------------------------------------------------------------------------"

echo "-----BEGIN DATABASE CREATION-----"

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
PGPASSWORD=$DB_PASSWORD psql -d $DB_NAME -U $DB_USER -f src/main/resources/database1.sql
PGPASSWORD=$DB_PASSWORD psql -d $DB_NAME -U $DB_USER -f src/main/resources/database2.sql
PGPASSWORD=$DB_PASSWORD psql -d $DB_NAME -U $DB_USER -f src/main/resources/database3.sql

echo "-----END IMPORTING TEST DATA-----"
