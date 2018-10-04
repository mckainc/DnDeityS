-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.12 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table dnd.backgrounds
DROP TABLE IF EXISTS `backgrounds`;
CREATE TABLE IF NOT EXISTS `backgrounds` (
  `BackgroundId` int(11) NOT NULL AUTO_INCREMENT,
  `BackgroundName` varchar(128) NOT NULL,
  `BackgroundJSON` text,
  PRIMARY KEY (`BackgroundId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.
-- Dumping structure for table dnd.characters
DROP TABLE IF EXISTS `characters`;
CREATE TABLE IF NOT EXISTS `characters` (
  `CharacterId` int(11) NOT NULL AUTO_INCREMENT,
  `RaceId` int(11) DEFAULT NULL,
  `ClassId` int(11) DEFAULT NULL,
  `CharacterName` text,
  `CharacterExperience` int(11) DEFAULT NULL,
  `CharacterHp` int(11) DEFAULT NULL,
  `CharacterMaxHp` int(11) DEFAULT NULL,
  `CharacterAbilityScores` text,
  `CharacterGold` text,
  `CharacterEquipment` text,
  `CharacterChoices` text,
  `CharacterSpells` text,
  `CharacterDescription` text,
  PRIMARY KEY (`CharacterId`),
  KEY `RaceId` (`RaceId`),
  KEY `ClassId` (`ClassId`),
  CONSTRAINT `characters_ibfk_1` FOREIGN KEY (`RaceId`) REFERENCES `races` (`raceid`),
  CONSTRAINT `characters_ibfk_2` FOREIGN KEY (`ClassId`) REFERENCES `classes` (`classid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.
-- Dumping structure for table dnd.classes
DROP TABLE IF EXISTS `classes`;
CREATE TABLE IF NOT EXISTS `classes` (
  `ClassId` int(11) NOT NULL AUTO_INCREMENT,
  `ClassName` varchar(128) NOT NULL,
  `ClassData` text,
  PRIMARY KEY (`ClassId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.
-- Dumping structure for table dnd.equipments
DROP TABLE IF EXISTS `equipments`;
CREATE TABLE IF NOT EXISTS `equipments` (
  `EquipmentId` int(11) NOT NULL AUTO_INCREMENT,
  `EquipmentName` varchar(128) NOT NULL,
  `EquipmentData` text,
  PRIMARY KEY (`EquipmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.
-- Dumping structure for table dnd.feats
DROP TABLE IF EXISTS `feats`;
CREATE TABLE IF NOT EXISTS `feats` (
  `FeatId` int(11) NOT NULL AUTO_INCREMENT,
  `FeatName` varchar(128) NOT NULL,
  `FeatJSON` text,
  PRIMARY KEY (`FeatId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.
-- Dumping structure for table dnd.maps
DROP TABLE IF EXISTS `maps`;
CREATE TABLE IF NOT EXISTS `maps` (
  `MapId` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT NULL,
  `RoomId` int(11) DEFAULT NULL,
  PRIMARY KEY (`MapId`),
  KEY `UserId` (`UserId`),
  KEY `RoomId` (`RoomId`),
  CONSTRAINT `maps_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`userid`),
  CONSTRAINT `maps_ibfk_2` FOREIGN KEY (`RoomId`) REFERENCES `rooms` (`roomid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.
-- Dumping structure for table dnd.monsters
DROP TABLE IF EXISTS `monsters`;
CREATE TABLE IF NOT EXISTS `monsters` (
  `MonsterId` int(11) NOT NULL AUTO_INCREMENT,
  `MonsterName` varchar(128) NOT NULL,
  `MonsterData` text,
  `MapId` int(11) DEFAULT NULL,
  PRIMARY KEY (`MonsterId`),
  KEY `MapId` (`MapId`),
  CONSTRAINT `monsters_ibfk_1` FOREIGN KEY (`MapId`) REFERENCES `maps` (`mapid`)
) ENGINE=InnoDB AUTO_INCREMENT=326 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.
-- Dumping structure for table dnd.races
DROP TABLE IF EXISTS `races`;
CREATE TABLE IF NOT EXISTS `races` (
  `RaceId` int(11) NOT NULL AUTO_INCREMENT,
  `RaceName` varchar(128) NOT NULL,
  `RaceData` text,
  PRIMARY KEY (`RaceId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.
-- Dumping structure for table dnd.rooms
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE IF NOT EXISTS `rooms` (
  `RoomId` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`RoomId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.
-- Dumping structure for table dnd.spells
DROP TABLE IF EXISTS `spells`;
CREATE TABLE IF NOT EXISTS `spells` (
  `SpellId` int(11) NOT NULL AUTO_INCREMENT,
  `SpellName` varchar(128) NOT NULL,
  `SpellData` text,
  PRIMARY KEY (`SpellId`)
) ENGINE=InnoDB AUTO_INCREMENT=306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.
-- Dumping structure for table dnd.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(128) NOT NULL,
  `UserPassword` varchar(128) NOT NULL,
  `UserEmail` varchar(128) NOT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
