\! echo '\nDrop and recreate database... ';
DROP DATABASE IF EXISTS dnd;
CREATE DATABASE dnd;
\! echo 'Done.\n';
USE dnd;

\! echo 'Create User table... ';
CREATE TABLE Users (
	UserId INT NOT NULL AUTO_INCREMENT, 
	UserName VARCHAR(128) NOT NULL, 
	UserPassword VARCHAR(128) NOT NULL, 
	PRIMARY KEY (UserId));
\! echo 'Done. \n';

\! echo 'Create Rooms table... ';
CREATE TABLE Rooms (
	RoomId INT NOT NULL AUTO_INCREMENT, 
	#RoomUrl VARCHAR (255) NOT NULL,
	PRIMARY KEY (RoomId),
	UserId int,
	FOREIGN KEY (UserId) REFERENCES Users(UserId));
\! echo 'Done. \n';



\! echo 'Create Characters table... ';
CREATE TABLE Characters (
        CharacterId INT NOT NULL AUTO_INCREMENT,
        CharacterJSON TEXT,
        PRIMARY KEY (CharacterId));
\! echo 'Done.\n';


\! echo 'Create Classes table... ';
CREATE TABLE Classes (
    ClassId INT NOT NULL AUTO_INCREMENT,
    ClassName VARCHAR(128) NOT NULL,
    #ClassUrl VARCHAR(256) NOT NULL,
	ClassData TEXT,
    CharacterId int,
    FOREIGN KEY (CharacterId) REFERENCES Characters(CharacterId),
    PRIMARY KEY (ClassId));
\! echo 'Done.\n';

\! echo 'Create Equipments table... ';
CREATE TABLE Equipments (
	EquipmentId INT NOT NULL AUTO_INCREMENT, 
	EquipmentName VARCHAR(128) NOT NULL,
	#EquipmentURL VARCHAR(255) NOT NULL, 
	CharacterId int,
	EquipmentData TEXT,
	FOREIGN KEY (CharacterId) REFERENCES Characters(CharacterId), 
	PRIMARY KEY (EquipmentId));
\! echo 'Done.\n';

\! echo 'Create Backgrounds table... ';
CREATE TABLE Backgrounds (
	BackgroundId INT NOT NULL AUTO_INCREMENT,
	BackgroundName VARCHAR(128) NOT NULL, 
	BackgroundUrl VARCHAR(255) NOT NULL,
	BackgroundJSON TEXT,	
	CharacterId int,
	FOREIGN KEY (CharacterId) REFERENCES Characters(CharacterId),
	PRIMARY KEY (BackgroundId));
\! echo 'Done.\n';

\! echo 'Create Races table... ';
CREATE TABLE Races (
	RaceId INT NOT NULL AUTO_INCREMENT, 
	RaceName VARCHAR(128) NOT NULL, 
	#RaceURL VARCHAR(255) NOT NULL,
	RaceData TEXT,
	PRIMARY KEY (RaceId),
	CharacterId int,
	FOREIGN KEY (CharacterId) REFERENCES Characters(CharacterId));
\! echo 'Done.\n';

\! echo 'Create Spells table... ';
CREATE TABLE Spells (
	SpellId INT NOT NULL AUTO_INCREMENT,
	SpellName VARCHAR(128) NOT NULL,
	#SpellURL VARCHAR(255) NOT NULL, 
	SpellData TEXT,
	CharacterId int,
        FOREIGN KEY (CharacterId) REFERENCES Characters(CharacterId),
	PRIMARY KEY (SpellId));
\! echo 'Done.\n';

\! echo 'Create Feats table... ';
CREATE TABLE Feats (
	FeatId INT NOT NULL AUTO_INCREMENT, 
	FeatName VARCHAR(128) NOT NULL, 
	FeatURL VARCHAR(255) NOT NULL, 
	FeatJSON TEXT,
	CharacterId int,
	FOREIGN KEY (CharacterId) REFERENCES Characters(CharacterId),
	PRIMARY KEY (FeatId));
\! echo 'Done. \n';



\! echo 'Create Maps Table... ';
CREATE TABLE Maps (
	MapId INT NOT NULL AUTO_INCREMENT,
	UserId int,
	RoomId int, 
	FOREIGN KEY (UserId) REFERENCES Users(UserId),
	FOREIGN KEY (RoomId) REFERENCES Rooms(RoomId),
	# Store matrix 
	PRIMARY KEY (MapId));
 \! echo 'Done.\n'


\! echo 'Create Monsters table... ';
CREATE TABLE Monsters (
    MonsterId INT NOT NULL AUTO_INCREMENT,
    MonsterName VARCHAR(128) NOT NULL,
    #MonsterUrl VARCHAR(255) NOT NULL,
    MonsterData TEXT,
    MapId int,
    FOREIGN KEY (MapId) REFERENCES Maps(MapId),
    PRIMARY KEY (MonsterId));
\! echo 'Done.\n';
