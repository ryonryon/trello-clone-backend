-- Check for user first to avoid initialization failure from second time
DO
$do$
BEGIN
   IF EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'test') THEN

      RAISE NOTICE 'Role "test" already exists. Skipping user creation.';
   ELSE
    CREATE USER test WITH PASSWORD 'test' CREATEDB;
   END IF;
END
$do$;

CREATE DATABASE "trello-clone-test"
    WITH 
    OWNER = test
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;