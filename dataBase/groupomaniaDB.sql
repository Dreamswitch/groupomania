-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `groupomania`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `groupomania`;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `idcomments` int NOT NULL AUTO_INCREMENT,
  `body` text NOT NULL,
  `media` varchar(255) DEFAULT NULL,
  `idusers` int NOT NULL,
  `idpublications` int NOT NULL,
  PRIMARY KEY (`idcomments`,`idusers`,`idpublications`),
  KEY `fk_comment_user1_idx` (`idusers`) USING BTREE,
  KEY `fk_comment_publication1_idx` (`idpublications`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`idusers`) REFERENCES `user` (`idusers`) ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`idpublications`) REFERENCES `publication` (`idpublications`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (17,'tu aurais pu faire mieux comme comment non ?','http://localhost:3000/images/super-mario-bros-sur-wii-on-l-a-teste.jpeg1607164344680.jpg',16,3),(18,'pour dire ca retient toi la prochaine fois','http://localhost:3000/images/super-mario-bros-sur-wii-on-l-a-teste.jpeg1607164368923.jpg',16,3),(22,'bah alors la je ne comprend pas',NULL,16,45),(23,'il faut arrêter avec Nintendo c\'est vraiment pas ouf !!',NULL,16,30),(24,'maintenant on peut pourrir les publications des voisins',NULL,16,30),(25,'toujours a se plaindre la grosse, arrête donc le surimi pour commencer ',NULL,16,15),(27,' oui oui oui ou non','http://localhost:3000/images/xbox-series-x-photo-5f47e3753e50d.jpg1607871062614.jpg',16,46),(36,'gg bouboule',NULL,16,46),(42,'     la vie est mauve ou pas',NULL,16,52),(45,' hello super ton article ou pas',NULL,16,48),(52,'cool',NULL,16,52),(59,'cool la vie',NULL,39,57);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `idlike` int NOT NULL AUTO_INCREMENT,
  `like` tinyint DEFAULT '0',
  `idpublications` int NOT NULL,
  `idusers` int NOT NULL,
  PRIMARY KEY (`idlike`,`idpublications`,`idusers`),
  KEY `fk_like_publication1_idx` (`idpublications`) USING BTREE,
  KEY `fk_like_user1_idx` (`idusers`) USING BTREE,
  CONSTRAINT `like_ibfk_1` FOREIGN KEY (`idpublications`) REFERENCES `publication` (`idpublications`),
  CONSTRAINT `like_ibfk_2` FOREIGN KEY (`idusers`) REFERENCES `user` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1,1,3,2),(9,1,3,12),(10,0,52,16),(11,1,48,16),(12,1,46,16),(13,-1,45,16),(14,1,31,16),(15,1,30,16),(18,1,57,39);
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publication`
--

DROP TABLE IF EXISTS `publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publication` (
  `idpublications` int NOT NULL AUTO_INCREMENT,
  `title` varchar(70) NOT NULL,
  `body` text NOT NULL,
  `media` varchar(255) DEFAULT NULL,
  `idusers` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idpublications`,`idusers`),
  KEY `fk_publication_user1_idx` (`idusers`) USING BTREE,
  CONSTRAINT `publication_ibfk_1` FOREIGN KEY (`idusers`) REFERENCES `user` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publication`
--

LOCK TABLES `publication` WRITE;
/*!40000 ALTER TABLE `publication` DISABLE KEYS */;
INSERT INTO `publication` VALUES (3,'mario a la montagne','vous en pensez quoi ? je trouve que ce serait vraiment epic de pouvoir se ballader avec nos amis de chez nintendo ','http://localhost:3000/images/super-mario-bros-sur-wii-on-l-a-teste.jpeg1605523415864.png',2,'2020-11-16 10:42:55','2020-11-16 10:43:35'),(5,'c\'est parti pour une journée folle ','suit moi si tu peux ','http://localhost:3000/images/super-mario-video-games-bonus-jumping-wallpaper-preview.jpg1607256659639.jpg',2,'2020-11-16 11:53:59','2020-12-06 12:10:59'),(13,'luigi mansion',' Luigi le boulet','http://localhost:3000/images/luigi-mario-black-hd-wallpaper-preview.jpg1607256623314.jpg',2,'2020-11-22 15:22:52','2020-12-06 12:10:23'),(14,'remède contre le covid','depuis 1990 je vous le délivre et la pharmacopée fait encore genre de ne pas avoir de traitement ','http://localhost:3000/images/dr-mario.jpg1607257268085.jpg',12,'2020-11-22 15:24:05','2020-12-06 12:21:08'),(15,'matin vs soir au boulot','les chefs tous pareil ?? bah vous êtes tellement chiant','http://localhost:3000/images/maxresdefault.jpg1607257096298.jpg',13,'2020-11-22 15:30:27','2020-12-06 12:18:54'),(18,'cool la vie','Sequelize thanks for all','http://localhost:3000/images/image.png1606728533367.png',16,'2020-11-30 09:28:53','2020-12-06 12:05:28'),(20,'la publication qui check les fous','vous avez deja vu ca ? pas plus tard que tout a l\'heure  juste devant mon bureau la petite grosse du RDC est venue manger son surimi sous le bureau de la chef du département un peu de poisson je veux bien mais a 6H du mat , elle a pas peur de l\'indigestion \nj\'ai toute la scène pour ceux qui veulent go en MP','http://localhost:3000/images/pour-l-avocate-de-france.jpg1606730051508.jpg',16,'2020-11-30 09:54:11','2020-11-30 09:54:11'),(25,'luigi mansion',' Luigi le boulet','http://localhost:3000/images/Hero.jpg1606735404961.png',18,'2020-11-30 11:23:24','2020-11-30 11:23:24'),(27,'luigi mansion',' Luigi le boulet','http://localhost:3000/images/Hero.jpg1606736792258.png',19,'2020-11-30 11:46:32','2020-11-30 11:46:32'),(30,'cool la vie','fghfghjfghjhjghjg','http://localhost:3000/images/super-mario-bros-sur-wii-on-l-a-teste.jpeg1606737709292.jpg',20,'2020-11-30 12:01:49','2020-11-30 12:01:49'),(31,'la publication qui check les fous','je ne sais pas ce que l\'avenir me reserve','http://localhost:3000/images/Hero.jpg1606737885816.jpg',21,'2020-11-30 12:04:45','2020-11-30 12:04:45'),(45,'qui se rappel de cette époque la ??','des journées entières passées a jouer sur une Nintendo , c\'est grâce a eux qu\'aujourd\'hui nous en sommes la ','http://localhost:3000/images/thumb-1920-707121.jpg1607256247403.jpg',16,'2020-12-04 17:43:22','2020-12-11 09:16:59'),(46,'Enfin disponible en magasin cool ou pas','faites chauffer les manettes , elle arrive au bureau ','http://localhost:3000/images/xboxX.jpg1607256073725.jpg',16,'2020-12-04 18:26:29','2020-12-11 11:24:00'),(48,'que la tri force soit avec nous','alors vous en dites quoi les pros billoute ?','http://localhost:3000/images/thumb-1920-79376.jpg1607257381582.jpg',12,'2020-12-06 12:23:01','2020-12-06 12:23:01'),(52,'OMG ca faisait longtemps que je n\'avais rien publié','la vie a hyrule why not\'','http://localhost:3000/images/849322.jpg1607946517689.jpg',16,'2020-12-12 09:19:50','2020-12-14 11:52:20'),(57,'la dure vie de luigi','la vie a la mansion','http://localhost:3000/images/super-mario-video-games-bonus-jumping-wallpaper-preview.jpg1608205883215.jpg',39,'2020-12-17 11:51:23','2020-12-17 11:51:30');
/*!40000 ALTER TABLE `publication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `userPassword` varchar(255) DEFAULT NULL,
  `admin` tinyint NOT NULL DEFAULT '0',
  `media` varchar(255) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idusers`),
  UNIQUE KEY `userEmail_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'luigi','plomber','luigi@nintendo.net','$2b$10$zbLXSba6guLKNNUGH1NQiOffXzDixnzkUFm/lWjwIahosd/rw7tmu',1,'http://localhost:3000/images/profile/Hero.jpg1605523342811.jpg','modified'),(4,'admin','groupomania','admin@gmail.com','$2b$10$n5JtXubgKDVL5TomAtmlTO.X3OQ8zna.Jg8TPubLp2Kt3caWuLfjC',1,NULL,NULL),(12,'mario','Plomber','mario@nintendo.net','$2b$10$ATKBMty2uamHgVNhELKEOOsFNjGcL0QH/GkwNDsL89s7PzFqGcHt2',1,NULL,NULL),(13,'peach','princess','peach@nintendo.net','$2b$10$euLI9C18kN/RTaxLSratIu5BfKjk993TKjTxrzeCrVhZGMdkH9M5C',1,NULL,NULL),(16,'willou','billou','billou@microsoft.com','$2b$10$64wwIUTsM6BV5lD.yLZhMeIQmbg1HJjVnIkkkiP1OyWIyUm81AURa',1,'http://localhost:3000/images/profile/thumb-1920-908202.png1608160115778.png','super billou '),(17,'mario','sunshine','sunshine@nintendo.com','$2b$10$.7py5PpYaQzzDb1LRz3qKuRo.OindX6Kj5yPrReiCJYr.P0NNwLLC',1,NULL,NULL),(18,'mario','sunshine','sunshinev2@nintendo.com','$2b$10$4AWiCCGuxu85zIDHZYHBnuzgJqEvPqlPtWD9XDpTT7bsKv5J0.H4m',0,NULL,NULL),(19,'mario','sunshine','sunshinev3@nintendo.com','$2b$10$BdyAPPU44XZVcrir3U1EAuNF4FcLBN/22aRahVloGi7aEoW3wp8sm',0,NULL,NULL),(20,'mario','sunshine','sunshinev4@nintendo.com','$2b$10$3KKMPSMbDwTvjhOz/fSc6eJdQhZktejsm.zcH50OA/QqMKT9nzNIW',0,NULL,NULL),(21,'mario','sunshine','sunshinev5@nintendo.com','$2b$10$TXFhEXEEwj2SuvSvLjQ9AuaqQhSrwlL4H5omfw.6z4GRiMBydAqrm',0,NULL,NULL),(22,'milou','milou','milou@microsoft.com','$2b$10$IEaSgmsKCFORhF68PING/.paO6PDhSJmpostRSdmQ04yTIMFREmV6',0,NULL,NULL),(23,'balou','billou','balou@microsoft.com','$2b$10$9RniNNbX5zFl56t8ZiI6ceOV.zPVL/LVZTABQr3ipNzhdmuTqiRvq',0,NULL,NULL),(24,'bill','gates','bilou2@microsoft.com','$2b$10$0FZl/BT9u8BTPLO7jr4gKOAo1aTAn1y7GBdmaIEEqdXGptLj/5FYu',0,NULL,NULL),(25,'toad','nintendo','toad@nintendo.net','$2b$10$sv1Do58lAEhJynVsu3NDqe0waHfKOQbYIdYoRqtk2kg02z4399KHq',1,'http://localhost:3000/images/profile/849322.jpg1607630026539.jpg','modified'),(26,'toad','nintendo','toadette@nintendo.net','$2b$10$GUr3eHE5k11OaCn.qfMqqO42UpBeHG3/Cd7nYh3w3AqatxlWm7rta',0,NULL,NULL),(27,'toad','nintendo','toadettes@nintendo.net','$2b$10$ynG9li0hNVa7GP3L/1lvkeDM1xhqymfgQEZ2F5FMHB7v4g062DqPC',0,NULL,NULL),(29,'toad','nintendo','toadettess@nintendo.net','$2b$10$j/hHig2BHrj57rtPoKhMZehAHTVEJx0Ahy108UU/Q6RltqMVK15Dq',0,NULL,NULL),(30,'toad','nintendo','toadettesssss@nintendo.net','$2b$10$DsgqhIQz.v3GTU68NieG0ut8H4q4mpfV5fKzWzwED938gr3HCbi3q',0,'http://localhost:3000/images/profile/thumb-1920-908202.png1607639419515.png','modified'),(31,'bowsette','nintendo','bowsette@nintendo.net','$2b$10$7FDiW1yxreY0/NOHGW/sD.EsUxlR1r8mVViMVIOR83V/0fvD9WeaO',0,NULL,NULL),(39,'mario','luigi','mario-luigi@microsoft.com','$2b$10$.W3ea31P1qmk8X/QvY7Z1eWbNi263tGjpsXNSuXOUJF4czofzlA/q',0,'http://localhost:3000/images/profile/luigi-mario-black-hd-wallpaper-preview.jpg1608205796808.jpg','je suis un super hero');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-18 20:11:16

--
-- create user and access to db
--

CREATE USER 'will'@'127.0.0.1' IDENTIFIED BY 'jumble';
GRANT ALL PRIVILEGES ON *.* TO 'will'@'127.0.0.1';