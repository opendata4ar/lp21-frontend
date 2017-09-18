var ddl = "
-- Create Table: city
--------------------------------------------------------------------------------
CREATE TABLE city
(
	id INTEGER NOT NULL 
	,label TEXT NOT NULL 
	,country_id INTEGER NOT NULL 
	,CONSTRAINT PK_city_id PRIMARY KEY (id)
);



-- Create Table: school
--------------------------------------------------------------------------------
CREATE TABLE school
(
	id INTEGER NOT NULL
	,label TEXT NOT NULL 
	,city_id INTEGER NOT NULL 
);



-- Create Table: class
--------------------------------------------------------------------------------
CREATE TABLE class
(
	id INTEGER NOT NULL 
	,label TEXT NOT NULL 
	,school_id INTEGER NOT NULL 
	,CONSTRAINT PK_class_id PRIMARY KEY (id)
);



-- Create Table: person
--------------------------------------------------------------------------------
CREATE TABLE person
(
	id INTEGER NOT NULL 
	,given TEXT  NULL 
	,family TEXT  NULL 
	,sex SMALLINT  NULL 
	,email TEXT  NULL 
	,phone TEXT  NULL 
	,is_auth SMALLINT NOT NULL 
	,access_code TEXT  NULL 
	,role TEXT NOT NULL 
	,CONSTRAINT PK_person_id PRIMARY KEY (id)
);



-- Create Table: my_class
--------------------------------------------------------------------------------
CREATE TABLE my_class
(
	person_id INTEGER NOT NULL 
	,class_id INTEGER NOT NULL 
);



-- Create Table: country
--------------------------------------------------------------------------------
CREATE TABLE country
(
	id INTEGER NOT NULL 
	,label TEXT NOT NULL 
	,locale VARCHAR(5)  NULL 
	,CONSTRAINT PK_country_id PRIMARY KEY (id)
);



-- Create Table: parent
--------------------------------------------------------------------------------
CREATE TABLE parent
(
	parent_id INTEGER NOT NULL 
	,child_id INTEGER NOT NULL 
);



-- Create Table: invite
--------------------------------------------------------------------------------
CREATE TABLE invite
(
	from_id INTEGER NOT NULL 
	,to_id INTEGER NOT NULL 
	,sent_at TEXT NOT NULL 
);



-- Create Table: member
--------------------------------------------------------------------------------
CREATE TABLE member
(
	class_id INTEGER NOT NULL 
	,person_id INTEGER NOT NULL 
);



-- Create Table: homework
--------------------------------------------------------------------------------
CREATE TABLE homework
(
	id INTEGER NOT NULL 
	,label TEXT NOT NULL 
	,text VARCHAR(250)  NULL 
	,estimate INTEGER  NULL 
	,due TEXT  NULL 
	,creator_id INTEGER  NULL 
	,class_id INTEGER NOT NULL 
	,CONSTRAINT PK_homework_id PRIMARY KEY (id)
	,CONSTRAINT PK_homework_estimate PRIMARY KEY (estimate)
	,CONSTRAINT PK_homework_creator_id PRIMARY KEY (creator_id)
	,CONSTRAINT PK_homework_class_id PRIMARY KEY (class_id)
);



-- Create Foreign Key: class.school_id -> school.id
ALTER TABLE class ADD CONSTRAINT FK_class_school_id_school_id FOREIGN KEY (school_id) REFERENCES school(id);


-- Create Foreign Key: member.class_id -> class.id
ALTER TABLE member ADD CONSTRAINT FK_member_class_id_class_id FOREIGN KEY (class_id) REFERENCES class(id);


-- Create Foreign Key: invite.to_id -> person.id
ALTER TABLE invite ADD CONSTRAINT FK_invite_to_id_person_id FOREIGN KEY (to_id) REFERENCES person(id);


-- Create Foreign Key: invite.from_id -> person.id
ALTER TABLE invite ADD CONSTRAINT FK_invite_from_id_person_id FOREIGN KEY (from_id) REFERENCES person(id);


-- Create Foreign Key: parent.parent_id -> person.id
ALTER TABLE parent ADD CONSTRAINT FK_parent_parent_id_person_id FOREIGN KEY (parent_id) REFERENCES person(id);


-- Create Foreign Key: parent.child_id -> person.id
ALTER TABLE parent ADD CONSTRAINT FK_parent_child_id_person_id FOREIGN KEY (child_id) REFERENCES person(id);


-- Create Foreign Key: member.person_id -> person.id
ALTER TABLE member ADD CONSTRAINT FK_member_person_id_person_id FOREIGN KEY (person_id) REFERENCES person(id);


-- Create Foreign Key: my_class.person_id -> person.id
ALTER TABLE my_class ADD CONSTRAINT FK_my_class_person_id_person_id FOREIGN KEY (person_id) REFERENCES person(id);


-- Create Foreign Key: my_class.class_id -> class.id
ALTER TABLE my_class ADD CONSTRAINT FK_my_class_class_id_class_id FOREIGN KEY (class_id) REFERENCES class(id);


-- Create Foreign Key: school.city_id -> city.id
ALTER TABLE school ADD CONSTRAINT FK_school_city_id_city_id FOREIGN KEY (city_id) REFERENCES city(id);


-- Create Foreign Key: homework.class_id -> class.id
ALTER TABLE homework ADD CONSTRAINT FK_homework_class_id_class_id FOREIGN KEY (class_id) REFERENCES class(id);


-- Create Foreign Key: city.country_id -> country.id
ALTER TABLE city ADD CONSTRAINT FK_city_country_id_country_id FOREIGN KEY (country_id) REFERENCES country(id);
";

