
--Creates login table
CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    hash character varying(100) NOT NULL,
    email text NOT NULL UNIQUE
);

--Creates users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name character varying(100),
    email text NOT NULL UNIQUE,
    entries bigint DEFAULT 0,
    joined timestamp without time zone NOT NULL
);
