CREATE OR REPLACE PROCEDURE create_tables_and_procedures()
LANGUAGE plpgsql
AS $$
BEGIN
    EXECUTE 'CREATE TABLE roomsize (id serial PRIMARY KEY, size varchar(10) NOT NULL);';
    EXECUTE 'CREATE TABLE maintenance_heads (id serial PRIMARY KEY, heads varchar(100) NOT NULL, CONSTRAINT unique_heads UNIQUE (heads));';
    EXECUTE 'CREATE TABLE ownerdetails (Id SERIAL PRIMARY KEY, FirstName VARCHAR(255) NOT NULL, LastName VARCHAR(255) NOT NULL, Email VARCHAR(255) NOT NULL, PhoneNumber VARCHAR(20) NOT NULL);';
    EXECUTE 'CREATE TABLE ownerpassword (Id SERIAL PRIMARY KEY, OwnerId INT NOT NULL, Password VARCHAR(255) NOT NULL, FOREIGN KEY (OwnerId) REFERENCES ownerdetails(Id) ON DELETE CASCADE);';
    EXECUTE 'CREATE TABLE societydetails (id serial PRIMARY KEY, name varchar(100) NOT NULL, email varchar(255) NOT NULL, address varchar(250) NOT NULL, city varchar(100) NOT NULL, state varchar(100) NOT NULL, postalcode varchar(10) NOT NULL, establishmentdate date NOT NULL, registrationnumber varchar(20) NOT NULL, phonenumber varchar(12) NOT NULL, CONSTRAINT uniqueemail UNIQUE (email));';
    EXECUTE 'CREATE TABLE societypasswords (id serial PRIMARY KEY, password varchar(255) NOT NULL, CONSTRAINT societypasswords_id_fkey FOREIGN KEY (id) REFERENCES public.societydetails(id) ON DELETE CASCADE);';
    EXECUTE 'CREATE TABLE wingdetails (id SERIAL PRIMARY KEY, society_id INT NOT NULL REFERENCES societydetails(id) ON DELETE CASCADE, name VARCHAR(255) NOT NULL, flats_per_floor INT NOT NULL);';
    EXECUTE 'CREATE TABLE roomdetails (id SERIAL PRIMARY KEY, wing_id INT NOT NULL REFERENCES wingdetails(id) ON DELETE CASCADE, room_size_id INT NOT NULL REFERENCES roomsize(id) ON DELETE CASCADE, room_no VARCHAR(50) NOT NULL, amount DECIMAL(10, 2) NOT NULL);';
END;
$$;

