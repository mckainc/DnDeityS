\! echo '\nDrop and recreate database... ';
DROP DATABASE IF EXISTS dnd;
CREATE DATABASE dnd;
\! echo 'Done.\n';
USE dnd;

\! echo 'Create user table... ';
CREATE TABLE users (
	UserId INT NOT NULL AUTO_INCREMENT, 
	UserName VARCHAR(128) NOT NULL, 
	UserPassword VARCHAR(128) NOT NULL, 
	UserEmail VARCHAR (128) NOT NULL,
	PRIMARY KEY (UserId));
\! echo 'Done. \n';

\! echo 'Create rooms table... ';
CREATE TABLE rooms (
	RoomId INT NOT NULL AUTO_INCREMENT, 
	PRIMARY KEY (RoomId),
	UserId int);
\! echo 'Done. \n';


\! echo 'Create classes table... ';
CREATE TABLE classes (
    ClassId INT NOT NULL AUTO_INCREMENT,
    ClassName VARCHAR(128) NOT NULL,
    ClassData TEXT,
    PRIMARY KEY (ClassId));
\! echo 'Done.\n';

\! echo 'Create equipments table... ';
CREATE TABLE equipments (
	EquipmentId INT NOT NULL AUTO_INCREMENT, 
	EquipmentName VARCHAR(128) NOT NULL,
	EquipmentData TEXT,
	PRIMARY KEY (EquipmentId));
\! echo 'Done.\n';

\! echo 'Create backgrounds table... ';
CREATE TABLE backgrounds (
	BackgroundId INT NOT NULL AUTO_INCREMENT,
	BackgroundName VARCHAR(128) NOT NULL, 
	BackgroundJSON TEXT,	
	PRIMARY KEY (BackgroundId));
\! echo 'Done.\n';

\! echo 'Create races table... ';
CREATE TABLE races (
	RaceId INT NOT NULL AUTO_INCREMENT, 
	RaceName VARCHAR(128) NOT NULL, 
	RaceData TEXT,
	PRIMARY KEY (RaceId));
\! echo 'Done.\n';
;;
\! echo 'Create spells table... ';
CREATE TABLE spells (
	SpellId INT NOT NULL AUTO_INCREMENT,
	SpellName VARCHAR(128) NOT NULL,
	SpellData TEXT,
	PRIMARY KEY (SpellId));
\! echo 'Done.\n';



\! echo 'Create characters table... ';
CREATE TABLE characters (
	CharacterId INT NOT NULL AUTO_INCREMENT,
	UserId int,
	CharacterName TINYTEXT,
	RaceId int,
	ClassId int,
	CharacterExperience int,
	CharacterHp int,
	CharacterMaxHp int,
	CharacterAbilityScores TEXT,
	CharacterGold TEXT,
	CharacterEquipment TEXT,
	CharacterDescription TEXT,
	CharacterSpells TEXT,
	CharacterChoices TEXT,
	PRIMARY KEY (CharacterId));
\! echo 'Done.\n';

\! echo 'Create maps Table... ';
CREATE TABLE maps (
	MapId INT NOT NULL AUTO_INCREMENT,
	UserId int,
	RoomId int, 
	MapName TINYTEXT,
	MapHeight int,
	MapWidth int,
	MapTiles TEXT,
	PRIMARY KEY (MapId));
 \! echo 'Done.\n'


\! echo 'Create monsters table... ';
CREATE TABLE monsters (
    MonsterId INT NOT NULL AUTO_INCREMENT,
    MonsterName VARCHAR(128) NOT NULL,
    MonsterData TEXT,
    MapId int,
    PRIMARY KEY (MonsterId));
\! echo 'Done.\n';

\! echo 'Create feats table... ';
CREATE TABLE feats (
	FeatId INT NOT NULL AUTO_INCREMENT,
	FeatData TEXT,
	PRIMARY KEY (FeatId));
\! echo 'Done.\n';

\! echo 'Create features table... ';
CREATE TABLE features(
	FeatureId INT NOT NULL AUTO_INCREMENT,
	FeatureName VARCHAR(128) NOT NULL,
	ClassName VARCHAR(128) NOT NULL,
	FeatureLevel INT, 
	FeatureData TEXT, 
	PRIMARY KEY (FeatureId));
\! echo 'Done.\n';

\! echo 'Create subclasses table... ';
CREATE TABLE subclasses(
	SubclassId INT NOT NULL AUTO_INCREMENT,
	ClassName VARCHAR(128) NOT NULL,
	SubclassData TEXT,
	PRIMARY KEY (SubclassId));
